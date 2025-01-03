import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function registerUser(req, res){

    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10) //password hash

    const newUser = new User(data)


    

    newUser.save().then(() => {
        res.json({message : "user registration sucess"})

    }).catch((error) => {
        res.status(500).json({error : "user registration failed"})
    })

}


//user login part
export function loginUser(req, res) {

    const data = req.body;

    User.findOne({
        email : data.email

    }).then(
        (user) => {
            
            if(user == null) 
            {
                res.status(404).json({error: "User not found"});
            }
            else
            {
                
                //password hash checking part
                const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

                if(isPasswordCorrect)
                {
                    const jwtToken = jwt.sign({

                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email,
                        role : user.role
                    }, "nm1234")

                    res.json({message : "Login successful", jwtToken : jwtToken});
                }
                else
                {
                    res.status(401).json({error : "Login unsccessful"});
                }
            
            }
        }
    )
}