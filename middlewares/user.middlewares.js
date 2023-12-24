const {getUsers} = require('../services')

const checkUniqueEmail = async (req, res, next) => {
    try {
        const users = await getUsers();
        const userWithEmail = users.find(user => user.email === req.body.email);
        if(userWithEmail){
            res.status(409).json({
                msg: 'Email in use'
            })
        }
        req.user = userWithEmail
        next()
        
    } catch (error) {
        next(error)
    }
}

module.exports = {checkUniqueEmail};