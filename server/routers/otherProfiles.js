const express = require("express");
const otherProfiles = express.Router();
const db = require("../db");

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

module.exports.otherProfiles = otherProfiles;
