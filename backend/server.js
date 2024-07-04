const express =require("express");
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("./models/userSchema")

const SECRET_KEY="secretkey"



//connect to express
const app=express()

// connect mongodb
const dbUri="mongodb+srv://divyanshu2707:Dk70159@cluster0.qsiul0l.mongodb.net/userDb"
mongoose.connect(dbUri)
.then(()=>{
    console.log("mongodb is running")
}).catch((err)=>{
    console.log("mongo error",err)
})

// middlewares
app.use(cors())
app.use(bodyParser.json())

//Routes

//user registration
app.post("/register", async(req,res)=>{
    try{
        const{email,username,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({email,username,password:hashedPassword})
        await newUser.save()
        res.status(200).json({message:"user created successfully"})
    }catch(err){
        res.status(500).json({message:"error  signing up"})
    }
})

//get registered users
app.get("/register",async(req,res)=>{
    try{
        const users=await User.find()
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({error:"unable to get users"})
    }
})

//login
app.post("/login",async (req,res)=>{
    try{
        const {username,password}=req.body
        const user=await User.findOne({username})
        if(!user){
            return res.status(401).json({error:"invalid credentials"})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({error:"invalid password"})
        }
        const token=jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:"1hr"})
        res.json({message:"login successful"})
    }catch(error){
        res.status(500).json({error:"error logging in"+error})
    }
})

 


app.listen(3001)

