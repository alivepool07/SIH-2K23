import { cases, clients, lawyers, requests } from '../database/models.js';
import { Err,asyncErrHandler } from './errorHandler.js';
import jwt from 'jsonwebtoken';

export const checkSession = asyncErrHandler(async(req,res,next)=>{
  const {token,accType} = req.cookies;
  if(!token)
    return next(new Err('lf'));  
  const id = jwt.decode(token,process.env.JWT_KEY);
  switch(accType){
    case 'lawyer':
      req.user = await lawyers.findById(id);
      break;
    case 'client':
      req.user = await clients.findById(id);
      break;
    default:
      return next(new Err('iat',true));
  }
  if(!req.user)
    return next(new Err('unf',true));
  req.accType = accType;
  return next();
})

export const checkLawyer = (req,res,next)=>{
  if(req.accType!=='lawyer')
    return next(new Err('ol'));
  return next();
}

export const checkClient = (req,res,next)=>{
  if(req.accType!=='client')
    return next(new Err('oc'));
  return next();
}

export const checkTerminated = asyncErrHandler(async(req,res,next)=>{
  if(req.accType==='lawyer'){
    if(req.user.strikes>=process.env.STRIKE_LIMIT)
      return next(new Err('tl'));
    const id = (req.ref)? req.ref.client : req.case.client;
    req.client = await clients.findById(id);
    if(!req.client)
      return next(new Err('unf'));
    if(req.client.isTerminated)
      return next(new Err('tc'));
  }
  else{
    if(req.user.isTerminated)
      return next(new Err('tc'));
    req.lawyer = await lawyers.findById(req.query.id);
    if(!req.lawyer)
      return next(new Err('lnf'));
    if(req.lawyer.strikes>=process.env.STRIKE_LIMIT)
      return next(new Err('tl'));
  }
  return next();
})

export const checkReference = asyncErrHandler(async(req,res,next)=>{
  const reference = req.body.reference;
  if(reference && Number(reference.substring(0,13))<=Date.now()-(process.env.TIME_LIMIT*3600000))
    return next(new Err('tle'));
  const filter = {reference,lawyer:req.user._id};
  const ref = await requests.findOne(filter);
  if(!ref)
    return next(new Err('rnf'));
  req.ref = ref;
  return next();
})

export const checkCase = asyncErrHandler(async(req,res,next)=>{
  const filter = {_id:req.query.id};
  if(req.accType==='lawyer')
    filter.lawyer = req.user._id;
  else
    filter.client = req.user._id;
  const cas = await cases.findOne(filter);
  if(!cas)
    return next(new Err('cnf'));
  req.case=cas;
  return next();
})

export const checkCaseNotBegun = (req,res,next)=>{
  if(req.case.isVerified)
    return next(new Err('caa'));
  if(Number(req.case.reference.substring(0,13))<=Date.now()-(process.env.TIME_LIMIT*3600000))
    return next(new Err('tle'));
  return next();
}

export const checkCaseActive = (req,res,next)=>{
  if(!req.case.isVerified || req.case.isClosed || req.case.isDisputed)
    return next(new Err('cna'));
  return next();
}

export const makeOTP = ()=>{
  return Math.floor(100000 + Math.random()*900000)
}