import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import  Verification  from '../models/emailVerification.js';
import { hashString } from './index.js';

import { v4 as uuidv4 } from 'uuid';

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

let transporter = nodemailer.createTransport({
    // host: "smtp.forwardemail.net",
    // port: 465,
    // secure: true,
    service: "gmail",
    auth : {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD
    }
})


export const sendVerificationEmail = async (user, res) => {
    const { _id, email, lastName } = user;

    const token = _id + uuidv4();
    
    const link = APP_URL + '/user/verify' + _id + '/' + token;

    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: 'Email Verification',
        html: `<h1>Hi ${lastName}</h1>
        <p>Click the link below to verify your email address</p>
        <a href=${link}>${link}</a>`
    }

    try{
        const hasedToken = await hashString(token);
        const newVerifiedEmail = await Verification.create({
            userId: _id,
            token: hasedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000
        })
        console.log(newVerifiedEmail);
        if(newVerifiedEmail){
            transporter.sendMail(mailOptions).then(() => {
                res.status(201).send({success: "PENDING", message: 'Verification email sent'})
            }).catch((error) => {
                console.log(error)
                res.status(404).json({error: error.message})
            })
        }
    }catch(error){
        console.log(error)
        res.status(400).json({message: error.message})
    }
}