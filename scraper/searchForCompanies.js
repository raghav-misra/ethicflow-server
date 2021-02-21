const axios = require("axios").default;
const { JSDOM } = require("jsdom");

async function searchForCompanies(name) {
    // Send request:
    const params = new URLSearchParams();
    params.append("term", name.toLowerCase().trim());
    const response = await axios.post("https://guide.ethical.org.au/guide/search/", params);

    // Get back the search page, load into scraper:
    const { window } = new JSDOM(response.data);

    const results = [];

    // Loops through entry elements, add to data list:
    const rows = window.document.querySelectorAll("tr[class]");
    
    rows && rows.forEach(item => {
        const name = item.children[0].querySelector("a")?.textContent;
        const url = item.children[0].querySelector("a")?.href;
        const description = item.children[1].textContent;
        const type = item.children[2].textContent;

        if (name && url && description && type === "Company") {
            results.push({ 
                name, 
                description, 
                id: url.split("=")[1] 
            });
        }
    });

    return results;
}

module.exports = { searchForCompanies };