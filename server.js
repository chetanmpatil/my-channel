//Server-side file. Coded from scratch by Sumant Bagade
var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var morgan_logger = require('morgan');
var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');


var passHash=require('password-hash');
var User=require('./public/modles/usermodel');
var config=require('./public/config/config');
var path=require('path');
var loggedinusername='';
//var authroute=require('./public/js/authentication');

var app = express();


var port = process.env.PORT ||  7000;

var myRouter = express.Router();
//Creating a route
/*myRouter.route('/').get(function(req,res){

	res.render('showlist');

});

//Useful for creating 2degree routes
//Using a route
app.use('/showlist', myRouter ); */

//Middlewares
mongoose.Promise = global.Promise;
mongoose.connect(config.db);

//app.use(express.static('public'));

app.use(express.static('src/views'));
app.set('views', './src/views');				//for templating engine
app.set('view engine', 'ejs');
app.set('supersecret',config.secretkey);
app.use(morgan_logger('dev'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(cookieparser());
app.use(express.static(path.join(__dirname,'public')));

//middle ware for the request comming from other server
app.use(function(req,res,next)
{
	      res.setHeader('Access-Control-Allow-Origin','*');
		  res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,PUT,PATCH');
		  next();
});
app.post('/home/login',function(req,res)
{
	      console.log("back to login, email=",req.body.email,"password= ",req.body.password);
		  
          User.findOne({email:req.body.email},function(error,result)
		   {
			            if(error)
						{
							return res.status(400)
							          .json({
								    error:error,
									message:'Problem extracting info....'
							   });
						}
						if(!result)
						{
                           return res.status(400)
							         .json({
								    error:error,
									message:'User is not registered'
							   });
						}
						if(!passHash.verify(req.body.password,result.password))
						{
							return res.status(400)
							          .json({
								    error:error,
									message:'Wrong Password'
							   });
						}
				    result.isloggedin=true;
					result.save();
							
			        var token= jsonwebtoken.sign({user:result},app.get('supersecret'),{expiresIn:7200});			
					res.status(200)
					   .json({obj:token,
						      username:result.username})
					  // .render('index');
		   });
		   //res.render('index');
});
app.post('/home/signup',function(req,res){
	         
           var user=new User({
                 username: req.body.username,
                 surname:  req.body.surname,
                 email:    req.body.email,
                 password: passHash.generate(req.body.password)
                });
				console.log("signup ",user);
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
                        res.status(200)
			               .json({obj:result});	
                    });
				
});
app.get('/', function (req,res) {
	res.render('index');
});

app.get('/about', function (req,res) {
	res.render('about');
});

app.get('/home', function (req,res) {
	res.render('index');
});


app.get('/contact', function (req,res) {
	res.render('contact');
});		 

/*****************************************************************************PROTECTED ROUTES***************************************************************/
app.use('/',function(req,res,next)
   {
   	   console.log("Inside verification.............");
       jsonwebtoken.verify(req.query.token,app.get('supersecret'),function(error,decoded)
   	  {
   		  if(error)
            {
                return res.status(400).json({
                       error:error,
                       message:"You are Not Logged In,first LogIn"
                     });
            }
			console.log("Inside Verified.............");
            next();
   	  });
   });

/************************************************************************************************************************************/

app.get('/newreleases', function (req,res) {
	 res.render('uc');

});


app.get('/showlist',   function (req,res) {
	res.render('showlist');
});

app.get('/episodelist', function (req,res) {
	res.render('episodelist');
});


app.get('/upcoming', function (req,res) {
	res.render('uc');
});

app.get('/current', function (req,res) {
	res.render('uc');
});









app.listen(port,function (err) {
	if(err)
	{
		console.log(err);
	}
	
	console.log('Running on ' + port);
});

module.exports=app;













