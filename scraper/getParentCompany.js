const axios = require("axios").default;
const natural = require("natural");
const { findBrandOnWikipedia } = require("./findBrandOnWikipedia");
const { STOP_WORDS } = require("../constants");

async function getParentCompany(name) {
    const { text } = await findBrandOnWikipedia(name);
    const tokenizer = new natural.WordTokenizer();
    const parent = tokenizer.tokenize(text
        .replace(/<.*?>/, " ").split(/owner|developed by|parent company|parent|marketed by|owned by|created by|acquired|offered by|subsidiary of|division of/)[1])
        .filter(e => !STOP_WORDS.includes(e)).filter(e => isNaN(e)).slice(0, 10).join(" ")

    return parent;
}

module.exports = { getParentCompany };