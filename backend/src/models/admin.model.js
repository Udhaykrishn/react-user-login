import mongoose from "mongoose";
import PasswordService from "#util/password.utils.js"

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        role: {
            type: String,
            enum: ["admin"],
            default: "admin",
        },
    },
    {
        timestamps: true,
    }
);

adminSchema.pre("save",async function(next){
    if(!this.isModified()){
        return next();
    }
    this.password = await PasswordService.hash(this.password)
    next();
})

const Admin = mongoose.model("Admin", adminSchema);
export default Admin 