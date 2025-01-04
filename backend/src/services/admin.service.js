import JwtService from "#util/jwt.utils.js";
import PasswordService from "#util/password.utils.js"
import { UserJoiSchema, adminJoiSchema, userUpdateJoiSchema } from "#schema/index.js";
import TokenPaylod from "#util/user.util.js"

export class AdminServices {
    #adminRepository;
    #user;
    constructor({ adminRepository, userRepository }) {
        this.#adminRepository = adminRepository
        this.#user = userRepository
    }

    async users() {
        try {
            const users = await this.#user.getAllUser();
            return {
                success: true, message: "All users", users
            }
        } catch (error) {
            console.log(error)
            return {
                success: false, message: "Failed to fetch user information"
            }
        }
    }

    async login(payload) {
        try {
            const { error } = adminJoiSchema.validate(payload);
            if (error) {
                return { success: false, message: error.details[0].message }
            }
            const admin = await this.#adminRepository.findByEmail(payload.email)

            if (!admin) {
                return {
                    success: false,
                    message: "Email or password is incorrect"
                }
            }

            const checkPassword = await PasswordService.verify(admin.password, payload.password)

            if (!checkPassword) {
                return {
                    success: false,
                    message: "Email or password is incorrect"
                }
            }

            const adminPayload = TokenPaylod.extractTokenPayload(admin)
            const token = JwtService.generateToken(adminPayload)

            return { success: true, message: "Admin login successfully", token }

        } catch (error) {
            console.error(error.message)
            console.log(error)
            return {
                success: false,
                message: "Internal server error"
            }
        }
    }

    async logout(res) {
        res.clearCookie("adminToken")

        return { success: true, messssage: "Admin logout successfully" }
    }

    async create(payload) {
        try {
            const { error } = UserJoiSchema.validate()
            if (error) {
                return { success: false, message: error.details[0].message }
            }
            const user = await this.#user.getUserByEmail(payload.email);
            if (user) {
                return { success: false, message: "User already Exsits" }
            }
            const newUser = await this.#user.create(payload)
            return { success: true, message: "User created successfully", user: newUser }
        } catch (error) {
            console.log(error.message)
            return { success: false, message: "Interval server error" }
        }
    }

    async update(id, payload) {
        try {
            const { error } = userUpdateJoiSchema.validate()
            if (error) {
                console.log(error.details[0].message)
                return { success: false, message: error.details[0].message }
            }

            const existsUser = await this.#user.getUserByEmail(payload.email)
            if (existsUser) {
                return { success: false, message: "User already exists" }
            }

            const updateUser = await this.#user.updateUserById(id, payload)
            return { success: true, message: "User updated successfully", user: updateUser }
        } catch (error) {
            console.log(error.message)
            return { success: false, message: "Interval server error" }
        }
    }
    async delete(id) {
        try {
            const existsUser = await this.#user.getUserById(id)
            if (!existsUser) {
                return { success: false, message: "User not found" }
            }
            const deleteUser = await this.#user.deleteUserById(id)
            return { success: true, message: "User deleted successfully", user: deleteUser }
        } catch (error) {
            console.log(error.message)
            return { success: false, message: "Intervala server error" }
        }
    }
}