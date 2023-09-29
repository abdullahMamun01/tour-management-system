
const Tour = require("../models/Tour")
const {
    createTour,
    findAllTours,
    findTourById,
    updateTourBYId,
    deleteImageByUrlService,

} = require("../service/tourService")

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
    const { tourID } = req.params

    try {
        const tour = await findTourById( tourID )
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
    const { tourID } = req.params
    try {
        let tour = await findTourById({ tourID })
        if (!tour) {
            throw error("not found", 400)
        }
        tour = await updateTourBYId(tourID, req.body)
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
    const { tourID } = req.params
    try {

        let tour = await findTourById({ tourID })
        if(!tour) throw error("The tour id is not valid" , 404)
        await tour.deleteOne();
        return res.status(204).json({ message: "Delete a tour successfully" })
    } catch (e) {
        next(e)
    }
}
const deleteImageByUrl = async (req, res, next) => {
    const { tourID } = req.params;
    const { imageUrl } = req.query;
    try {
        
        const deleteTourImage = await deleteImageByUrlService(tourID, imageUrl)
        if (deleteTourImage.nModified === 0) throw error("image is not update ", 400)
        return res.status(200).json({ message: "Successfully deleted the image" });
    } catch (e) {

        next(e);
    }
}

//enable tour by given id
const getEnable = async (req, res, next) => {
    const { tourID } = req.params
    try {
        const tour = await Tour.findById({ _id: tourID })

        if (!tour) throw error("Tour not found", 404)
        if (tour.status === "available" || tour.status === "AVAILABLE") {
            throw error("Already Available", 404)
        }

        if (tour.status === "not available" || tour.status === "NOT AVAILABLE") {
            tour.status = "AVAILABLE"
            await tour.save()
        }
        return res.status(200).json({ message: "Tour enable successfully", data: tour })
    } catch (e) {
        next(e)
    }
}

//disable tour by given id
const getDisable = async (req, res, next) => {
    const { tourID } = req.params
    try {
        const tour = await Tour.findById({ _id: tourID })
        if (!tour) throw error("Tour not found", 404)

        if (tour.status === "NOT AVAILABLE") {
            throw error("Already Disable", 404)
        }
        if ( tour.status === "AVAILABLE") {
            tour.status = "NOT AVAILABLE"
            await tour.save()
        }
        
        return res.status(200).json({ message: "Tour disable successfully", data: tour })
    } catch (e) {
        next(e)
    }
}


module.exports = {
    getTours,
    getTourById,
    patchTourById,
    postTour,
    deleteTourById,
    deleteImageByUrl,
    getEnable,
    getDisable
}