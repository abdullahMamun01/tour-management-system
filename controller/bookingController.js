const Booking = require("../models/Booking")
const Tour = require("../models/Tour")
const { findAllBooks } = require("../service/book")
const { findTourById } = require("../service/tourService")
const error = require("../utils/error")

const getBooking = async (req, res, next) => {
    const { tourID } = req.params
    try {
        //find tour by given id
        const tour = await findTourById(tourID)
        //check if not found this tour
        if (!tour) throw error("Tour not found", 404)
        //find available for booking
        const available = await Tour.findOne({ _id: tourID, status: "AVAILABLE" })
        if (!available) throw error("Currently Not Available this tour", 404)
        //user id
        const userId = req.user._id
        //check find user booking the tour
        const userBook = await Booking.findOne({ user: req.user._id, tour: tourID })
        //check if already booking
        if (userBook) throw error("Already book", 409)
        //booking for the tour
        const book = new Booking({ user: userId, tour: tourID })
        await book.save()
        //check available seat is 1
        if (tour.availableSeats === 1) {
            tour.status = "NOT AVAILABLE"
            await tour.save()
        }
        //decrease seat
        if (tour.availableSeats > 0) {
            tour.availableSeats = tour.availableSeats - 1
            await tour.save()
        }

        return res.status(201).json({ message: "Tour booking successfully", book })
    } catch (e) {
        next(e)
    }

}

const getApprove = async (req, res, next) => {
    const { bookingId } = req.params
    try {
        const booking = await Booking.findById(bookingId)
        if (!booking) throw error("Booking id is not valid", 404)
        const approve = await Booking.findOne({ _id: bookingId, status: "APPROVE" })
        if (approve) throw error("The booking has already been approved", 409)
        booking.status = "APPROVE"
        await booking.save()
        return res.status(200).json({ message: "Approve successfully", book: booking })
    } catch (e) {
        next(e)
    }
}

const getALLBook = async(req,res,next) =>{
    const {bookingId} = req.params
    try {
        
        const book =await findAllBooks(bookingId)
        // if(!book) throw error("The booking id is not valid" , 404)
  
        return res.status(200).json(book)
    } catch (e) {
        next(e)
    }
}
module.exports = {
    getBooking,
    getApprove,
    getALLBook
}