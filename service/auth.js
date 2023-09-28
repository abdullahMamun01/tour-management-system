const bcrypt = require("bcrypt")
const { createNewUser, findUserByProperty } = require("./user")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config()
const secretKey = process.env.SECRET_KEY
// console.log(randomBytes)


const registerService = async ({ name, username, email, password }) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return createNewUser({ name, username, email, password: hash })
}
//return a token
const loginService = async ({ email, password }) => {
    const user = await findUserByProperty("email", email)
    // console.log(user)
    if (!user) {
        throw error("Invalid Credential", 404)
    }

    const payload = {
        _id: user._id,
        email: user.email,
        role : user.roles
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw error("Invalid Credential", 404)
    const token = jwt.sign(payload, secretKey, { expiresIn: 60 * 60 })
    // console.log(token)
    return token
}


module.exports = {
    registerService,
    loginService
}