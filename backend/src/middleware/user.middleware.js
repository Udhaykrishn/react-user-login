import JwtService from "#util/jwt.utils.js"

class UserAuthService {
    async userVerify(req, res, next) {
        const token = req.cookies.userToken

        if (!token) {
            return res.status(401).json({message:"Token is missing! Please login"})
        }
        const decoded = JwtService.verifyToken(token)
        req.user = decoded;
        next();
    }
}

export default new UserAuthService();