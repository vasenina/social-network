//will be where we have all our functions
//retriev/add/update

const spicedPg = require("spiced-pg");

const database = "socialnetwork";
const username = "postgres";
const password = "postgres";

//comunication to the db

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgress:${username}:${password}:@localhost:5432/${database}`
);

console.log(`[db] connecting to ${database}`);
//console.log(db);

module.exports.addUser = (userFirst, userLast, userEmail, userPW) => {
    console.log("DB: I.m adding a new user");
    const q = `INSERT INTO users (first, last, email, password) 
                VALUES ($1, $2, $3, $4)
                RETURNING id;`;
    const params = [userFirst, userLast, userEmail, userPW];
    return db.query(q, params);
};

module.exports.updateUserbyID = (id, first, last, email) => {
    console.log("DB: Updating user with id", id);
    const q = `UPDATE users
                SET first = $2, last  = $3, email = $4
                WHERE id = $1;`;
    const params = [id, first, last, email];
    return db.query(q, params);
};
module.exports.updateUserbyIDwithPassword = (
    id,
    first,
    last,
    email,
    password
) => {
    console.log("DB: Updating user & password with id", id);
    const q = `UPDATE users
                SET first = $2, last  = $3, email = $4, password = $5
                WHERE id = $1;`;
    const params = [id, first, last, email, password];
    return db.query(q, params);
};

module.exports.getPassword = (email) => {
    console.log("DB: i'm getting a password for this email", email);
    const q = `SELECT password FROM users WHERE email =$1;`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserId = (email) => {
    const q = `SELECT id AS user_id , last , first
            FROM users 
            WHERE email = $1;`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserById = (id) => {
    const q = `SELECT  last , first, image_url, bio
            FROM users 
            WHERE id = $1;`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getUserbyEmail = (email) => {
    console.log("DB: i'm getting a user for this email", email);
    const q = `SELECT id FROM users WHERE email =$1;`;
    const params = [email];
    return db.query(q, params);
};
module.exports.addCode = (code, email) => {
    console.log("DB: Adding a new code", code);
    const q = `INSERT INTO reset_codes (code, email)
                VALUES ($1, $2)
                ON CONFLICT (email)
                DO UPDATE SET code = $1, email = $2, created_at  = CURRENT_TIMESTAMP
                RETURNING code;`;
    const params = [code, email];
    return db.query(q, params);
};

module.exports.getCodebyEmail = (email) => {
    console.log("DB: i'm getting a code for this email", email);
    const q = `SELECT code FROM reset_codes 
    WHERE email =$1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`;
    const params = [email];
    return db.query(q, params);
};

module.exports.changePassword = (email, hashedPW) => {
    console.log("DB: i'm changing a pw for this email", email);
    const q = `UPDATE users 
    SET password = $2 
    WHERE email = $1;`;
    const params = [email, hashedPW];
    return db.query(q, params);
};

module.exports.changeBioById = (id, bio) => {
    console.log("DB: i'm changing bio for this id", id);
    const q = `UPDATE users 
    SET bio = $2 
    WHERE id = $1;`;
    const params = [id, bio];
    return db.query(q, params);
};

module.exports.addPictureById = (id, url) => {
    console.log("DB: i'm changing a pic for this id", id);
    const q = `UPDATE users 
            SET image_url=$2
            WHERE id =$1;`;
    const params = [id, url];
    return db.query(q, params);
};

module.exports.getUsersstartsWith = (search) => {
    console.log("DB: search users with name", search);
    if (search.length <= 0) {
        //return list of users
        const q = `SELECT id, first, last, image_url FROM users
                 LIMIT 10;`;
        return db.query(q);
    } else {
        const q = `SELECT id, first, last, image_url FROM users
                WHERE last ILIKE $1 OR first ILIKE $1 LIMIT 5;`;
        const params = [search + "%"];
        return db.query(q, params);
    }
};

module.exports.getRelationship = (id, otherId) => {
    console.log("DB: search relationship between ", id, "and", otherId);
    const q = `SELECT * FROM friendships 
                WHERE (recipient_id = $1 AND sender_id = $2) 
                OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [id, otherId];
    return db.query(q, params);
};

module.exports.addfriendshipRequest = (id, otherId) => {
    console.log("DB: add a friend request");
    const q = `INSERT INTO friendships (sender_id, recipient_id) VALUES($1, $2);`;
    const params = [id, otherId];
    return db.query(q, params);
};

module.exports.acceptFriendshipRequest = (id, otherId) => {
    console.log("DB: add a friend request");
    const q = `UPDATE friendships 
                SET accepted = true 
                WHERE  sender_id = $2 AND recipient_id  = $1;`;
    const params = [id, otherId];
    return db.query(q, params);
};

module.exports.deleteFriendshipRequest = (id, otherId) => {
    console.log("DB: add a friend request");
    const q = `DELETE FROM friendships 
                WHERE  sender_id = $1 AND recipient_id  = $2;`;
    const params = [id, otherId];
    return db.query(q, params);
};

module.exports.endFriendship = (id, otherId) => {
    console.log("DB: endFriendship");
    const q = `DELETE FROM friendships 
                WHERE (recipient_id = $1 AND sender_id = $2) 
                OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [id, otherId];
    return db.query(q, params);
};

module.exports.getMyFriendsAndFans = (id) => {
    console.log("DB: get friends for user", id);
    const q = `SELECT users.id, first, last, image_url, accepted, sender_id
                FROM friendships
                JOIN users ON (accepted = FALSE AND recipient_id = $1 AND sender_id = users.id) OR 
                  (accepted = FALSE AND sender_id = $1 AND recipient_id = users.id) OR
                (accepted = TRUE AND recipient_id = $1 AND sender_id = users.id) OR
                (accepted = TRUE AND sender_id = $1 AND recipient_id = users.id)`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getFiendsofthisPerson = (id) => {
    console.log("DB: friends of friends");
    const q = `SELECT users.id, first, last, image_url
                FROM friendships
                JOIN users ON
                (accepted = TRUE AND recipient_id = $1 AND sender_id = users.id) OR
                (accepted = TRUE AND sender_id = $1 AND recipient_id = users.id)`;
    const params = [id];
    return db.query(q, params);
};
