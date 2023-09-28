const Booking = require("../models/Booking")
const Tour = require("../models/Tour")
const { findTourById } = require("../service/tourService")
const error = require("../utils/error")

/* 
 tour                          booking

*/
const getBooking = async (req,res,next) =>{
    const {tourID} = req.params
    try {
        const tour = await findTourById(tourID)
        if(!tour) throw error("Tour not found" , 404)
        const available = await Tour.findOne({ _id:tourID,status: "AVAILABLE"})

        if(!available) throw error("Currently Not Available this tour" , 404)
        const userId = req.user._id
        const userBook = await Booking.findOne({user:req.user._id,tour:tourID})
        if(userBook) throw error("Already book" , 409)
        const book = new Booking({user:userId ,tour:tourID})
        await book.save()

        if(tour.availableSeats === 1) {
            tour.status = "NOT AVAILABLE"
            await tour.save()
            // throw error("Already book" , 409)
        }
        if(tour.availableSeats > 0){
            tour.availableSeats = tour.availableSeats - 1
            await tour.save()
        }
         
        return res.status(201).json({message: "Tour booking successfully" , book})
    } catch (e) {
        next(e)
    }
    
}




module.exports = {
    getBooking
}