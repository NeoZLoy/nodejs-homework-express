const jwt = require('jsonwebtoken');


const {getUsers } = require('../services');
const { findUserById } = require('../services');

const checkUniqueEmail = async (req, res, next) => {
    try {
        const users = await getUsers();
        const userWithEmail = users.find(user => user.email === req.body.email);
        if(userWithEmail){
            res.status(409).json({
                msg: 'Email in use'
            })
        } else{
            next()
        }

        
    } catch (error) {
        next(error)
    }
}

const checkToken = async (req, res, next) => {

    // get token from header
    const tokenToCheck = req.headers.authorization;

    // token validation
    if (tokenToCheck) {
        const [authType, authToken] = tokenToCheck.split(' ');
        if (authType === 'Bearer') {
            req.token = authToken;
          } else{
            return res.status(401).json({
                msg: "Not authorized"
            })
          }

        // token decode to get id
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(authToken, process.env.key, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded);
            });
        });
        const user = await findUserById(decoded.id);
        req.id = decoded.id;

        // is token === user.token
        if (!user || user.token !== authToken){
            return res.status(401).json({
                msg: "Not authorized"
            })
        }

        req.user = user;
        next()

      } else {
        return res.status(401).json({
            msg: "Token not provided"
        });
    }
}
module.exports = {checkUniqueEmail, checkToken};