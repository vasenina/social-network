const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./bc");
// const cookieSession = require("cookie-session");

const { resetPass } = require("./routers/resetPass.js");
const { userProfile } = require("./routers/userProfile.js");
const { otherProfiles } = require("./routers/otherProfiles.js");

const socketIOserver = require("socket.io");

const server = require("http").Server(app);
const io = socketIOserver(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
//console.log("this is io", io);

// app.use(
//     cookieSession({
//         secret:
//             process.env.SESSION_SECRET || require("./passwords").sessionSecret,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//         sameSite: true,
//     })
// );
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.use(resetPass);
app.use(userProfile);
app.use(otherProfiles);

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
    console.log("login", req.body);
    if (!req.body.password || !req.body.email) {
        console.log("No pw or email");
        res.json({
            success: false,
        });
        return;
    }
    db.getPassword(req.body.email)
        .then((hashFromDatabase) => {
            // console.log("hashFromDatabase", hashFromDatabase.rows[0].password);
            return compare(
                req.body.password,
                hashFromDatabase.rows[0].password
            );
        })
        .then((match) => {
            // console.log("do provided pw and db stored hash mash", match);
            if (match) {
                return db.getUserId(req.body.email);
            } else {
                res.json({
                    success: false,
                });
                return;
            }
        })
        .then(({ rows }) => {
            console.log("users id and sign id:", rows[0].user_id);
            //here we should set cookies
            req.session.userId = rows[0].user_id;
            console.log("cookie", req.session.userId);
            //req.session.last = rows[0].last;
            //req.session.first = rows[0].first;
            res.json({
                success: true,
            });
            return;
        })
        .catch((err) => {
            console.log("error in compare pw", err);
            // const error = {}
            res.status(500).json({
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

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

io.on("connection", (socket) => {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    console.log(
        `socket with the id ${socket.id} is now connected with user_id =  ${socket.request.session.userId}`
    );

    db.getLastMessages()
        .then(({ rows }) => {
            console.log("rows:", rows);
            //send it to the user who just connected
            socket.emit("chatMessages", { messages: rows });
        })
        .catch((err) => console.log("error in get Messages", err));

    socket.on("newChatMessage", (data) => {
        console.log(data);
        const addNewMsg = db.addNewMessage(socket.request.session.userId, data);
        const getUserData = db.getUserById(socket.request.session.userId);
        Promise.all([addNewMsg, getUserData])
            .then((results) => {
                // console.log("promises ok", msg, user);
                const message = {
                    id: results[0].rows[0].id,
                    created_at: results[0].rows[0].created_at,
                    user_id: socket.request.session.userId,
                    message: data,
                    last: results[1].rows[0].last,
                    first: results[1].rows[0].first,
                    image_url: results[1].rows[0].image_url,
                };
                console.log("generated message", message);
                io.emit("chatMessage", message);
            })
            .catch((err) => console.log("error in adding message in db", err));

        // db.addNewMessage(socket.request.session.userId, data)
        //     .then(({ rows }) => {
        //         console.log("returning from db", rows);

        //         const message = {
        //             id: rows.id,
        //             created_at: rows.created_at,
        //             user_id: socket.request.session.userId,
        //             message: data,
        //         };
        //         socket.emit("chatMessage", message);
        //     })
        //     .catch((err) => {
        //         console.log("error in adding a new msg", err);
        //     });
        //add to db
        // who is a user - get url and image url
        //return object to every connected user which matches
    });
});
