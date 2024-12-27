import jwt from "jsonwebtoken";

class JWTService {
  constructor(secrm, exp = "1h") {
    this.secrm = secrm;
    this.exp = exp;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secrm, { expiresIn: this.exp });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secrm);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
}

export default new JWTService(process.env.JWT, "1h");
