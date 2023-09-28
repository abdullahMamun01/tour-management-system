const { Schema, model } = require("mongoose")



const tourSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 10,
        max: 100
    },
    status: {
        type: String,
        required: true,
        enum: ["AVAILABLE", "NOT AVAILABLE"],
        default: "AVAILABLE",
        // uppercase: true
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        uppercase: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    places: {
        type: [String],
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: true,
        trim: true

    }],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true,
        min: 0
    }

}, { timestamps: true })


const Tour = model("Tour", tourSchema)


module.exports = Tour