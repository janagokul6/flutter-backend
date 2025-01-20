const Product = require("../models/product");
const Cart = require("../models/cart");

exports.addProduct = async(req, res) => {
    try{
        const {name, description, price} = req.body;
        const image = req.file;
        await Product.create({
            name,
            description,
            image: `${image.destination}/${image.filename}`,
            price: price,
        })
        res.send({status: true, message: "Product added successfully"});
    }catch(e){
        res.send({status: false, message: typeof(e) == "object" ? e.message : e});
    }
}

exports.getProducts = async(req, res) => {
    try{
        let products = await Product.find();
        products = products.map(e => {
            return {...e._doc, image: `${req.protocol}://${req.get('host')}/${e.image}`}
        })
        let pro = [];
        for (let index = 0; index < products.length; index++) {
            const singlePro = await Cart.findOne({productId: products[index]._id, ordered: false})
            pro.push({...products[index], addedToCart: singlePro ? true : false});
        }
        res.send({status: true, message: "Data fetched successfully", data: pro});
    }catch(e){
        res.send({status: false, message: typeof(e) == "object" ? e.message : e});
    }
}


exports.addProductToCart = async(req, res) => {
    try{
        const userId = req.user._id;
        const {productId, remove} = req.body;
        if(remove == true){
            await Cart.deleteOne({ordered: false, productId});
        }else{
            await Cart.create({
                userId,
                productId,
            })
        }
        res.send({status: true, message: "added to cart successfully"});
    }catch(e){
        res.send({status: false, message: typeof(e) == "object" ? e.message : e});
    }
}


exports.getCartProducts = async(req, res) => {
    try{
        const userId = req.user._id;
        let cartList = await Cart.find({userId, ordered: false}).populate('productId');
        cartList = cartList.map(e => {
            return {...e._doc,productId: {...e.productId._doc, image: `${req.protocol}://${req.get('host')}/${e.productId.image}`}}
        })
        res.send({status: true, message: "Data fetched successfully", data: cartList});
    }catch(e){
        res.send({status: false, message: typeof(e) == "object" ? e.message : e});
    }
}


exports.orderItem = async(req, res) => {
    try{
        const {cartIds} = req.body;
        for (let index = 0; index < cartIds.length; index++) {
            const element = cartIds[index];
            const item = await Cart.findById(element);
            item.ordered = true;
            await item.save();
        }
        res.send({status: true, message: "Ordered successfully"});
    }catch(e){
        res.send({status: false, message: typeof(e) == "object" ? e.message : e});
    }
}
