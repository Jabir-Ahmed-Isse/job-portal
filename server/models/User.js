// A job seeker. _id is the Clerk user ID (a string), not a Mongo ObjectId.
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    _id:{type:String , required:true},
    name:{type:String , required:true},
    email:{type:String , required:true , unique:true},
    resume:{type:String},
    image:{type:String , required:true}
})

const User = mongoose.model('User',userSchema)

export default User;