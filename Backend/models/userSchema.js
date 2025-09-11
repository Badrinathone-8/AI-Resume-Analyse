import mongoose from "mongoose"


const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        unique:true,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true}
)
const User=mongoose.model("User",UserSchema);
export default User;