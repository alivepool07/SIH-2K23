import { listen } from './app.js';
import connectDb from './database/database.js';
import linkMailAcc from './scripts/mailer.js';

process.on('uncaughtException',(err)=>{
  console.log(`uncaught exception: ${err}\nshutting down server`);
  process.exit(1);
});

linkMailAcc();
connectDb();
const server = listen(process.env.PORT);

process.on('unhandledRejection',(err)=>{
  console.log(`unhandled rejection: ${err}\nshutting down server`)
  server.close(()=>process.exit(1));
})