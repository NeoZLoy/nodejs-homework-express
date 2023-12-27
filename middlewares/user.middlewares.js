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

        next()
       
        
    } catch (error) {
        next(error)
    }
}

// const checkUser = async (req, res, next) => {
//     const users = await getUsers();
//     const loginUser = users.find(user => user.)
// }

module.exports = {checkUniqueEmail};