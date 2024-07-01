const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// register a new user
const register = async (request, response) => {
    try{
        const {username, email, password, address} = request.body

        // check username is less than 4 
        if(username.length <= 4){
            response.status(400).json({ message: "Username length should be greater than or equal to 4"})
        }

        // check username already exists
        const usernameExists = await User.findOne({ username })
        if(usernameExists){
            response.status(400).json({ message: "Username already exists" })
        }

        // check email already exists
        const emailExists = await User.findOne({ email })
        if(emailExists){
            response.status(400).json({ message: "email already exists" })
        }

        // check password length
        if(password.length <= 5){
            response.status(400).json({ message: "password should be greater than or equal to 5"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
            address
        })

        response.status(201).json({ message: "Signup successfully" })

    }catch(err){
        response.status(500).json({ message: "Internal Server Error" })
    }
}

// login a user
const login = async(request, response) => {
    try{
        const { username, password } = request.body
        
        const user = await User.findOne({ username })
        if(!user){
            response.status(400).json({ message: "Please register"})
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if(!comparePassword){
            response.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ id: user._id}, process.env.SECRET_KEY, { expiresIn: "15m"} )
        
        response.status(200).json({
            id: user._id,
            role: user.role,
            token
        })
        // response.status(200).json({ message: "Successfully login"})
    }catch(err){
        response.status(500).json({ message: "Internal Server Error"})
    }
}

// user profile

const profile = async(request, response) => {
    try{
        const user = await User.findById(request.user._id)
        response.status(200).json(user)
    }catch(err){
        response.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    register,
    login,
    profile
}