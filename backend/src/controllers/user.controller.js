 class UserController {
  #userService;
  constructor({userService}) {
    this.#userService = userService;
  }
  async register(req, res) {
    try {
      const payload = req.body;
      const user = await this.#userService.register(payload);

      if (user.success) {
        return res.status(201).json(user);
      } else {
        return res.status(400).json(user);
      }
    } catch (error) {
      console.error("Error in UserController.resiger: ", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async login(req, res) {
    try {
      const payload = req.body;
      const user = await this.#userService.login(payload);

      if (user.success) {
        return res.status(200).json(user);
      } else {
        return res.status(401).json(user);
      }
    } catch (error) {
      console.error("Error in UserController.login: ", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async logout(req, res) {
    try {
      const result = await this.#userService.logout(res);
      console.log(result);
      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.log("Error during the logout", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }
  }
}

export {UserController}