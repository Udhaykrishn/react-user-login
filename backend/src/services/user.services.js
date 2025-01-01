import { UserJoiSchema } from "#schema/user.schema.js";
import PasswordHash from "#util/password.utils.js";
import UserData from "#util/user.util.js";
import JWT from "#util/jwt.utils.js";

export class UserServices {
  #userRepository;
constructor({userRepository}) {
    this.#userRepository = userRepository;
  }

  #FormValidate(payload) {
    const { error } = UserJoiSchema.validate(payload);
    if (error) {
      console.log(error.details[0].message)
      return {success:false,message:(error.details[0].message)};
    }
  }

  async register(payload) {
    try {
      this.#FormValidate(payload);
      const existingUser = await this.#userRepository.getUserByEmail(
        payload.email
      );

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
    this.#FormValidate(payload);
    try {
      const user = await this.#userRepository.getUserByEmail(payload.email);

      if (!user) {
        return { success: false, message: "User already exists" };
      }

      if (user.isBlocked) {
        return { success: false, message: "User blocked by admin" };
      }

      const hashedPassword = PasswordHash.verify(
        user.password,
        payload.password
      );

      if (!hashedPassword) {
        return { success: false, message: "Incorrect password!" };
      }

      const tokenPayload = UserData.extractTokenPayload(user);

      const token = JWT.generateToken(tokenPayload);

      return { success: true, message: "User created successfully", token };
    } catch (error) {
      console.error(error.message);
      console.log(error);

      return { success: false, message: `Error during login,Please try again` };
    } 
  }

  async logout(res) {
    try {
      res.clearCookie("userToken");
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
