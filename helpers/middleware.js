function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkFields(req, res, next) {
    const { title, priority } = req.body
    if (title && priority) {
        next()
    } else {
        res.status(400).json({ message: req.body })
    }
}

module.exports = {
    mustBeInteger,
    checkFields
}
