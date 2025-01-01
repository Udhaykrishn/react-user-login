 class AdminRepository {
  #admin
  constructor(Admin) {
    this.#admin = Admin;
  }
  findByEmail(email) {
    return this.#admin.findOne({ email });
  }
}

export {AdminRepository}