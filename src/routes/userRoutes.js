const express=require("express")
const router=express.Router()

const { getLogin, getHome , getSignup } = require("../controllers/userController");


router.get("/",getHome)
router.get("/login",getLogin)
router.get("/register",getSignup)
module.exports = router