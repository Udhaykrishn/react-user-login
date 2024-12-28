import jwt from "jsonwebtoken";

class JWTService {
  #secret;
  #expire;
  constructor(secret, expire = "1h") {
    this.#secret = secret;
    this.#expire = expire;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.#secret, { expiresIn: this.#expire });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.#secret);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token has expired");
      }
      throw new Error("Invalid or expired token");
    }
  }
}

export default new JWTService(process.env.JWT, "1h");
