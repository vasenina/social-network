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
    console.log("DB: i'm changing a pw for this id", id);
    const q = `UPDATE users 
            SET image_url=$2
            WHERE id =$1;`;
    const params = [id, url];
    return db.query(q, params);
};

module.exports.getUsersstartsWith = (search) => {
    console.log("DB: search users with name", search);
    const q = `SELECT id, first, last, image_url FROM users
                WHERE last ILIKE 'a%';`;

    const params = [];
    //const params = [];
    console.log("DB params", params, q);
    // console.log(`this is a search ${search}%`);
    return db.query(q, params);
};
