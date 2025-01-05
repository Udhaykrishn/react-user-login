import { UserJoiSchema, userUpdateJoiSchema } from "#schema/user.schema.js";
import PasswordHash from "#util/password.utils.js";
import UserData from "#util/user.util.js";
import JWT from "#util/jwt.utils.js";
import passwordService from "#util/password.utils.js";
export class UserServices {
  #userRepository;
  constructor({ userRepository }) {
    this.#userRepository = userRepository;
  }

  #FormValidate(payload) {
    const { error } = UserJoiSchema.validate(payload);
    if (error) {
      return { success: false, message: (error.details[0].message) };
    }
    return null;
  }

  async register(payload) {
    try {
      const validationError = this.#FormValidate(payload)
      if (validationError) {
        return validationError
      }
      const existingUser = await this.#userRepository.getUserByEmail(payload.email);

      if (existingUser) {
        return { success: false, message: "User already exists" };
      }

      const newUser = await this.#userRepository.create(payload);
      return {
        success: true,
        message: "User registered successfully",
        user: newUser,
      };
    } catch (error) {
      console.error(error.message);
      return {
        success: false,
        message: `Error during registration,Please try again`,
      };
    }
  }

  async login(payload) {
    const validationError = this.#FormValidate(payload)
    if (validationError) {
      return validationError
    }
    try {
      const user = await this.#userRepository.getUserByEmail(payload.email);

      if (!user) {
        return { success: false, message: "User not found" };
      }

      if (user.isBlocked) {
        return { success: false, message: "User blocked by admin" };
      }

      console.log(user.password, payload.password)

      const isPasswordMatch = await PasswordHash.verify(user.password, payload.password);

      console.log(isPasswordMatch)

      if (!isPasswordMatch) {
        return { success: false, message: "incorrect password!" };
      }

      const tokenPayload = UserData.extractTokenPayload(user);

      const token = JWT.generateToken(tokenPayload);

      return { success: true, message: "User logged successfully", token };
    } catch (error) {
      console.error(error.message);
      console.log(error);

      return { success: false, message: `Error during login,Please try again` };
    }
  }

  async update(id, payload) {
    try {
      const { error } = userUpdateJoiSchema.validate(payload);
      if (error) {
        return { success: false, message: error.details[0].message };
      }
      if (payload.password) {
        payload.password = await passwordService.hash(payload.password)
      }


      const updateUser = await this.#userRepository.updateUserById(id, payload);
      if (!updateUser) {
        return { success: false, message: "User not found" };
      }

      return { success: true, message: "User updated successfully", user: updateUser };
    } catch (error) {
      console.error(error.message);
      return { success: false, message: "Internal server error" };
    }
  }

  async profile(req) {
    try {
      const user = await this.#userRepository.getUserById(req.user.id)

      if (!user) {
        return { success: false, message: "User not found" }
      }

      user.password  = null;

      console.log(user,"user information from profile")

      return { success: true, message: "User logged is ", user }

    } catch (error) {
      console.log(error)
      return { success: false, message: "Internal server error" }
    }
  }


  async logout(res) {
    try {
      console.log("working this")
      res.clearCookie("userToken", {
        httpOnly: true,
        sameSite: "strict"
      });
      return { success: true, message: "User logout successfully" };
    } catch (error) {
      console.error("Error during user logout ", error.message);
      return {
        success: false,
        message: "Error during logout,Please try again",
      };
    }
  }
}
