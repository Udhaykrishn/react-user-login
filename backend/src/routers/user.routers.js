import UserController from "#controller/user.controller.js";
import { Router } from "express"

class UserRoutes {
    #userController;
    #router;
    constructor() {
        this.#userController = UserController
        this.#router = Router();
        this.#initRouter();
    }

    #initRouter() {
        this.#router.post("/register", this.#userController.register)
        this.#router.post("/login", UserController.login)
        this.#router.post("/logout",UserController.logout)
    }

    getRouter() {
        return this.#router;
    }
}

export default new UserRoutes(UserController).getRouter();