import JwtService from "#util/jwt.utils.js";
import PasswordService from "#util/password.utils.js"
import { UserJoiSchema  } from "#schema/index.js";

export class AdminServices{
    #adminRepository;
    #user;
    constructor(AdminRepository,UserRepository){
        this.#adminRepository = AdminRepository
        this.#user = UserRepository
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

    async create(payload){
      try {
        const {error} =  UserJoiSchema.validate()
        if(error){
            return {success:false,message:error.details[0].message}
        }
        const user  = this.#user.getUserByEmail(payload.email);
        if(user){
            return {success:false,message:"User already Exsits"}
        }
         const newUser = await this.#user.create(payload)
        return {success:true,message:"User created successfully",user:newUser}
      } catch (error) {
        console.log(error.message)
        return {success:false,message:"Interval server error"}
      } 
    }

    async update(id,payload){
       try {
        const {error} = UserJoiSchema.validate()
        if(error){
            console.log(error.details[0].message)
            return {success:false,message:error.details[0].message}
        }

        const existsUser = await this.#user.getUserByEmail(payload.email)
        if(existsUser){
            return {success:false,message:"User already exists"}
        }

        const updateUser = await this.#user.updateUserById(id,payload)
        console.log(updateUser)
        return {success:true,message:"User updated successfully",user:updateUser}
       } catch (error) {
        console.log(error.message)
        return {success:false,message:"Interval server error"}   
       }
    }
}