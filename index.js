// // Load SECRETS:
require("dotenv").config();

// install express with `npm install express` 
const express = require('express')
const { createUser } = require("./db/users");
const cors = require("cors");
const { getParentCompany } = require("./scraper/getParentCompany");
const { getCompanyById } = require("./scraper/getCompanyById");
const { searchForCompanies } = require("./scraper/searchForCompanies");
const { saveBarcode } = require("./db/saveBarcode")
const { lookupBarcode } = require("./db/lookupBarcode")
const { nameByBarcode } = require('./db/nameByBarcode')
const bodyParser = require('body-parser')

// Init express:
const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());

app.post('/name/by_barcode', async (req, res) => {
    const comp = await nameByBarcode(req.body.barcode)
    res.send(
        comp
    )
})



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.all('/test', cors(), (req, res) => {
    res.send("TESTESTEST")
})

app.get("/data/by_manufacturer/:manufacturer", async (req, res) => {
    try {
        const parent = await getParentCompany("tide");
        console.log("Parent company", parent);

        const searchEntry = await searchForCompanies(parent);
        console.log("Search entry", searchEntry);

        if(searchEntry == null){
            //Not found!
            res.json({
                success:false,
                error:`Couldnt find ratings ${name}`
            })
            return;
        }

        const companyEntry = await getCompanyById(searchEntry);
        console.log("Full data", companyEntry);

        res.json({
            success:true,
            data: companyEntry
        })

    } catch (e) {
        console.log(e)
        res.send({
            success:false,
            error:`${e}`
        });
    }
});

app.post('/add_barcode', async (req, res, next) => {
    saveBarcode(req.body.barcode, req.body.company)
    res.send({
        message: "Success " + req.body.barcode + " " + req.body.company
    })
})

app.post('/data/by_barcode', async (req, res, next) => {  // PASS IN STRING
    try {
        // const number = 818210418436
        const data = await lookupBarcode(req.body.number)
        res.send(
            data  // TITLE BRAND IMAGE
        )
    } catch (e) {
        res.send(
            { Error: e }
        )
    }
})



module.exports = app