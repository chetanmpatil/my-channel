
var express=require('express');
var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');
var passHash=require('password-hash');

var User=require('../modles/usermodel');

var router=express.Router();

router.post('/signup',function(req,res)
{
        var user=new User({
            username: req.body.username,
            surname:  req.body.surname,
            email:    req.body.email,
            password: passHash.generate(req.body.password)
           });
           user.save(function(error,result)
           {
               if(error)
               {
                   return res.status(400)
                             .json({
                                 error:error,
                                 message:'Can Not create Account'
                             });
               }
               res
                   .render('index');
           })

})

module.exports=router;