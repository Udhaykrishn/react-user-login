import UserServices from "#service/user.services.js";

class UserController {
  async register(req, res) {
    try {
      const payload = req.body;
      const user = await UserServices.register(payload)

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
      const user = await UserServices.login(payload)

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
      const result = UserServices.logout(res);
      if (result.success) {
        return res.json(200).json(result);
      } else {
        return res.json(400).json(result);
      }
    } catch (error) {} 
  }
}

export default new UserController(UserServices);
