const express=require("express")
const router=express.Router()

const { getLogin, getHome , getSignup, registerUser, loginUser } = require("../controllers/userController");


router.get("/",getHome)
router.get("/login",getLogin)
router.get("/register",getSignup)

router.post("/login",loginUser)
router.post("/register",registerUser)

module.exports = router