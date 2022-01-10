const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./bc");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.post("/register.json", function (req, res) {
    console.log(req.body);

    // db.addUser();
    hash(req.body.password)
        .then((hashedPw) => {
            console.log(
                "POST/register i want to add this in db",
                req.body.first,
                req.body.last,
                req.body.email
            );
            // req.session.first = req.body.first;
            // req.session.last = req.body.last;
            return db.addUser(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPw
            );
        })
        .then((userID) => {
            // console.log("id for new iser", userID);
            res.json({
                success: true,
                id: userID.rows[0].id,
            });
        })
        .catch((err) => {
            console.log("error in add user", err);
            res.json({
                success: false,
            });
        });
});
app.get("/user/id.json", function (req, res) {
    // res.json({
    //     userId: req.session.userId,
    // });
    res.json({ userId: undefined });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
