module.exports = function deduplicateForInternal(req, columnName) {
    const isInternal = req.user.is('Internal')
    if (isInternal) {
        console.log(`👨‍💼 [Deduplication] Internal user detected for entity '${req.target.name}', column '${columnName}'`)

        // Override SELECT columns
        req.query.SELECT.columns = [
            { ref: [columnName] }
        ]

        // Add groupBy for safety (especially on HANA)
        req.query.SELECT.groupBy = [
            { ref: [columnName] }
        ]
    } else {
        console.log(`🙋‍♂️ External user — no deduplication for entity '${req.target.name}'`)
    }
}
