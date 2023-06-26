const express = require("express");
const userController = require("../controller/user");
const authController = require("../controller/auth");
const router = express.Router();

router.post("/login", authController.login);

router
  .route("/")
  .post(userController.CreateNewUser)
  .get(userController.GetAllUsers);

router
  .route("/:id")
  .get(userController.GetUsersByID)
  .put(userController.UpdateUserByID);

module.exports = router;
