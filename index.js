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
const bodyParser = require('body-parser')

// Init express:
const app = express();
app.use(cors());
app.use(bodyParser.json())
// app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.all('/test', (req, res) => {
    res.send("TESTESTEST")
})

app.get("/data/by_manufacturer/:manufacturer", async (req, res) => {
    try {
        //Look for a parent
        const name = await getParentCompany(req.params.manufacturer);

        //Check if it is listed
        const ethicsSearch = await searchForCompanies(name)

        if(ethicsSearch == null){
            //Not found!
            res.json({
                success:false,
                error:`Could find ratings ${name}`
            })
            return;
        }

        //Get ratings
        const ratings = await getCompanyById(ethicsSearch.id)
        res.json({
            success:true,
            ratings
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



// Start app:
// app.listen(6969, ( ()=> {
//     console.log("App is listening my g")
// }));

module.exports = app