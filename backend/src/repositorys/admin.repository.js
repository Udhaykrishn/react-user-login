 class AdminRepository {
  #admin
  constructor({adminModel}) {
    this.#admin = adminModel;
  }
  findByEmail(email) {
    return this.#admin.findOne({ email });
  }
}

export {AdminRepository}