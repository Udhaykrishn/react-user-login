import { User } from "#model/user.model.js";

class UserRepository {
  #user;
  constructor(User) {
    this.#user = User;
  }

  async Create(payload) {
    return await this.#user.create(payload);
  }

  async GetAllUser() {
    return await this.#user.find({});
  }

  async GetUserById(id) {
    return await this.#user.findById(id);
  }

  async GetUserByEmail(email) {
    return await this.#user.findOne({ email });
  }

  async UpdateUserById(id, payload) {
    const options = { new: true, upsert: false };
    return await this.#user.findByIdAndUpdate(id, payload, options);
  }

  async DeleteUserById(id) {
    return await this.#user.findByIdAndDelete(id);
  }
}

export default new UserRepository(User);
