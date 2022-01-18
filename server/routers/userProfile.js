const express = require("express");
const userProfile = express.Router();
const { hash, compare } = require("../bc");
const db = require("../db");

const s3 = require("../s3");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

userProfile.post(
    "/uploadprofilepic/:id",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        console.log(
            "user uploaded profile photo",
            req.body,
            req.params,
            req.file
        );
        //
        if (!req.file) {
            res.json({ success: false });
        } else {
            const url = s3.getLink(req.file.filename);
            const { id } = req.params;
            //console.log(url, username, title, description);
            db.addPictureById(id, url)
                .then(() => {
                    // console.log("got this img id", rows[0].id);
                    res.json({
                        success: true,
                        url: url,
                    });
                })
                .catch((err) => {
                    console.log("err in add image in db", err);
                    res.json({
                        success: false,
                    });
                });
        }

        // res.send({ success: true });
    }
);

userProfile.post("/changebio/:id", (req, res) => {
    console.log("user changed a bio:", req.body, req.params);
    //

    const { id } = req.params;

    //console.log(url, username, title, description);
    db.changeBioById(id, req.body.newBio)
        .then(() => {
            // console.log("got this img id", rows[0].id);
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            console.log("err in changing bio in db", err);
            res.json({
                success: false,
            });
        });
});

userProfile.get("/user-cookie/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
        //last: req.session.last,
        // first: req.session.first,
    });
});

userProfile.get("/api/user/:id", function (req, res) {
    const userId = req.params.id;
    console.log("api/user: id", userId);
    db.getUserById(userId)
        //db.getUserById("jal")
        .then(({ rows }) => {
            console.log("user data from DB", rows[0]);
            res.json({
                success: true,
                first: rows[0].first,
                last: rows[0].last,
                imageUrl: rows[0].image_url,
                bio: rows[0].bio,
            });
            return;
        })
        .catch((err) => {
            res.status(500).send({ error: "ServerError" });
            // res.json({ error: "No data for this user" });
            console.log("error in getUserByID", err);
            return;
        });
});

// app.get("/user/:id", function (req, res) {
//     const userId = req.params.id;
//     db.getUserById(userId)
//         .then(({ rows }) => {
//             console.log("user data from DB", rows[0]);
//             res.json({
//                 success: true,
//                 first: rows[0].first,
//                 last: rows[0].last,
//                 imageUrl: rows[0].image_url,
//                 bio: rows[0].bio,
//             });
//         })
//         .catch((err) => {
//             res.json({ success: false });
//             console.log("error in getUserByID", err);
//         });
// });

module.exports.userProfile = userProfile;
