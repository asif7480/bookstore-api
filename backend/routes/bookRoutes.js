const express = require("express")
const router = express.Router()
const User = require("../models/user.model")
const Book = require("../models/book.model")

const { authMiddleware, isAdmin } = require("../middlewares/auth.middleware")
const { 
        addBook, 
        updatedBook, 
        deleteBook, 
        getAllBooks, 
        getRecentBooks, 
        getSingleBook 
    } = require("../controllers/book.controller")



router.post("/add-book", authMiddleware, isAdmin, addBook)

router.put("/update-book/:id", authMiddleware, isAdmin, updatedBook)

router.delete("/delete-book/:id", authMiddleware, isAdmin, deleteBook)

router.get("/all-books", getAllBooks)

router.get("/recent-books", getRecentBooks)

router.get("/get-book/:id", getSingleBook)

module.exports = router