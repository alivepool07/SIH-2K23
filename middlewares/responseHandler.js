import jwt from 'jsonwebtoken';
import { Err } from './errorHandler.js';

const sendRes = (res,next,status,message,token,accType)=>{
//response is send only when res.end or res.json or res.send is called before that changes in status or cookies are stored but not sent
  if(token)
    sendToken(res,next,token,accType);
  return res.status(status)
  .json({success:true,message});
}

export const sendToken = (res,next,token,accType)=>{
  const options = {
    path:'/',
    maxAge:process.env.COOKIE_LIFE,
    httpOnly:true,
    secure:true,
    sameSite:'none'
  }
  if(token==='logout'){
    options.maxAge=0;
    accType='logout';
  }
  else if(!accType||(accType!=='lawyer'&&accType!=='client'))
    return next(new Err('iat'));
  res
  .cookie('token',jwt.sign(String(token),process.env.JWT_KEY),options)
  .cookie('accType',accType,options);
}

export default sendRes;