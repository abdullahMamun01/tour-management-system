
const mongoose = require("mongoose")
const { Schema } = mongoose
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 5,
            max: 30
        },
        username: {
            type: String,
            required: true,
            min: 3,
            max: 10,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: props => `${props.value} is not a valid email`
            },


        },
        password: {
            type: String,
            required: true,
            minLength: [6, "password must be at least 6 character"],
        },
        roles: {
            type: String,
            required: true,
            enum :["USER" ,"ADMIN"],
            default: 'USER',
        },
    },
    {timestamps: true}
)


const User = mongoose.model('User', userSchema);
module.exports = User