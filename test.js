const { nameByBarcode } = require('./db/nameByBarcode')
barcode = 1234
var faunadb = require('faunadb')
q = faunadb.query

var client = new faunadb.Client({ secret: 'fnAECj00m_ACDZkDCfnMMfdzGOSD8G8jV4FjVhxF' })

barcode = 1234
console.log(getIt(barcode))

function getIt(barcode) {
    const query = client.query(
        q.Get(
            q.Match(
                q.Index("name_by_barcode"), 
                parseInt(barcode)
            )
        )
    )
    query.then(function(response) {
        // console.log(response.data); // Logs the ref to the console.
        return response.data
    })
}