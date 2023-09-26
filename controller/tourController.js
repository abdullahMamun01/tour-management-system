const Tour = require("../models/Tour")
const { createTour, findAllTours, findTourById, updateTourBYId } = require("../service/tourService")
const error = require("../utils/error")

const getTours = async (req, res, next) => {
    try {
        const tours = await findAllTours()
        return res.status(200).json({ total: tours.length, data: tours })
    } catch (e) {
        next(e)
    }
}
const getTourById = async (req, res, next) => {
    const {tourID} = req.params

    try {
        const tour = await findTourById({ tourID })
        if (!tour) {
            throw error("not found", 400)
        }
        return res.status(200).json({ data: tour })
    } catch (e) {
        next(e)
    }
}
//update a tour by given id
const patchTourById = async (req, res, next) => {
    const {tourID} = req.params
    try {
        let tour = await findTourById({ tourID })
        if (!tour) {
            throw error("not found", 400)
        }
        tour = await updateTourBYId(tourID,req.body)
        return res.status(200).json({ data: tour })
    } catch (e) {
        next(e)
    }
}

//create a tour 
const postTour = async (req, res, next) => {

    try {
        const tour = createTour(
            req.body
        )
        await tour.save()
        return res.status(201).json({ data: tour })
    } catch (e) {
        next(e)
    }
}

const deleteTourById = async (req, res, next) => {
    const {tourID} = req.params
    try {
        let tour = await findTourById({ tourID })
        await tour.deleteOne();
        return res.status(204).json({message:"Delete a tour successfully"})
    } catch (e) {
        next(e)
    }
}


module.exports = {
    getTours,
    getTourById,
    patchTourById,
    postTour,
    deleteTourById
}