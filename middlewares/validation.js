const validation = (schema) => {
    const validFn = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
           return res.status(400).json({
                message: error.message
            })
        }
        next()
    }
    return validFn
}

module.exports = validation;