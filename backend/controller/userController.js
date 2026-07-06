import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../model/userModel.js"

export const getCurrentUser = async (req,res)=>{

  try {
    const user= await User.findById(req.userId).select("-password")
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({
      message: `GetCurrentUser error: ${error.message}`
    });
  }
}


export const updateProfile = async(req,res)=>{
  console.log("req.body:", req.body)
  console.log("req.file:", req.file)
  try {
    const userId=req.userId
    const{description , name}=req.body
    const updateData = { name, description }  

    if (req.file) {
      updateData.photoUrl = await uploadOnCloudinary(req.file.path) 
    }
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,  // ✅ this is all you need to change
      { returnDocument: 'after' }
    ).select("-password")
    
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({
      message: `Update profile error: ${error.message}`
    });
  }
}