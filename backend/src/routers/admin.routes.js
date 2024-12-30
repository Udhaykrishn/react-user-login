import { Router } from "express";
import { adminControllers } from "#container/admin.container.js";

class AdminRouter{
    #router;
    constructor(){
        this.#router = Router(),
        this.#initRouter();
    }

    #initRouter(){
        // auth routes
        this.#router.post("/login",adminControllers.login)
        // this.#router.get("/dashbaord/logout")

        // crud routes
        // this.#router.get("/dashboard",this.#adminController)
        // this.#router.post("/dashbaord/create")
        // this.#router.patch("/dashbaord/edit/:id")
        // this.#router.delete("/dashbaord/delete/:id")
    }

    getRoutes(){
        return this.#router;
    }
}

export default new AdminRouter().getRoutes();