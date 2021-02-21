const axios = require("axios").default;
const natural = require("natural");
const { findBrandOnWikipedia } = require("./findBrandOnWikipedia");
const { STOP_WORDS } = require("../constants");

async function getParentCompany(name) {
    const brandData = await findBrandOnWikipedia(name);
    const tokenizer = new natural.WordTokenizer();
    try{
    const wikiText = brandData.text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const parent = tokenizer.tokenize(wikiText.replace(/<.*?>/," ").split(/owner|developed by|parent company|parent|marketed by|owned by|created by|acquired|offered by|subsidiary of|division of/)[1]).filter(e=>!STOP_WORDS.includes(e)).filter(e=>isNaN(e)).slice(0,10).join(" ")
    return parent
    }catch(e){
        return name
    }
}

module.exports = { getParentCompany };