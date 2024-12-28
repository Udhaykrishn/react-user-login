import { User } from "#model/user.model.js";

class UserRepository {
  #user;
  constructor(User) {
    this.#user = User;
  }

  async create(payload) {
    return await this.#user.create(payload);
  }

  async getAllUser() {
    return await this.#user.find({});
  }

  async getUserById(id) {
    return await this.#user.findById(id);
  }

  async getUserByEmail(email) {
    return await this.#user.findOne({ email });
  }

  async updateUserById(id, payload) {
    const options = { new: true, upsert: false };
    return await this.#user.findByIdAndUpdate(id, payload, options);
  }

  async deleteUserById(id) {
    return await this.#user.findByIdAndDelete(id);
  }
}

export default new UserRepository(User);
