import Product from "../models/product.js";

export function addProduct(req, res){

    console.log(req.user)

    if(req.user == null){
        res.status(401).json({
            message : "Please login try again"
        })
        return
    }
    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to perfrom this action"
        })
    }

    const data = req.body;
    const newProduct = new Product(data);
    newProduct.save()

    .then(() => {
        res.json({message : "Product add sucessfully"});
    })
    .catch((error) => {
        res.status(500).json({error : "Product addition failed"});
    });

}



