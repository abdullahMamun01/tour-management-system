const Tour = require("../models/Tour")
const { createTour, findAllTours } = require("../service/tourService")

const getTours = async (req, res, next) => {
    try {
        const tours = await findAllTours()
        return res.status(200).json({data: tours})
    } catch (e) {
        next(e)
    }
}
const getTourById = (req, res, next) => {

}
//update a tour
const patchTourById = (req, res, next) => {

}

//create a tour 
const postTour = async (req, res, next) => {
    const {
        name,
        status,
        country,
        location,
        places,
        duration,
        images,
        price,
        description,
        availableSeats
    } = req.body

    try {
        const tour = createTour(
            {
                name,
                status,
                country,
                location,
                places,
                duration,
                images,
                price,
                description,
                availableSeats
            }
        )
        await tour.save()
        return res.status(201).json({data : tour})
    } catch (e) {
        next(e)
    }
}

const deleteTourById = (req, res, next) => {

}


module.exports = {
    getTours,
    getTourById,
    patchTourById,
    postTour,
    deleteTourById
}