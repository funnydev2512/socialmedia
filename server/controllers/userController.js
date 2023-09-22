import mongoose from "mongoose";
import Verification from "../models/emailVerification";
import User from "../models/userModel";
import { compareString, hashString } from "../utils/index";
export const verifyEmail = async (req, res) => {
    const {userId, token} = req.params;

    try{
        const result = Verification.findOne({userId});

        if(result){
            const { expiresAt, token: hashedToken } = result;

            //token has expires
            if(expiresAt < Date.now()){
                Verification.findOneAndDelete({userId})
                    .then(() => {
                        User.findOneAndDelete({_id: userId})
                        .then(() => {
                            const message = "Verification link has expired. Please register again"
                            res.redirect(`/user/verified?status=error&message=${message}`)
                        }).catch((error) => {
                            console.log(error)
                            res.redirect(`/user/verified?status=error&message=`);
                        }); 
                    }).catch((error) => {
                        console.log(error)
                        res.redirect(`/user/verified?message=`);
                    });
            }else{
                //token has not expired
                compareString(token, hashedToken)
                  .then((isMatch) => {
                    if(isMatch){
                        User.findOneAndUpdate({_id: userId}, {verified: true})
                        .then(() => {
                            Verification.findOneAndDelete({userId})
                            .then(() => {
                                const message = "Your email has been verified successfully"
                                res.redirect(`/user/verified?status=success&message=${message}`)
                            })
                            .catch((error) => {
                                console.log(error)
                                res.redirect(`/user/verified?message=`)
                            })
                        })
                    })
                        .catch((error) => {
                            console.log(error)
                            res.redirect(`/user/verified?message=`)
                        })
                    }
                    )}
                  .catch((err) => {
                    console.log(err);
                    res.redirect(`/user/verified?message=`)
                  })
            }
    }catch(error){
        console.log(error)
        res.status(400).json({message: error.message})
    }
}