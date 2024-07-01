const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        },
        favourites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            }
        ],
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            }
        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            }
        ]
    }, 
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)
module.exports = User