import UserController from "#controller/user.controller.js";
import {Router} from "express"

const router = Router();

router.post("/register",UserController.login)
router.post("/login",UserController.register)

export default router;