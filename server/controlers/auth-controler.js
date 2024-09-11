import usermodel from "../Model/user-model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export const signup=async (req,res)=>{
const{username,email,password}=req.body;

const alreadyusername=await usermodel.findOne({username})
const alreadyemail=await usermodel.findOne({email})

if(alreadyemail||alreadyemail)
{
    return res.json({register:false});
}





bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, async(err, hash)=> {
   try{
    const newuser=await usermodel.create({
        username,
        email,
        password:hash,
    })

    var token = jwt.sign({id:newuser._id},process.env.USER_KEY);
    res.cookie("token",token,{httpOnly:true});
    const user=await usermodel.findOne({email}).select("-password")

    res.json({register:true,newuser:user});
   }
   catch(err)
   {
    res.json({err})
   }
    });
});

}


// Adjust the import path according to your project structure

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user_on_username = await usermodel.findOne({ email })
        
        if (!user_on_username) {
            return res.json({ signin: false, message: "Email is incorrect" });
        }

        const isPasswordValid = await bcrypt.compare(password, user_on_username.password);
        if (isPasswordValid) {
            const token = jwt.sign({ id:user_on_username._id }, process.env.USER_KEY);
            res.cookie("token", token,{httpOnly:true});
            const user=await  usermodel.findOne({email}).select("-password")
            return res.json({ signin: true ,newuser:user});
        } else {
            return res.json({ signin: false, message: "Password is incorrect" });
        }
    } catch (err) {
        return res.json({ error: err.message });
    }
};





export const updateprofile = async (req, res) => {
    try {
      const { username, email, password, userid } = req.body;
 
  
      const existingUser = await usermodel.findOne({ _id: userid });
      if (!existingUser) {
        return res.json({update:false, error: 'Original email not found' });
      }
  
      const alreadyusername = await usermodel.findOne({ username });
      const alreadyemail = await usermodel.findOne({ email });
  
      if (alreadyusername || alreadyemail) {
        return res.json({ update: false, message: 'Username or email already in use' });
      }
  
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return res.json({ error: 'Error generating salt' });
        }
  
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            return res.json({ error: 'Error hashing password' });
          }
  
          // Update using the found user's ID
          const updateuser = await usermodel.findByIdAndUpdate(
            existingUser._id,
            {
              username,
              email,
              password: hash,
            },
            { new: true }
          );
  
          if (updateuser) {
            var token = jwt.sign({ id: updateuser._id }, process.env.USER_KEY);
            res.cookie("token", token, { httpOnly: true });
  
            const user = await usermodel.findById(updateuser._id).select("-password");
            return res.json({ update: true, newuser: user });
          } else {
            return res.json({ error: 'User not found after update attempt' });
          }
        });
      });
    } catch (err) {
      console.log(err);
      return res.json({ error: 'Server error' });
    }
  };
  



export const googl=async (req,res)=>{
    const{name,email,photo}=req.body;
    const user=await usermodel.findOne({email}).select("-password")
    if(user)
    {
        const token = jwt.sign({ id:user._id }, process.env.USER_KEY);
        res.cookie("token", token,{httpOnly:true}).json({login:true,newuser:user});
    }
    else{
      // Generate a random password with 16 characters
const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

// Generate a username based on the user's name and a random string
const username = name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);


        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async(err, hash)=> {
           try{
            const newuser=await usermodel.create({
                username,
                email,
                password:hash,
                photo,
            })
        
            var token = jwt.sign({id:newuser._id},process.env.USER_KEY);
            res.cookie("token",token,{httpOnly:true});
            const user=await usermodel.findOne({email}).select("-password")
        
            res.json({register:true,newuser:user});
           }
           catch(err)
           {
            res.json({err})
           }
            });
        });

    }
    

    
    
    
    }
    


    export const deleteaccount = async (req, res) => {
        try {
          const { userid } = req.body;
     
      
          // Find and delete the user
          const deletedUser = await usermodel.findOneAndDelete({ _id: userid });
      
          if (deletedUser) {
            res.cookie("token","")
            res.json({ delete: true });
          } else {
            res.json({ delete: false });
          }
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: 'An error occurred while deleting the account.' });
        }
      };
      


      
      export const updatepic = async (req, res) => {
        try {
          const { userid, downloadURL } = req.body;
          
      
          const updateuserpic = await usermodel.findByIdAndUpdate(
            userid,
            { photo: downloadURL },
            { new: true } // This option returns the updated document
          );
      
          if (updateuserpic) {
            const{password,...rest}=updateuserpic._doc
       
            return res.json({ picupdate: true, updateuser: rest });
          } else {
            return res.json({ picupdate: false });
          }
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      


     export const checklogin=async(req,res)=>{
      try
      {

        const  user=await usermodel.findOne({_id:req.id}).select("-password")
        res.json({userlogin:true,curuser:user})
      }
      catch(err){

      }
         
  

      }
      export const getuser=async(req,res)=>{
        try
        {
  
          const  user=await usermodel.findOne({_id:req.params.id}).select("-password")
          res.json({listingowner:true,listingowner:user})
        }
        catch(err){
                  
        }
           
    
  
        }
      