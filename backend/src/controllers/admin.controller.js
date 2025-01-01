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
            return res.status(500).json({message:"Interval server error"})
        }
    }
}

