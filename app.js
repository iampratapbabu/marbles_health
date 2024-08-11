//PACKAGES
const express = require("express");
const morgan = require('morgan');



//ROUTER FILES
const notesRouter = require("./routes/note.route");



//MIDDLEWARES
const app=express();
app.use(express.json());


//DEV MIDDLEWARES
if(process.env.NODE_ENV="development"){
	app.use(morgan('dev'));
};

//CORS [Cross Origin Resource Sharing]
app.use((req,res,next) =>{
	//res.header("Access-Control-Allow-Credentials","true");
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,x-auth-token, Content-Type, Accept,Authorization,x-access-token");
	res.header("Access-Control-Allow-Methods","GET,OPTIONS,POST,PUT,PATCH,DELETE");
	next();
});


//HOME ROUTE
app.get('/',(req,res)=>{
  res.send("Marbles Health Server STATUS:[UP]");
});


//ROUTING
app.use('/notes',notesRouter);



//NO ROUTE DEFINED HANDLER
app.use('*',(req,res)=>{
	res.status(404).json({
		message:"No Routes Defined at this Path"
	})
})




module.exports = app;