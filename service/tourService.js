const Tour = require("../models/Tour")


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

module.exports = {
    createTour,
    findAllTours
}