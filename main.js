import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken"


let app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    
    let  token = req.header
    ("Authorization")

    if(token != null){
        token = token.replace("Bearer", "")
    
        jwt.verify(token, "nm1234",
            (err, decode) => {

                if(!err){
                    req.user = decode;
                }
    })

        

    }
    next();

    //console.log(token)
});



//mongo db drive link
let mongoDb = "mongodb+srv://admin:nadun1234@cluster0.htd9j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



//connect mongodb
mongoose.connect(mongoDb)

let Connection = mongoose.connection
Connection.once("open", () => {

    console.log("connection sucessful")

})




app.use("/api/users", userRouter)
app.use("/api/product", productRouter)





//local host connector

app.listen(3000, () => {
    console.log("server is running");
});




