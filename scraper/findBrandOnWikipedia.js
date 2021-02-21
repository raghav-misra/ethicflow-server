const axios = require("axios").default;
const { JSDOM } = require("jsdom");

async function findBrandOnWikipedia(query) {
    // Send request:
    const searchResponse = await axios.get(`https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(`${query} brand`)}&title=Special:Search&profile=advanced&fulltext=1&advancedSearch-current=%7B%7D&ns0=1`);

    // Get back the search page, load into scraper:
    const searchDOM = new JSDOM(searchResponse.data);

    const searchResult = searchDOM.window.document.querySelector(".mw-search-result-heading");

    if (!searchResult) return null;
    
    const name = searchResult.textContent;
    if (!searchResult.querySelector("a")) return null;
    const url = searchResult.querySelector("a").href;

    // If it finds something,
    if (name && url) {
        const pageResponse = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(name)}&prop=extracts&exintro&explaintext`);
        const text = (Object.values(pageResponse.data.query.pages)[0]).extract.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        // Return the goods:
        return {
            name: name.trim(),
            id: url.split("/").reverse()[0],
            url: `https://en.wikipedia.org${url}`,
            text
        };
    }

    return null;
}

module.exports = { findBrandOnWikipedia };