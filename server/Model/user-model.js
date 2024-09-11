import mongoose from "mongoose";
const UserSchema=mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
     
    },
    photo:{
        type:String,
        default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1723920781~exp=1723921381~hmac=031fbc79b805b01cfa38e56c9c34e8afcdbd4d8c67a346a7c2b63099e21a3426"
     
    },
},{timestamps:true})

const usermodel=mongoose.model("user",UserSchema);

export default usermodel;