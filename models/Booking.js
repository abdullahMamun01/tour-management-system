const mongoose = require("mongoose")
const { Schema, model } = mongoose


const bookingSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },
        tour: {
            type: Schema.Types.ObjectId,
            ref: 'Tour',
            require: true
        } ,
        status: {
            type: String,
            required: true,
            enum : ["PENDING", "APPROVE","IN-PROGRESS"],
            default: "PENDING"
        }
    },
    { timestamps: true }
)


const Booking = mongoose.model("Booking" , bookingSchema)

module.exports = Booking