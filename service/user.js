const User = require("../models/User")


const createNewUser = ( {name,username,email,password}) =>{
    const user = new User( {name,username,email,password})
    return user
}
const findUserByProperty = (key,value) =>{
    return User.findOne({[key] : value})
}
module.exports = {
    createNewUser,
    findUserByProperty
}