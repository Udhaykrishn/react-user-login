import UserRepositorys from "#repository/user.repositorys.js";
import { UserJoiSchema } from "#schema/user.schema.js";
import PasswordHash from "#util/password.utils.js";
import UserData from "#util/user.util.js";
import JWT from "#util/jwt.utils.js"

class UserServices {
  constructor() {
    this.userRepository = UserRepositorys;
  }

  FormValidate(payload) {
    const { error } = UserJoiSchema.validate(payload);
    if (error) {
      throw new Error(error.details[0].message);
    }
  }

  async register(payload) {
    try {
      this.FormValidate(payload);
      const existingUser = await this.userRepository.GetUserByEmail(
        payload.email
      );

      if (existingUser) {
        return { success: false, message: "User already exists" };
      }

      const hashedPassword = PasswordHash.hash(payload.password);
      payload.password = hashedPassword;
      const newUser = await this.userRepository.CreateUser(payload);
      return {
        success: true,
        message: "User registered successfully",
        user: newUser,
      };
    } catch (error) {
      console.error(error.message);
      return {
        success: false,
        message: `Error during registration: ${error.message}`,
      };
    }
  }

  async login(payload) {
    this.FormValidate(payload);
    try {
      const user = await this.userRepository.GetUserByEmail(payload.email);

      if (!user) {
        return { success: false, message: "Email is not found" };
      }

      if (user.isBlocked) {
        return { success: false, messagse: "User blocked by admin" };
      }

      const hashedPassword = PasswordHash.verify(
        user.password,
        payload.password
      );

      if (!hashedPassword) {
        return { success: false, message: "Incorrect password!" };
      }

      const tokenPayload = UserData.extractTokenPayload(user);

      const token = JWT.generateToken (tokenPayload);

      return { success: true, message: "User created successfully", token };
    } catch (error) {
      console.error(error.message);
      console.log(error);

      return { success: false, message: `Error during login ${error.message}` };
    }
  }
}

export default new UserServices();
