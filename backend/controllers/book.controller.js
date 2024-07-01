const User = require("../models/user.model")
const Book = require("../models/book.model")


// add-book --admin
const addBook = async(request, response) => {
    try{
        const { url, title, author, price, desc, language} = request.body

        const book = await Book.create({
            url,
            title,
            author,
            price,
            desc,
            language
        })
        response.status(201).json(book)
    }catch(error){
        response.status(500).json({ message: "Internal Server Error" })
    }
}

// update-book --admin
const updatedBook = async(request, response) => {
    try{
        const { id } = request.params
        
        // const book = await Book.findById(request.params.id)
        const book = await Book.findById(id)

        if(!book){
            response.status(400).json({ message: "Book not found" })
        }
        const updatedBook = await Book.findByIdAndUpdate( id, request.body, { new: true })

        response.status(200).json(updatedBook)        
    }catch(error){
        response.status(500).json({ message: "Internal Server Error"})
    }

}

// delete book --admin
const deleteBook = async(request, response) => {
    try{
        const book = await Book.findById(request.params.id)
        if(!book){
            response.status(400).json({ message: "Book not found" })
        }
    
        await Book.findByIdAndDelete(request.params.id)
        response.status(200).json({ message: "Book delete successfully"})

    }catch(error){
        response.status(500).json({ message: "Internal Server Error"})
    }
}

// get all books 
const getAllBooks = async(request, response) => {
    try{
        const books = await Book.find().sort({ createdAt: -1 })

        response.status(200).json({ books })
    }catch(error){
        response.status(500).json({ message: "Internal Server Error"})
    }
}

// get recent books 
const getRecentBooks = async(request, response) => {
    try{
        const books = await Book.find().sort({ createdAt: -1 }).limit(4)

        response.status(200).json({ books })
    }catch(error){
        response.status(500).json({ message: "Internal Server Error"})
    }
}

// get book by id 
const getSingleBook = async(request, response) => {
    try{

        const book = await Book.findById(request.params.id)
        if(!book){
            response.status(400).json({ message: "Book not found" })
        }
        response.status(200).json( book )
    }catch(error){
        response.status(500).json({ message: "Internal Server Error"})
    }
}

module.exports = {
    addBook,
    updatedBook,
    deleteBook,
    getAllBooks,
    getRecentBooks,
    getSingleBook
}