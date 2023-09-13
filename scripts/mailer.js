import nodemailer from 'nodemailer';
import { Err } from '../middlewares/errorHandler.js';

let transporter;

const linkMailAcc = ()=>{
  transporter = nodemailer.createTransport({
    service:process.env.MAIL_SERVICE,
    auth:{
      user:process.env.MAIL_USER,
      pass:process.env.MAIL_PASS
    }
  })
  console.log('created email transporter');
}

export const sendMail = async(next,subject,params)=>{
  const from = `${process.env.PLATFORM_NAME} <${process.env.MAIL_USER}`;
  if(subject==='case request'){
    const {user,lawyer,request} = params;
    const {city,clientDescription,reference} = request;
    await transporter.sendMail({
      from,
      to:lawyer.email,
      subject:'New case awaits you',
      html:requestTemplateLawyer(user.name,user.email,city,clientDescription,reference)
    });
    await transporter.sendMail({
      from,
      to:user.email,
      subject:'Case request submitted to lawyer',
      html:requestTemplateClient(lawyer.name,city,clientDescription,reference)
    });
  }
  else if(subject==='case initiated'){
    const {clientMail,lawyerMail,cas} = params;
    await transporter.sendMail({
      from,
      to:clientMail,
      subject:'Your lawyer has initiated your case',
      html:initiatedTemplateClient(cas)
    });
    await transporter.sendMail({
      from,
      to:lawyerMail,
      subject:'Case initiated',
      html:initiatedTemplateLawyer(cas)
    });
  }
  else
    return next(new Err('ies'));
}

const requestTemplateLawyer =  (name,email,city,description,reference)=>{
  return `<h3>Client Details</h3>
  <p>Name: ${name}<br>
  email: ${email}</p>
  <h3>Case Details</h3>
  <p>City: ${city}<br>
  Client's Description: ${description}</p>
  <h3>Credentials</h3>
  <p>Reference Number: ${reference}</p>`;
}

const requestTemplateClient =  (name,city,description,reference)=>{
  return `<h3>Lawyer Details</h3>
  <p>Name: ${name}</p>
  <h3>Case Details</h3>
  <p>City: ${city}<br>
  Description: ${description}</p>
  <h3>Credentials</h3>
  <p>Reference Number: ${reference}</p>`;
}

const initiatedTemplateLawyer = (cas)=>{
  const {reference,city,clientDescription,lawyerDescription} = cas;
  return `<h3>Case Details</h3>
  <p>Reference Number: ${reference}<br>
  City: ${city}<br>
  Client's Description: ${clientDescription}<br>
  Lawyer's Description: ${lawyerDescription}</p>`;
}


const initiatedTemplateClient = (cas)=>{
  const {reference,city,clientDescription,lawyerDescription,otp} = cas;
  return `<h3>Case Details</h3>
  <p>Reference Number: ${reference}<br>
  City: ${city}<br>
  Client's Description: ${clientDescription}<br>
  Lawyer's Description: ${lawyerDescription}<br>
  OTP: ${otp}</p>`;
}

export default linkMailAcc;