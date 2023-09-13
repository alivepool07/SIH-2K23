import mongoose from 'mongoose';

const dbName = process.env.MONGO_DB_NAME;

const connectDb = ()=>{
  mongoose.connect(process.env.MONGO_DB_URI,{
    dbName,
    useUnifiedTopology:true,
    useNewUrlParser:true,
  })
  .then(console.log(`connected to ${dbName} database`));
}

export default connectDb;