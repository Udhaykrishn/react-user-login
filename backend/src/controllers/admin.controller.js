 class AdminController{
    #adminServices;
    constructor({adminServices}){
        this.#adminServices =  adminServices;
    }

    async users(req,res){
            try {
                const users = await this.#adminServices.users();
                if(users.success){
                    return res.status(200).json(users)
                }else{
                    return res.status(400).json(users)
                }
            } catch (error) {
                console.log(error.message)
                return {success:false,message:"Internal server error"}
            }
    }

    async login(req,res){
        try {
            const user = await this.#adminServices.login(req.body)

            if(user.success){
                res.cookie("adminToken",user?.token)
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

    async logout(req,res){
        try {
            const result = await this.#adminServices.logout(res);
            if(result.success){
                return res.status(200).json(result)
            }else{
                return res.status(500).json(result)
            }
        } catch (error) {
            console.log(error.message)
            return res.status(500).json(result)
        }
    }

    async create(req,res){
        try {
            const user = await this.#adminServices.create(req.body)

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
        const updateUser  = await this.#adminServices.update(id,req.body)
        console.log(updateUser,"=== updated user")
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
        const {id} = req.params;
        try {
            const deleteUser = await this.#adminServices.delete(id)
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

export {AdminController}