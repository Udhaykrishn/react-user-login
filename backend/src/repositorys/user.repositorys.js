import { User } from "#model/user.model.js";

class UserRepository {

    async CreateUser(payload) {

        return await User.create(payload)
    }

    async GetAllUser() {
        return await User.find({})
    }

    async GetUserById(id) {
        return await User.findById(id);
    }

    async GetUserByEmail(email) {
        return await User.findOne({ email })
    }

    async UpdateUserById(id, payload) {
        d
        return await User.findByIdAndUpdate(id, payload, { new: true, upsert: false })
    }

    async DeleteUserById(id) {
        return await User.findByIdAndDelete(id)
    }
}

export default new UserRepository()