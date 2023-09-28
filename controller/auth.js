
const jwt = require("jsonwebtoken")
const { registerService, loginService } = require("../service/auth")
const { findUserByProperty } = require("../service/user")
const error = require("../utils/error")

// dotenv.config();
// const secretKey = process.env.SECRET_KEY

const registerController = async (req, res, next) => {
    const { name, username, email, password } = req.body

    try {
        const findEmail = await findUserByProperty("email", email)
        const findUsername = await findUserByProperty("username", username)
        if (findEmail) {
            throw error("Email already register", 404)
        }
        if (findUsername) {
            throw error("Username already register", 404)
        }
        const newUser = await registerService({ name, username, email, password })
        await newUser.save()
        return res.status(201).json({ message: "user register successfully", user: newUser })
    } catch (e) {
        next(e)
    }
}
const loginController = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const token = await loginService({email,password})
    
        
        // console.log(decoded )
        return res.status(202).json({message:"login successfully", token} )
        // next()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    registerController,
    loginController
}