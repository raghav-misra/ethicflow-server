var faunadb = require('faunadb')
q = faunadb.query

var client = new faunadb.Client({ secret: 'fnAECj00m_ACDZkDCfnMMfdzGOSD8G8jV4FjVhxF' })


async function nameByBarcode(barcode) {
    const query = await client.query(
        q.Get(
            q.Match(
                q.Index("name_by_barcode"), 
                parseInt(barcode)
            )
        )
    )
    console.log(query)
    return {
        data: query
    }
} exports.nameByBarcode = nameByBarcode