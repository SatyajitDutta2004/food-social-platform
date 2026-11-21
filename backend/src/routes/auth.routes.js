const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/user/register", authController.registerUser);
//user auth apis
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);
//food partner auth apis
router.post("/food-partner/register", authController.registerFoodPartner);
router.post("/food-partner/login", authController.loginFoodPartner);
router.get("/food-partner/logout", authController.logoutFoodPartner);
module.exports = router;
