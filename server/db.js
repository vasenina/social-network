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
                DO UPDATE SET code = $1, email = $2
                RETURNING code;`;
    const params = [code, email];
    return db.query(q, params);
};
