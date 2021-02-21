var faunadb = require('faunadb')
const axios = require('axios').default
q = faunadb.query

var client = new faunadb.Client({ secret: 'fnAECj00m_ACDZkDCfnMMfdzGOSD8G8jV4FjVhxF' })

async function lookupBarcode(number) {
    const headers = {
        'Content-Type': 'application/json',
        'key_type': '3scale'
    }
    try {
        const info = await axios.get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${number}`)
        console.log({
            title: info.data.items[0].title,
            brand: info.data.items[0].brand,
            image: info.data.items[0].images[0]
        })
        return {
            title: info.data.items[0].title,
            brand: info.data.items[0].brand,
            image: info.data.items[0].images[0]
        }
    } catch (e) {
        console.log('Error: ' + e)
    }
} exports.lookupBarcode = lookupBarcode