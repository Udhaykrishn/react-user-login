import JwtService from "#util/jwt.utils.js";

class AdminVerifyService{
    async adminAuth(req,res,next){
        const token = req.cookies?.adminToken
        
        if(!token){
            return res.status(401).json({message:"Token missing,Please login later"})
        }

        try {
            const payload = JwtService.verifyToken(token)
            
            if(payload.role !== "admin"){
                return res.status(403).json({
                    success:false,message:"Access denied, User does not have admin access"
                })
            }

            req.user = payload

            return next()

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({success:false,message:"Internal server error"})
        }
    }
}

export default new AdminVerifyService()