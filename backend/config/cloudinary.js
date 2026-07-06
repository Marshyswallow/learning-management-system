import dotenv from 'dotenv'
dotenv.config()

import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

const uploadOnCloudinary = async (filePath) => {

  console.log("ENV CHECK:", {
    name: process.env.CLOUDINARY_NAME,
    key: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET ? "exists" : "MISSING"
  })

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  try {
    if (!filePath) return null
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',

    })
    fs.unlinkSync(filePath)
    return uploadResult.secure_url
  } catch (error) {
    console.log("Cloudinary error:", error.message)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    return null
  }
}

export default uploadOnCloudinary