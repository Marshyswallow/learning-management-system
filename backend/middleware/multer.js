import multer from "multer";

let storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./public")
  },
  filename: (req, file, cb) => {
    const filename= Date.now() + "_" + file.originalname // unique name
    cb(null,filename)
  }

})

const upload=multer({storage})

export default upload