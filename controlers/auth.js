import User from '../models/User.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'




export const register = async (req,res)=>{
    try {
        const {username,password} = req.body

        const used = await User.findOne({username})

        if (used){
            return res.json({
                message:'данный пользователь занят'
            })
        }
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            password:hash,
        })
        await newUser.save()

        res.json({
            newUser,
            message:'РЕгистрация прошла успешно'
        })


    }catch (error){
        res.json({message:'ошибка при создании пользователя'})
    }
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
        const isPasswordTrue = await bcryptjs.compare(password,user.password)

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

    }catch (error){
        console.log(error)
    }
}