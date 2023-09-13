import { sendToken } from './responseHandler.js';

const errList = {
  //authentication
  lf:{status:404,message:'login first'},
  iat:{status:400,message:'invalid account type'},
  ip:{status:401,message:'incorrect password'},
  io:{status:401,message:'incorrect otp'},
  //authorization
  oc:{status:401,message:'only clients can use this feature'},
  ol:{status:401,message:'only lawyers can use this feature'},
  //restriction
  tc:{status:409,message:'client account terminated'},
  tl:{status:409,message:'lawyer account terminated'},
  //not found
  unf:{status:404,message:'user not found'},
  cnf:{status:404,message:'case not found'},
  lnf:{status:404,message:'lawyer not found'},
  rnf:{status:404,message:'request not found'},
  //verification
  cna:{status:400,message:'this option is only available active not disputed cases'},
  caa:{status:400,message:'your case is already active'},
  tle:{status:1,message:`in error handler`},
  //server and code errors
  onc:{status:500,message:'object not created due to some internal error'},
  ies:{status:400,message:'blank or invalid email subject was provided'},
}

export class Err extends Error{
  constructor(response,shouldLogout){
    const {message,status} = errList[response];
    super(message);
    this.status=status;
    this.shouldLogout=shouldLogout;
  }
}

export const asyncErrHandler = (passedFunc)=>(req,res,next)=>{
  Promise.resolve(passedFunc(req,res,next)).catch(next);
}

const errorHandler = (err,req,res,next)=>{
  console.log(`${err.name}\n${err}`);

  if(err.name==='ValidationError'){
    //mongo db validation error if mandatory fields are missed
    err.status = 400;
    err.message = 'enter all required details and in correct format';
  }
  else if(err.code===11000){
    //mongo db duplicate key error
    err.status = 400;
    err.message = 'user already registered... login';
  }
  else if(err.name==='CastError'){
    //mongo db error if object id is not proper
    err.status = 400;
    err.message = 'invalid request';
  }
  else if(!err.status || err.status===500){
    err.status = 500;
    err.message = 'internal server error... nice';
  }
  else if(err.status===1){
    err.status=400;
    err.message=`cases must be created within ${process.env.TIME_LIMIT} hrs after request`;
  }

  if(err.shouldLogout === true)
    sendToken(res,next,'logout');
  return res.status(err.status)
  .json({success:false,error:err.message});
}

export default errorHandler;