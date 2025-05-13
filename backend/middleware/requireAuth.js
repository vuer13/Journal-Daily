const jwt = require('jsonwebtoken')
const user = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "Auth token required" })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await user.findOne({_id}).select('_id')
        next()

    } catch (error) {
        res.status(401).json({ error: 'Req not auth' })
    }
}

module.exports = requireAuth