const { getCompanyById } = require("./scraper/getCompanyById");
const { getParentCompany } = require("./scraper/getParentCompany");
const { searchForCompanies } = require("./scraper/searchForCompanies");

async function test() {
    const parent = await getParentCompany("tide");

    console.log("Parent company", parent);

    const searchEntry = await searchForCompanies(parent);
    console.log("Search entry", searchEntry);

    const companyEntry = await getCompanyById(searchEntry);
    console.log("Full data", companyEntry);
}

test();