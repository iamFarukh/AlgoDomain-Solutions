const route = require("express").Router();

const { default: mongoose } = require("mongoose");
const incategory = require("../model/incategory");
//model
const category = require('./../model/category');

route.get('/category', (req, res, next) => {
    category.find().populate({
        path: 'category_id',
        model: 'incategory',
        select: 'category_name',
    }).exec().then((result)=>{
        res.json({
            response : result
        })
    }).catch((err)=>{
        return err
    })
});

route.post('/category', (req,res, next)=>{
    const data = category({
        _id : new mongoose.Types.ObjectId,
        category_name : req.body.category_name
    });
    data.save().then((result) => {
        return res.json({
                    dave_data : result
                })
    }).catch((err) => {
        return res.json({
            error : err
    })
    });
})


route.put('/category',(req, res, next) => {
    category.updateOne({_id : req.body.id},
        {
            category_name :  req.body.category_name
        } , {upsert: true}
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

route.delete('/category/:id', (req,res, next)=>{
    category.findOne({_id : req.params.id}).populate('category_id').then((category)=> {
        category.category_id.forEach(element => {
            incategory.deleteMany({_id : element._id}).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        });
        category.deleteOne({_id : req.params.id}).then((done)=>{
           
            res.json({
                status_code : 201,
                response : done
            })
        })
    })
})







module.exports = route;