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


    

}
z
export default new UserController();