const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./bc");
const cookieSession = require("cookie-session");

const { resetPass } = require("./routers/resetPass.js");
const { userProfile } = require("./routers/userProfile.js");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.use(
    cookieSession({
        secret:
            process.env.SESSION_SECRET || require("./passwords").sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);
app.use(resetPass);
app.use(userProfile);

app.get("/clear", (req, res) => {
    req.session = null;
    console.log("Clear cookies", req.session);
    res.redirect("/");
    return;
});

app.get("/logout", (req, res) => {
    req.session = null;
    console.log("Clear cookies", req.session);
    res.redirect("/");
    return;
});
app.get("/getusers", (req, res) => {
    let search = req.query ? req.query.search : "";
    console.log("user wants to see users", search);
    db.getUsersstartsWith(search)
        .then(({ rows }) => {
            if (rows.length <= 0) {
                return res.json({
                    success: false,
                    error: "Users are not found",
                });
            }
            //console.log("users for Search", rows);
            res.json({
                success: true,
                users: rows,
            });
        })
        .catch((err) => {
            console.log("Err in get usersstarts with name", err);
            res.json({
                success: false,
                error: "Smth is wrong. Please Try again",
            });
        });
});

app.post("/register.json", function (req, res) {
    //console.log(req.body);

    // db.addUser();
    hash(req.body.password)
        .then((hashedPw) => {
            console.log(
                "POST/register i want to add this in db",
                req.body.first,
                req.body.last,
                req.body.email
            );
            req.session.first = req.body.first;
            req.session.last = req.body.last;
            return db.addUser(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPw
            );
        })
        .then((userID) => {
            // console.log("id for new iser", userID);
            req.session.userId = userID.rows[0].id;
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

//app post login

app.post("/login.json", (req, res) => {
    db.getPassword(req.body.email)
        .then((hashFromDatabase) => {
            console.log("hashFromDatabase", hashFromDatabase.rows[0].password);
            return compare(
                req.body.password,
                hashFromDatabase.rows[0].password
            );
        })
        .then((match) => {
            console.log("do provided pw and db stored hash mash", match);
            if (match) {
                return db.getUserId(req.body.email);
            } else {
                res.json({
                    success: false,
                });
            }
        })
        .then(({ rows }) => {
            console.log("users id and sign id:", rows[0].user_id);
            //here we should set cookies
            req.session.userId = rows[0].user_id;
            //req.session.last = rows[0].last;
            //req.session.first = rows[0].first;
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            console.log("error in compare pw", err);
            // const error = {}
            res.json({
                success: false,
            });
        });
});

//end app post login

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
        //last: req.session.last,
        // first: req.session.first,
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
