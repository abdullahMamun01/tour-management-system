const jwt =  require("jsonwebtoken")
const dotenv = require('dotenv');
const error = require("../utils/error");
const User = require("../models/User");
dotenv.config()

const authenticate = async (req,res,next) =>{


    try {
        let token = req.headers.authorization
        token = token.split(" ")[1]
        if(!token) throw error("Unauthorized" , 401)
        const decoded  = jwt.verify(token,process.env.SECRET_KEY)
        const user =await User.findById(decoded._id)
        if(!user) throw error("Unauthorized" , 401)
        req.user = decoded

        next()
        
    } catch (e) {
        return res.status(400).json({ message: 'Invalid token' }); 
    }
}

module.exports = {
    authenticate
}