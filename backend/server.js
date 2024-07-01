const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv").config()

const PORT = process.env.PORT
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/book", require("./routes/bookRoutes"))

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`) )