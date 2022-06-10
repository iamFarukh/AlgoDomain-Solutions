const route = require("express").Router();

const { default: mongoose } = require("mongoose");
//model
const incategory = require("../model/incategory");
const product = require("../model/product");
const category = require('./../model/category');

route.get('/porduct', (req, res, next) => {
    product.find().exec().then((result)=>{
        res.json({
            response : result
        })
    }).catch((err)=>{
        return err
    })
});

route.get('/porduct/:id/category', (req, res, next) => {
    product.find({category_id : req.params.id}).exec().then((result)=>{
        res.json({
            response : result
        })
    }).catch((err)=>{
        return err
    })
});

route.post('/product', (req, res, next) => {
    const data = product({
        _id : new mongoose.Types.ObjectId,
        product_name : req.body.product_name,
        category_id : req.body.category_id,
        price : req.body.price,
        image : req.body.image,
        isAvailable : req.body.isAvailable
    })
    data.save().then((result) => {
        res.json({
                    dave_data : result
                })
    }).catch((err) => {
       res.json({
            error : err
    })
    });
})


route.put('/product',(req, res, next) => {
    product.updateOne({_id : req.body.id},
        req.body , {upsert: true}
    ).then((incategory) =>{
        res.json({
            status_code : 201,
            response : incategory
        })
    }).catch((err)=>{
        res.json({
            error : err
        })
    })
})

route.delete('/product/:id', (req,res, next)=>{
    product.deleteOne({_id : req.params.id}).then((category)=> {
        res.json({
            status_code : 201,
            response : done
        })
    }).catch((err)=>{
        res.json({
            status_code : 401,
            error : err
        })
    })
})







module.exports = route;