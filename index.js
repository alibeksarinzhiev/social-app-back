import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'




const app = express()
dotenv.config()

// ПЕРЕМЕННЫЕ ИЗ .env

const PORT = process.env.PORT || 8081
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME




app.use(cors())
app.use(express.json())
app.use('/auth',authRoute)








async function start(){
    try{
        await mongoose.connect(`mongodb+srv://alibek:alibek123@cluster0.ecjrtk4.mongodb.net/social-app?retryWrites=true&w=majority`)

        app.listen(PORT,()=>console.log(`сервер запущен на ${PORT}`))
    }
    catch (error){
        console.log(error)
    }
}
start();