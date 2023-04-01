import User from '../models/User.js'
import bscrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'




export const  register= async (req,res)=>{
    try {
        const {username,password} = req.body

        const isUsed = await User.findOne({username})
        if (isUsed){
            return res.json({
                message:'данный user уже занят'
            })
        }
        const salt = bscrypt.genSaltSync(10)
        const hash = bscrypt.hashSync(password,salt)

        const newUser = new User({
            username,
            password:hash,
        })
        const token=jwt.sign(
            {
                id:newUser._id,
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'},
        )
        await newUser.save()
        res.json({
            newUser,
            token,
            message:'регистрация прошла успешна'
        })

    }catch (error){}
}

export const login = async (req,res)=>{
    try {
        const {username,password} = req.body
        const user = await User.findOne({username})

        if (!user){
            return res.json({
                message:'неверное имя пользателя'
            })
        }
        const isPasswordTrue = await bscrypt.compare(password,user.password)

        if (!isPasswordTrue){
            return res.json({
                message:"неверный пароль"
            })
        }
        const token=jwt.sign({
            id:user._id
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )
        res.json({
            token,
            user,
            message:'вы успешно вошли на сайт'
        })


    }catch (error){
        console.log(error)
    }
}

export const getMe = async (req,res)=>{
    try {
        const user = await User.findById(req.userId)

        if (!user){
            return res.json({
                message:'такого юзера не сущ'
            })
        }
        const token=jwt.sign({
                id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )
        res.json({
            token,
            user,
            message:'вы успешно вошли на сайт'
        })

    }catch (error){
        console.log(error)
    }
}