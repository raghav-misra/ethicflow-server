function getRelevantCompany(target, companies) {
    if (companies.length === 0) return null;

    for (const company of companies) {
        if (company.name.toLowerCase().includes("aus") && !target.toLowerCase().includes("aus")) {
            continue;
        }

        return company;
    }
}

module.exports = { getRelevantCompany };