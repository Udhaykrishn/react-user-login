import JwtService from "#util/jwt.utils.js";
import PasswordService from "#util/password.utils.js"
import { adminJoiSchema } from "#schema/admin.schema.js";

export class AdminServices{
    #adminRepository;
    constructor(AdminRepository){
        this.#adminRepository = AdminRepository
    }


    async login(payload){
        try {
            const {error} = adminJoiSchema.validate();
            if(error){
                return {success:false,message:error.details[0].message}
            }
            const admin = await this.#adminRepository.findByEmail(payload.email)

        if(!admin){
            return {
                success:false,
                message:"Email or password is incorrect"
            }            
        }

        const checkPassword = await PasswordService.verify(admin.password,payload.password)

        if(!checkPassword){
            return {
                success:fakse,
                message:"Email or password is incorrect"
            }
        }

        delete payload.password
        const token =  JwtService.generateToken(payload)

        return {success:true,message:"Admin login successfully",token}

        } catch (error) {
            console.error(error.message)
            console.log(error)
            return {
                success:false,
                message:"Internal server error"
            }
        }
    }
}