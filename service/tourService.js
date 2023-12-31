const Tour = require("../models/Tour")
const error = require("../utils/error")


const createTour = ({
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
}) => {

    const tour = new Tour({
        name,
        status ,
        country,
        location,
        places,
        duration,
        images,
        price,
        description,
        availableSeats
    })

    return tour
}

const findAllTours = () => {
    return  Tour.find({ status: /^available$/i }).exec();
}
const findTourById =  ( tourID ) => {
    return Tour.findById(tourID)
}

const updateTourBYId = (id, updateData) => {
    const update = Tour.findOneAndUpdate({ _id: id }, { ...updateData }, { new: true })

    return update
}
// const deleteTourById =  () =>{

// }
const deleteImageByUrlService = async (id, url) => {
    const tour = await Tour.findOne({ _id: id, images: url })
    console.log(tour)
    if (!tour) throw error("image not found", 404)
    const updateTour = Tour.updateOne(
        { _id: id },
        { $pull: { images: url } },
    )
    return updateTour
}

const findTourByKeyAndValue = (key, value) => {
    return Tour.findOne({ [key]: value })
}

module.exports = {
    createTour,
    findAllTours,
    findTourById,
    updateTourBYId,
    deleteImageByUrlService,
    findTourByKeyAndValue
}