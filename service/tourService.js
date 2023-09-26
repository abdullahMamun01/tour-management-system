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
        status,
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

const findAllTours = () =>{
    return Tour.find({})
}
const findTourById = ({tourID}) =>{
    return Tour.findById({_id : tourID})
}

const updateTourBYId = (id,updateData) =>{
    const update = Tour.findOneAndUpdate({_id : id} , {...updateData} , {new: true})
    return update
}

module.exports = {
    createTour,
    findAllTours ,
    findTourById,
    updateTourBYId
}