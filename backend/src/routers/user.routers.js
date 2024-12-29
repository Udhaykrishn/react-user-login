import { UserControllers } from "#container/user.container.js";
import { Router } from "express";

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
  }

  getRouter() {
    return this.#router;
  }
}

export default new UserRoutes().getRouter();
