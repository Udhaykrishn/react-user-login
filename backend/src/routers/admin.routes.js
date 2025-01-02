import { Router } from "express";
import { adminControllers } from "#container/admin.container.js";
import AdminAuthService from "#middleware/admin.middleware.js"

class AdminRouter{
    #router;
    constructor(){
        this.#router = Router(),
        this.#initRouter();
    }

    #initRouter(){
        // auth routes
        this.#router.post("/login",adminControllers.login)
        this.#router.post("/dashboard/logout",adminControllers.logout)

        // crud routes
        this.#router.get("/dashboard/users",AdminAuthService.adminAuth,adminControllers.users)
        this.#router.post("/dashboard/create",adminControllers.create)
        this.#router.patch("/dashboard/update/:id",adminControllers.update)
        this.#router.delete("/dashboard/delete/:id",adminControllers.delete)
    }

    getRoutes(){
        return this.#router;
    }
}

export default new AdminRouter().getRoutes();