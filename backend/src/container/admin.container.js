import Admin from '#model/admin.model.js';
import User from '#model/user.model.js';
import { AdminRepository, UserRepository } from '#repository/index.js';
import { AdminServices } from '#service/index.js';
import { AdminController } from '#controller/index.js';
import { createContainer, asClass, asValue } from 'awilix';

const container = createContainer({strict:true,injectionMode:"PROXY"});

container.register({
	//Models
	adminModel: asValue(Admin),
	userModel: asValue(User),

	//Reposittory
	adminRepository: asClass(AdminRepository).singleton(),
	userRepository: asClass(UserRepository).singleton(),

	//Services
	adminServices: asClass(AdminServices).singleton(),

	//Controllers
	adminController: asClass(AdminController).singleton()
});

const adminController = container.resolve('adminController');

export const adminControllers = {
	login: adminController.login.bind(adminController),
	create: adminController.create.bind(adminController),
	update: adminController.update.bind(adminController),
	delete: adminController.delete.bind(adminController),
	users: adminController.users.bind(adminController)
};
