import argon2 from "argon2";

class PasswordHash {
  async hash(password) {
    try {
      return await argon2.hash(password);
    } catch (error) {
      console.log(error.message);
      throw new Error("Falied to hash password");
    }
  }

  async verify(hashed, password) {
    try {
      return await argon2.verify(hashed, password);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new PasswordHash();
