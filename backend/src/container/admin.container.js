import Admin from '#model/admin.model.js';
import { AdminRepository } from '#repository/index.js';
import { AdminServices } from '#service/index.js';
import { AdminController } from '#controller/index.js';

const adminRepo  = new AdminRepository(Admin)
const adminService = new AdminServices(adminRepo)
const adminController = new AdminController(adminService)

export const adminControllers = {
    login:adminController.login.bind(adminController)
}