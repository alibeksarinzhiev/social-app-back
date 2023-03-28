import { Router } from "express";
import {getMe, login, register} from "../controlers/auth";

const router = Router();
// РЕГИСТРАЦИЯ
// http://localhost:8080/auth/register

router.post('/register',register)

// ЛОГИн
// http://localhost:8080/auth/login
router.post('/login',login)

// ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ
//http://localhost:8080/auth/get
router.get('/me',getMe)

export default router