const jwt = require('jsonwebtoken');
const multer = require('multer')
const uuid = require('uuid').v4
const jimp = require("jimp");
const path = require('path')


const {getUsers, findUserByEmail, findUserById, findUserByVerificationToken} = require('../services');


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


// Multer Storage

const multerStorage = multer.memoryStorage()

// Multer filter

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error(400, 'Only images is allowed'), false)
    }
}

const uploadUserAvatar = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
}).single('avatar')

const resizeUserAvatar = async (req, res, next) => {

    if(!req.file){
        next()
    }

    try {
        const avatar = await jimp.read(req.file.buffer);
        await avatar.resize(200, 200); // Adjust dimensions as needed
        await avatar.quality(90);
        req.file.buffer = await avatar.getBufferAsync(jimp.MIME_JPEG);
        next();
    } catch (error) {
        next(error)
    }

}

const saveUserAvatar = async (req, res, next) => {

    try {
        const filename = `${req.user.id}-${uuid()}.jpg`; // Adjust the filename as needed
        const filePath = path.join('public/avatars', filename);
        const avatar = await jimp.read(req.file.buffer);
        await avatar.writeAsync(filePath);
        req.file.path = filePath;
        next()
    } catch (error) {
        next(error)
    }

}

const verifyTokenChecker = async (req, res, next) => {
    try {
        const user = await findUserByVerificationToken(req.params.verificationToken);
        if (!user){
            res.status(404).json({
                msg: 'User not found'
            })
        }
        req.user = user;
        next()
        
    } catch (error) {
        next(error)
    }
}

const IsEmailVerifyed = (req, res, next) => {

    const user = req.user;

    if(user.verify === false){
        res.status(400).json({
            msg: 'Please, confirm You email.'
        })
    } else {
        next()
    }
 }

 const isEmailEntered = async (req, res, next) => {
    if(!req.body.email){
        res.status(400).json({
            msg: 'Missing required field email'
        })
    } else{
        req.user = await findUserByEmail(req.body.email) 
        if(!req.user){
            res.status(404).json({
                msg: 'User not found'
            })
        }
        next()
    }
 }

 const isUserVerifyed = (req, res, next) => {
    if(req.user.verify === true){
        res.status(400).json({
            msg: 'Verification has already been passed'
        }) 
    }else {
        next()
    }
 }

module.exports = {
    checkUniqueEmail, 
    checkToken, 
    uploadUserAvatar, 
    resizeUserAvatar, 
    saveUserAvatar, 
    verifyTokenChecker, 
    IsEmailVerifyed,
    isEmailEntered,
    isUserVerifyed,
};