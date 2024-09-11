import mongoose from "mongoose";
const Lisitiningschema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    
    },
    location:{
        type:String,
        require:true,
       
    },
    bath:{
        type:Number,
        require:true,
     
    },
    bed:{
        type:Number,
        require:true,
    },
    furnish:{
        type:Boolean,
        require:true,
    },

    parking:{
        type:Number,
        require:true,
    },
    type:{
        type:String,
        require:true,
    },
    offer:{
        type:Boolean,
        require:true,
    },
    imageurls:{
        type:Array,
        require:true,
    },
    userref:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    discount:{
        type:Number,
        default:0,
        
    }

},{timestamps:true})

const lisitingmodel=mongoose.model("lisiting",Lisitiningschema);

export default lisitingmodel;