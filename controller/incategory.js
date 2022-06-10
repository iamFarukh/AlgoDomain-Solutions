const route = require("express").Router();

const { response } = require("express");
const { default: mongoose } = require("mongoose");
const category = require("../model/category");
//model
const incategory = require('./../model/incategory');

route.get('/category', (req, res, next) => {
    
});

route.post('/incategory', (req,res, next)=>{
    let findcategory = category.findOne({_id : req.body.category_id}).then((result) => {
        const data = incategory({
            _id : new mongoose.Types.ObjectId,
            category_name : req.body.category_name
        })
        data.save().then((finalresult) => {
            result.category_id.push(finalresult._id)
            result.save().then((lestresult) => {
                res.json({
                    data : finalresult
                })
            }).catch((err) => {
                res.json({
                    data : err
                })
            });
           
        }).catch((err) => {
            console.log(err);
        });
        
    }).catch((err) => {
        res.json({
            error : err
        })
    });
})

route.put('/incategory',(req, res, next) => {
    incategory.updateOne({_id : req.body.id},
        req.body , {upsert: true}
    ).then((incategory) =>{
        res.json({
            status_code : 201,
            response : incategory
        })
    })
})



route.delete('/incategory/:id', (req,res, next)=>{
    category.updateOne({cd : req.params.id},{
        $pullAll: {
            category_id: [req.params.id],
        },
    }).then((result) => {
        incategory.deleteOne({_id : req.params.id}).then((incategory)=> {
            res.json({
                status_code : 201,
                response : incategory
            })
        })
    }).catch((err) => {
        console.log(err);
    });
})






module.exports = route;