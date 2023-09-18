import Users from "../models/userModel.js";
import { compareString, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
export const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if(!(firstName || lastName || email || password)){
        next("Provide required fields")
        return
    }
    try{
        const userExist = await Users.findOne({email})

        if(userExist){
            next("Email Address already exists")
            return
        }
        const hashedPassword = await hashString(password)

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        // res.status(201).json({
        //     success: true,
        //     message: "Registration successful!!!",
        //     user
        // })
        sendVerificationEmail(user, res)
    }catch(error){
        console.log(error)
        res.status(400).json({message: error.message})

    }
}

export const login = async(req, res, next) => {
    const { email, password } = req.body;
    if(!(email || password)){
        next("Provide required fields")
        return
    }

    try{
        const user = await Users.findOne({email}).select("+password").populate({
            path: "friends",
            select: "firstName lastName email -password"
        })

        if(!user){
            next("Invalid email or password!")
            return
        }

        if(!user?.verified){
            next("Please verify your email address")
            return
        }

        const isMatch = await compareString(password, user.password)

        if(!isMatch){
            next("Invalid email or password!")
            return
        }

        user.password = undefined

        const token = createJWT(user._id)

        res.status(200).json({
            success: true,
            message: "Login successful!!!",
            token,
            user

        })
        
    }catch(error){
        console.log(error)
        res.status(400).json({message: error.message})
    }
}