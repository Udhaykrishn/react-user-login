 class UserRepository {
  #user;
  constructor({userModel}) {
    this.#user = userModel;
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

export {UserRepository}