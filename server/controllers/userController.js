import mongoose from "mongoose";
import Verification from "../models/emailVerification.js";
import Users from "../models/userModel.js";
import { compareString, hashString } from "../utils/index.js";
export const verifyEmail = async (req, res) => {
    const {userId, token} = req.params;
    try{
        const result = await Verification.findOne({userId});
        if(result){
            const { expiresAt, token: hashedToken } = result;
            //token has expires
            if(expiresAt < Date.now()){
                Verification.findOneAndDelete({userId})
                    .then(() => {
                        Users.findOneAndDelete({_id: userId})
                        .then(() => {
                            const message = "Verification link has expired. Please register again"
                            res.redirect(`/users/verified?status=error&message=${message}`)
                        }).catch((error) => {
                            console.log(error + " " + "error1")
                            res.redirect(`/users/verified?status=error&message=`);
                        }); 
                    }).catch((error) => {
                        console.log(error + " " + "error2")
                        res.redirect(`/users/verified?message=`);
                    });
            }else{
                    //token has not expired
                    compareString(token, hashedToken)
                        .then((isMatch) => {
                            console.log(isMatch);
                            if(isMatch){
                                Users.findOneAndUpdate({_id: userId}, {verified: true})
                                .then(() => {
                                    Verification.findOneAndDelete({userId})
                                    .then(() => {
                                        const message = "Your email has been verified successfully"
                                        res.redirect(`/users/verified?status=success&message=${message}`)
                                    })
                                })
                                .catch((error) => {
                                    console.log(error + " " + "error3")
                                    const message = "Verification failed or link is invalid"
                                    res.redirect(`/users/verified?status=error&message=${message}`)
                                })
                            } else{
                                //invalid token 
                                const message = "Verification failed or link is invalid"
                                res.redirect(`/users/verified?status=error&message=${message}`)
                            }
                        }).catch((err) => {
                            console.log(err + " " + "error4");
                            res.redirect(`/users/verified?status=error&message=`);
                        })
            }
        }else{
            const message = "Verification failed or link is invalid"
            res.redirect(`/users/verified?status=error&message=${message}`)
        }
    }catch(error){
        console.log(error + " " + "error5")
        // res.status(400).json({message: error.message})
        res.redirect(`/users/verified?status=error&message=`);
    }
}
