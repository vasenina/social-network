const express = require("express");
const resetPass = express.Router();
const { hash, compare } = require("../bc");
const db = require("../db");
const { sendEmail } = require("../ses");
const cryptoRandomString = require("crypto-random-string");

resetPass.post("/resetPass/start", (req, res) => {
    console.log("user wants to change a password", req.body);
    db.getUserbyEmail(req.body.email)
        .then(({ rows }) => {
            console.log("rows", rows);
            if (rows.length > 0) {
                console.log("i found user", rows);
                //generate new code
                const randomString = cryptoRandomString({ length: 6 });
                return db.addCode(randomString, req.body.email);
            } else {
                console.log("no email");
                res.json({
                    success: false,
                });
                return new Promise((resolve, reject) => {
                    reject;
                });
            }
        })
        .then(({ rows }) => {
            console.log("code is added to db", rows[0].code);
            return sendEmail(rows[0].code);
        })
        .then(() => {
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            console.log("Error with changing password", err);
            res.json({
                success: false,
            });
        });
});

resetPass.post("/resetPass/verify", (req, res) => {
    console.log("user wants to verify his code", req.body);
    db.getCodebyEmail(req.body.email)
        .then(({ rows }) => {
            console.log(
                "code from db",
                rows[0].code,
                "code from request",
                req.body.code
            );
            if (req.body.code == rows[0].code) {
                console.log("codes are the same");
                return hash(req.body.password);
            }
        })
        .then((hashedPW) => {
            console.log("hashedPW", hashedPW);
            return db.changePassword(req.body.email, hashedPW);
        })
        .then(() => {
            console.log("password changed");
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            console.log("error in changing a password", err);
            res.json({
                success: false,
            });
        });
});

module.exports.resetPass = resetPass;
