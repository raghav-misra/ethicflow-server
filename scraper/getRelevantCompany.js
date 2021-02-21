function getRelevantCompany(target, companies) {
    for (const company of companies) {
        if (company.name.toLowerCase().includes("aus") && !target.toLowerCase().includes("aus")) {
            continue;
        }

        return company;
    }
}

module.exports = { getRelevantCompany };