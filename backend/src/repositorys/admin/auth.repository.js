export class AdminRepository {
  #admin
  constructor(Admin) {
    this.#admin = Admin;
  }

  create(payload) {
    return this.#admin.create(payload);
  }

  findByEmail(email) {
    return this.#admin.findOne({ email });
  }
  
}

