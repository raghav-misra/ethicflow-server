const axios = require("axios").default;
const { JSDOM } = require("jsdom");
const { RATINGS } = require("../constants");

async function getCompanyById({ id, name }) {
    // Send request:
    const response = await axios.get(`https://guide.ethical.org.au/company/?company=${id}`);

    // Get back the search page, load into scraper:
    const { window } = new JSDOM(response.data);

    // Returned value:
    const companyResult = { id, name };

    // Get letter rating:
    const rating = window.document.querySelector(".ci-content-fullwidth")
        ?.querySelectorAll("div[style]")[1]
        ?.querySelector("img")?.getAttribute("alt")?.toLowerCase();
    
    if (rating) {
        companyResult.rating = RATINGS[rating];
    }

    // Function to parse each section:
    function parseSection(section, sectionName) {
        const results = [];

        section.querySelectorAll("div").forEach((item, index) => {
            if (index % 2 === 0) {
                const title = item.querySelector("a");
                results.push([ (title.textContent || "Choice").trim(), "" ]);
            }
            else {
                results[results.length - 1][1] = (item.childNodes[0].textContent || "Choice").trim();
            }
        });

        companyResult[sectionName] = {};

        results.forEach(([ name, desc ]) => companyResult[sectionName][name] = desc);
    }

    // Divide into sections:
    const [
        prosSection,
        consSection,
        infoSection
    ] = window.document.querySelectorAll("td.smallerFont");

    parseSection(prosSection, "pros");
    parseSection(consSection, "cons");
    parseSection(infoSection, "info");

    return companyResult;
}

module.exports = { getCompanyById };