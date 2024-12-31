import Admin from '#model/admin.model.js';
import { AdminRepository } from '#repository/admin.repository.js';
import { AdminServices } from '#service/admin.service.js';
import { AdminController } from '#controller/admin.controller.js';

const adminRepo  = new AdminRepository(Admin)
const adminService = new AdminServices(adminRepo)
const adminController = new AdminController(adminService)

export const adminControllers = {
    login:adminController.login.bind(adminController)
}