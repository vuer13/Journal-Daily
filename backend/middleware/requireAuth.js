const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "Auth token required" })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        user = await User.findById(_id).select('_id')

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user
        next()

    } catch (error) {
        console.error('JWT verification failed:', error.message);
        res.status(401).json({ error: 'Req not auth' })
    }
}

module.exports = requireAuth