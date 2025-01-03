import { UserController } from "#controller/index.js";
import { UserRepository } from "#repository/index.js";
import { UserServices } from "#service/index.js";
import User from "#model/user.model.js";
import {createContainer,asValue,asClass} from "awilix"

const container = createContainer({strict:true,injectionMode:"PROXY"})

container.register({
  //Models
  userModel:asValue(User),

  //Repository
  userRepository:asClass(UserRepository).singleton(),

  //Service
  userService:asClass(UserServices).singleton(),

  //userController
  userController:asClass(UserController).singleton()
})

const userController = container.resolve("userController")

export const UserControllers = {
  register: userController.register.bind(userController),
  login: userController.login.bind(userController),
  logout: userController.logout.bind(userController),
  update:userController.update.bind(userController),
  profile:userController.profile.bind(userController)
};
