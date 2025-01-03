import { upload } from "#config/multer.config.js";
import { UserControllers } from "#container/user.container.js";
import { Router } from "express";
import  UserAuthService  from "#middleware/user.middleware.js";

class UserRoutes {
  #router;
  constructor() {
    this.#router = Router();
    this.#initRouter();
  }

  #initRouter() {
    this.#router.post("/register", UserControllers.register);
    this.#router.post("/login", UserControllers.login);
    this.#router.post("/logout", UserControllers.logout);
    this.#router.get("/profile",UserAuthService.userVerify,UserControllers.profile); 
    this.#router.patch("/update/:id",upload.single("file"),UserControllers.update)
  }

  getRouter() {
    return this.#router;
  }
}

export default new UserRoutes().getRouter();
