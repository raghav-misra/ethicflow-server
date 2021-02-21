// // Load SECRETS:
// require("dotenv").config();

// install express with `npm install express` 
const express = require('express')
const { createUser } = require("./db/users");
const cors = require("cors");

// Init express:
const app = express();
app.use(cors());
// app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.all('/test', (req, res) => {
    res.send("TEST WORKS")
})

app.post("/parent", async (req, res) => {
    const parent = await getParentCompany(req.body.company);
    res.send(parent);
});

app.post('/add_barcode', async (req, res, next) => {
    // saveBarcode(req.body.barcode, req.body.company)
    res.send({
        message: "Success"
    })
})

// Start app:
// app.listen(8888, () => `The app is listening my g`);

module.exports = app