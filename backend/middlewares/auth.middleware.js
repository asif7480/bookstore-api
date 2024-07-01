const jwt = require("jsonwebtoken")
const User = require("../models/user.model");

const authMiddleware = async(request, response, next) => {
    let token;
    try{
        if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")){
            token = request.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decoded);
            request.user = await User.findById(decoded.id).select("-password")
            console.log(request.user);

            next()
        }
    }catch(err){
        response.status(400).json(err)
    }

    if(!token){
        response.status(401).json({message: "token expired" })
    }
}

const isAdmin = async (request, response, next) => {
    const user = await User.findOne(request.user._id)
    if(user.role !== "admin"){
        response.status(401).json({ message: "Only admin can add books" })
    }
    next()
}

module.exports = {authMiddleware, isAdmin}