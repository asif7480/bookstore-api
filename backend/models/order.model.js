const mongoose = require("mongoose")

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        },
        status: {
            type: String,
            default: "Order Placed",
            enum: ["Order Placed", "Out of delivery", "Delivered", "Cancelled"]
        }
    }, 
    { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)
module.exports = Order