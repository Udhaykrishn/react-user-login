import Admin from '#model/admin.model.js';
import User from "#model/user.model.js"
import { AdminRepository, UserRepository } from '#repository/index.js';
import { AdminServices } from '#service/index.js';
import { AdminController } from '#controller/index.js';

const adminRepo  = new AdminRepository(Admin)
const userRepo = new UserRepository(User)
const adminService = new AdminServices(adminRepo,userRepo)
const adminController = new AdminController(adminService)

export const adminControllers = {
    login:adminController.login.bind(adminController),
    create:adminController.create.bind(adminController),
    update:adminController.update.bind(adminController),
    delete:adminController.delete.bind(adminController),
    users:adminController.users.bind(adminController)
}