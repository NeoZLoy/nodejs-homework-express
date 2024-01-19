const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const uuid = require('uuid').v4;

const { createUserValidation } = require("../helpers/user.validator");
const { createUser, findByEmail, findUserById, findUserByToken, findUserByVerificationToken  } = require("../services");
const { hashPwd } = require('../helpers/user.hash');
const {config} = require('../helpers/email.config')

const registrateUser = async (req, res, next) => {
    try {
        const {value, error} = createUserValidation(req.body);

        if(error){
            return res.status(400).json({
                msg: error.details.map((detail) => detail.message)
            })
        }
        // generate avatar
        const emailHash = crypto.createHash('md5').update(value.email).digest('hex');
        const avatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=wavatar`

        // hashing password
        const hashedPassword = await hashPwd(req.body.password)

        // creating new user
        const result = await createUser({...value, password: hashedPassword, avatar: avatarUrl, verificationToken: uuid(), verify: false });

        // send list to verify email

        const transporter = nodemailer.createTransport(config);

        const emailOptions = {
            from: 'fidd.michael@gmail.com',
            to: `${result.email}`,
            subject: 'Email verify',
            text: `Hello. You need to verify Your email! Link: /users/verify/${result.verificationToken}`,
        };

        transporter
            .sendMail(emailOptions)
            .then(info => console.log(info))
            .catch(err => console.log(err));


        return res.status(201).json({
            msg: 'Registration succesfull',
            user: { email: result.email, subscription: result.subscription }
        })
    } catch (error) {
        next(error)
    }
}

const verifyUserEmail = async (req, res, next) => {
   try {
        req.user.verify = true;
        req.user.verificationToken = null;
        await req.user.save();
        res.status(200).json({
            msg: 'Verification successful'
        })
   } catch (error) {
    next(error)
   }
}

const login = async (req, res, next) => {
    try {
        const user = await findByEmail(req.body.email)

        if(!user){
            return res.status(404).json({
                 msg: "User not found"
             })
         }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err || !result) {
              return res.status(401).json({
                msg: "Email or password is wrong"
              })
            }
        })

        const key = process.env.key;
        const token = jwt.sign({email: user.email, id: user.id} , key, { expiresIn: '1h' });
        user.token = token;
        await user.save()
            return res.status(200).json({
            msg: '++',
            res: {token, user: {email: user.email, subscription: user.subscription}},
            
        })
        
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const user = await findUserById(req.id);

        if(!user){
            res.status(401).json({
                msg: 'Not authorized'
            })
        }

        user.token = null;
        await user.save()

        return res.status(204).send();

    } catch (error) {
        next(error)
    }
}


const getCurrentUser = async (req, res, next) => {
    try {
        const user = await findUserByToken(req.token)
        if(!user){
            return res.status(401).json({
                msg: "Not authorized"
            })
        }

        return res.status(200).json({
            user: {email: user.email, subscription: user.subscription}
        })
    } catch (error) {
        next(error)
    }
}


const updateSubscription = async (req, res, next) => {
    try {
        const user = await findUserByToken(req.token)
        const subTypes = ['starter', 'pro', 'business']
        if(subTypes.includes(req.body.subscription)){
            user.subscription = req.body.subscription;
            await user.save()
            return res.status(201).json({
                msg: "User updated!",
                user: {email: user.email, subscription: user.subscription}
            })
        } else {
            return res.status(400).json({
                msg: "Bad request"
            })
        }
        
    } catch (error) {
       next(error) 
    }
}

const updateUserAvatar = async(req, res, next) => {
    try {
       if(req.file){
        const user = await findUserByToken(req.token)
        console.log(req.file)
        user.avatarUrl = req.file.path.replace('public', '')
        user.save()
        res.status(200).json({
            "msg": "Avatar updated!"
        })
       }

    } catch (error) {
        next(error)
    }
}

const sendVerificationMessage = async(req, res, next) => {
    try {
        const transporter = nodemailer.createTransport(config);

        const emailOptions = {
            from: 'fidd.michael@gmail.com',
            to: `${req.user.email}`,
            subject: 'Email verify',
            text: `Hello. You need to verify Your email! Link: /users/verify/:${req.user.verificationToken}`,
        };

        transporter
            .sendMail(emailOptions)
            .then(info => console.log(info))
            .catch(err => console.log(err));

        return res.status(200).json({
            msg: 'Confirmation link has been sent'
        })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    registrateUser, 
    login, 
    logout, 
    getCurrentUser, 
    updateSubscription, 
    updateUserAvatar, 
    verifyUserEmail, 
    sendVerificationMessage
}