const {Schema, model} = require("mongoose")



const tourSchema = new Schema({
    name : {
        type : String ,
        require: true ,
        unique: true,
        min: 10 ,
        max : 100
    },
    status :{
        type : String,
        require: true ,
        enum : ["available" , "not available"] ,
        default : "available" ,
    },
    country : {
        type : String ,
        require: [true, "Country is required"],
        uppercase: true,
        trim : true
    },
    location : {
        type : String ,
        require : true,
        trim: true,
    },
    places: {
        type: [String],
        required: true,
    },
    duration : {
        type : String ,
        require : true ,
    },
    images : [{
        type : String,
        require : true,
        trim: true
        
    }] ,
    price : {
        type : Number ,
        require : true,
        min :  0  
    },
    description : {
        type: String,
        require : true
    },
    availableSeats : {
        type : Number ,
        require: true ,
        min : 5 ,
    }
      
}, {timestamps : true})


const Tour = model("Tour" , tourSchema)


module.exports = Tour