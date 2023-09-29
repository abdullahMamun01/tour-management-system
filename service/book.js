const Booking = require("../models/Booking");


const findAllBooks = () =>{
    return Booking.find({})
}


module.exports = {
    findAllBooks
}