var faunadb = require('faunadb')
q = faunadb.query

var client = new faunadb.Client({ secret: 'fnAECj00m_ACDZkDCfnMMfdzGOSD8G8jV4FjVhxF' })

async function saveBarcode(barcode, company_in) {
    const new_barcode = {
        number: barcode,
        company: company_in
    }
    var createP = client.query(
        q.Create(
            q.Collection('Companies'),
            { data: new_barcode }
        )
    ).then(function(response) {
        console.log(response); // Logs the ref to the console.
    }).catch((e)=>console.log(e))
} exports.saveBarcode = saveBarcode