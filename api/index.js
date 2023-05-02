const express=require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/posts");
const categoryRoute=require("./routes/categories");
const cors=require("cors");
const path = require("path");
app.use(cors());
const multer=require("multer");
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>console.log("Blog posts")).catch((err)=>{console.log(err)});
//got an error need to solve
const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"images")
        },
        filename:(req,file,cb)=>{
             cb(null,req.body.name)
        },
    });

    const upload=multer({storage:storage});
    app.post("/api/upload",upload.single("file"),(req,res)=>{
        res.status(200).json("file upload");
    })
 app.use("/api/auth",authRoute);
 app.use("/api/users",userRoute);
 app.use("/api/posts",postRoute);
 app.use("/api/categories",categoryRoute);
 app.listen(5000,()=>{
    console.log("backend");
})