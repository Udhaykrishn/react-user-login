export class AdminController{
    #adminService;
    constructor(AdminServices){
        this.#adminService =  AdminServices;
    }

    async login(req,res){
        try {
            const user = await this.#adminService.login(req.body)

            if(user.sccess){
                return res.status(200).json(user)
            }else{
                return res.status(400).json(user)
            }

        } catch (error) {
            console.error(error.message)
            console.log(error)
            return res.status(500).json({message:"Interval server error"})
        }
    }
    async create(req,res){
        try {
            const user = await this.#adminService.create(req.body)

            if(user.success){
                return res.status(201).json(user)
            }else{
                return res.status(400).json(user)
            }
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message:"Internal server error"})
        }
    }
    async update(req,res){
       try {
        const {id} = req.params;
        const updateUser  = await this.#adminService.update(id,req.body)
        if(updateUser.success){
            return res.status(201).json(updateUser)
        }else{
            return res.status(400).json(updateUser)
        }
       } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:"Internal server error"})
       }
    }
    async delete(req,res){
        try {
            const {id} = req.params;
            const deleteUser = await this.#adminService.delete(id)
            if(deleteUser){
                return res.status(200).json(deleteUser)
            }else{
                return res.status(400).json(deleteUser)
            }
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message:"Internal server error"})
        }
    }
}

