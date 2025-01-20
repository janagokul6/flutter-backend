const mongoose = require("mongoose");

const userModel = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    return value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
                },
                message: "Invalid Email"
            }
        },
        dob: {
            type: String,
            required: true
        },
        countryCode: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {timestamps: {}},
)

module.exports = mongoose.model("User", userModel)