import { UserController } from "#controller/user.controller.js";
import { UserRepository } from "#repository/user.repositorys.js";
import { UserServices } from "#service/user.services.js";
import { User } from "#model/user.model.js";

const userRepository = new UserRepository(User);
const userService = new UserServices(userRepository);
const userController = new UserController(userService);

export const UserControllers = {
  register: userController.register.bind(userController),
  login: userController.login.bind(userController),
  logout: userController.logout.bind(userController),
};
