const bcrypt = require('bcrypt');

const saltRounds = 10;


const hashPwd = async(pwd) => {
    try {
        const salt =  await bcrypt.genSalt(saltRounds);
        const hashed = await bcrypt.hash(pwd, salt);
        return hashed;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {hashPwd}