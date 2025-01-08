// ** routes/users.mjs
// ** imports
import express from "express";
const router = express.Router();
import userController from "../controllers/user.mjs";

// this corresponds to regisiter on the frontend because register means add a new user
router.post("/", userController.create);

export default router;
