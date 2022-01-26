const express = require("express");
const otherProfiles = express.Router();
const db = require("../db");

otherProfiles.get("/api/friends-of-friends/:id", async (req, res) => {
    console.log(" User wants to see friends of friends", req.params.id);
    try {
        const dbRes = await db.getFiendsofthisPerson(req.params.id);
        return res.json({ success: true, friends: dbRes.rows });
    } catch {
        (err) => {
            console.log("error iin getting friends of friends", err);
            return res.json({ success: false });
        };
    }
});

otherProfiles.get("/api/friendship/:id", async (req, res) => {
    console.log(
        "  FRIENDSHIP I'm:",
        req.session.userId,
        "other:",
        req.params.id
    );

    try {
        const { rows } = await db.getRelationship(
            req.session.userId,
            req.params.id
        );
        console.log(rows);
        if (rows.length <= 0) {
            res.json({ success: true, text: "add" });
            console.log("1");
        } else if (rows[0].accepted) {
            console.log("2");
            res.json({ success: true, text: "end" });
        } else if (rows[0].sender_id == req.session.userId) {
            console.log("3");
            res.json({ success: true, text: "cancel" });
        } else {
            console.log("4 step");
            res.json({ success: true, text: "accept" });
        }

        return;
    } catch {
        (err) => {
            res.status(500).json({ success: false });
            console.log("Error in Friendship DB request", err);
            return;
        };
    }
});

otherProfiles.get("/api/wall/:id", async (req, res) => {
    console.log("get a wall for:", req.params.id);
    try {
        const wallMsg = await db.getTheWallbyId(req.params.id);
        console.log("wall from DB", wallMsg.rows);
        res.json({ success: true, messages: wallMsg.rows });
        return;
    } catch {
        (err) => {
            res.status(500).json({ success: false });
            console.log("error in getting a wall", err);
            return;
        };
    }
});

otherProfiles.post("/api/addMsgToWall/:id", async (req, res) => {
    console.log("new message to the wall", req.body);
    const { message } = req.body;
    const sender_id = req.session.userId;

    const newPost = db.addNewPostTotheWall(req.params.id, message, sender_id);
    const getUserData = db.getUserById(req.session.userId);

    Promise.all([newPost, getUserData])
        .then((values) => {
            const newMessage = {
                id: values[0].rows[0].id,
                image_url: values[1].rows[0].image_url,
                first: values[1].rows[0].first,
                last: values[1].rows[0].last,
                message: message,
                created_at: values[0].rows[0].created_at,
            };
            res.json({
                success: true,
                message: newMessage,
            });
            return;
        })
        .catch((err) => {
            res.status(500).json({ success: false });
            console.log("error in adding a msg to the wall", err);
            return;
        });
});

otherProfiles.post("/api/friendship/:id/:action", async (req, res) => {
    console.log(
        "user wants to change friend relations",
        req.params.id,
        req.params.action
    );
    //let result = {};
    if (req.params.action == "add") {
        //добавляем в бaзу данных нужное
        try {
            const dbres = await db.addfriendshipRequest(
                req.session.userId,
                req.params.id
            );
            res.json({ success: true });
            return;
        } catch (err) {
            console.log("err in add friendship in db", err);
            res.status(500).json({ success: false, text: "cancel" });
            return;
        }
    }
    if (req.params.action == "accept") {
        // accepted = true acceptFriendshipRequest
        try {
            const dbres = await db.acceptFriendshipRequest(
                req.session.userId,
                req.params.id
            );
            res.json({ success: true, text: "end" });
            return;
        } catch (err) {
            console.log("err in accept friendship in db", err);
            res.status(500).json({ success: false });
            return;
        }
    }
    if (req.params.action == "cancel") {
        //удаляем строчку запроса из базы данных
        try {
            const dbres = await db.deleteFriendshipRequest(
                req.session.userId,
                req.params.id
            );
            res.json({ success: true });
            return;
        } catch (err) {
            console.log("err in cancel friendship in db", err);
            res.status(500).json({ success: false, text: "add" });
            return;
        }
    }
    if (req.params.action == "end") {
        //удаляем строчку запроса из базы данных
        try {
            const dbres = await db.endFriendship(
                req.session.userId,
                req.params.id
            );
            res.json({ success: true });
            return;
        } catch (err) {
            console.log("err in end friendship in db", err);
            res.status(500).json({ success: false, text: "add" });
            return;
        }
    }
});

otherProfiles.get("/api/get-network", (req, res) => {
    console.log("user wants to see a network");
    const users = db.getUsersNetwork();
    const friendships = db.getFriendshipsNetwork();
    Promise.all([users, friendships])
        .then((values) => {
            res.json({
                success: true,
                users: values[0].rows,
                edges: values[1].rows,
            });
        })
        .catch((err) => {
            console.log("erro in network", err);
        });
});

module.exports.otherProfiles = otherProfiles;
