const express = require('express')
const route = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const category = require('./controller/category')
const incategory = require('./controller/incategory');
const product = require('./controller/product');



mongoose.connect('mongodb://localhost/ecomm').then(() => {
    console.log('mongoose was connected');    
}).catch((err) => {
    console.log(err);
});

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended: false}));


route.get("/",(req,res)=>{
    res.status(200).json({
        msg : "now working route"
    })
})

route.use('/api',category)
route.use('/api',incategory)
route.use('/api', product)

route.use((req,res,next) =>{
    res.status(401).json({
        error : "Route is not defind"
    })
})

route.use("/api", (req, res) => {
    res.json({"users" : ["userOne" , "userTwo" , "userThree","hello"] } )
})

route.listen(5000, () =>{console.log("Server start on port 5000")})