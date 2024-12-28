import UserController from "#controller/user.controller.js";
import {Router} from "express"

const router = Router();

router.get("/register",UserController.login)
router.get("/login",UserController.register)

export default router;