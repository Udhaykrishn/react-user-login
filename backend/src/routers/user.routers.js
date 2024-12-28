import UserController from "#controller/user.controller.js";
import { Router } from "express"

class UserRoutes {
    constructor() {
        this.router = Router();
        this.initRouter();
    }

    initRouter() {
        this.router.post("/register", UserController.register)
        this.router.post("/login", UserController.login)
    }

    getRouter() {
        return this.router;
    }
}

export default new UserRoutes().getRouter();