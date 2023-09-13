import mongoose from 'mongoose';

const lawyerSchema = new mongoose.Schema({
  //functional
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  degree:{type:String,required:[true,'enter degree'],
    unique:true},
  password:{type:String,required:true,select:false},
  specialty:{type:String,required:[true,'enter specialty']},
  tags:{
    'intellectual': {type:Number,default:0},
    'personalInjury': {type:Number,default:0},
    'property': {type:Number,default:0},
    'civil': {type:Number,default:0},
    'criminal': {type:Number,default:0},
    'family': {type:Number,default:0}
  },
  cities:[String],
  experience:Number,
  
  //rest
  history:[{
    prev:String,
    ref:mongoose.Types.ObjectId
  }],
  strikes:{type:Number,default:0},
  joinedOn:{type:Date,default:Date.now()}
})

const clientSchema = new mongoose.Schema({
  //functional
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true,select:false},

  //rest
  history:[mongoose.Types.ObjectId],
  isTerminated:{type:Boolean,default:false}
})

const caseSchema = new mongoose.Schema({
  //functional
  client:mongoose.Types.ObjectId,
  lawyer:mongoose.Types.ObjectId,
  reference:String,
  CreatedOn:{type:Date,default:Date.now()},
  isVerified:{type:Boolean,default:false},
  clientDescription:String,
  city:String,
  subject:String,
  lawyerDescription:String,
  otp:{type:Number,length:6,default:0},

  //rest
  tags:{type:Object,default:{}},
  events:[{
    date:{type:Date,default:Date.now()},
    fileRef:[String],
    comments:String
  }],
  isDisputed:{type:Boolean,default:false},
  isClosed:{type:Boolean,default:false},
})

const requestSchema = new mongoose.Schema({
  client:mongoose.Types.ObjectId,
  lawyer:mongoose.Types.ObjectId,
  reference:String,
  clientDescription:String,
  city:String,
  createdOn:{type:Date,default:Date.now()}
})

export const clients = mongoose.model('clients',clientSchema);
export const lawyers = mongoose.model('lawyers',lawyerSchema);
export const cases = mongoose.model('cases',caseSchema);
export const requests = mongoose.model('requests',requestSchema);