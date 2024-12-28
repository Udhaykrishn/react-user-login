import UserService from "#service/user.services.js"

class UserController {
    constructor() {
        this.userService = UserService
    }
    async register(req, res) {
        try {
            const payload = req.body;
            const user = await this.userService.register(payload)

            if (user.success) {
                return res.status(201).json(user);
            } else {
                return res.status(400).json(user);
            }
        } catch (error) {
            console.error("Error in UserController.resiger: ", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }


    async login(req, res) {
        try {
            const payload = req.body;
            const user = await this.userService.login(payload)

            if (user.success) {
                return res.status(200).json(user);
            } else {
                return res.status(401).json(user);
            }
        } catch (error) {
            console.error("Error in UserController.resiger: ", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }

}

export default new UserController();