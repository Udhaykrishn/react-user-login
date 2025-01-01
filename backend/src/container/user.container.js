import { UserController } from "#controller/index.js";
import { UserRepository } from "#repository/index.js";
import { UserServices } from "#service/index.js";
import { User } from "#model/user.model.js";

const userRepository = new UserRepository(User);
const userService = new UserServices(userRepository);
const userController = new UserController(userService);

export const UserControllers = {
  register: userController.register.bind(userController),
  login: userController.login.bind(userController),
  logout: userController.logout.bind(userController),
};
