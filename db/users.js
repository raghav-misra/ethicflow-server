// const faunadb = require("faunadb")
// const q = faunadb.query;

// const client = new faunadb.Client({ secret: process.env.FAUNA_KEY });

// async function createUser(user, hash) {
//     const newUser = {
//         username: user,
//         password_hash: hash,
//         history: [],
//         score: 0,
//     };
//     const create = client.query(q.Create(q.Collection("test")));
// }

// module.exports = { createUser };