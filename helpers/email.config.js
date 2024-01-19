require('dotenv').config();


const config = {
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: 'fidd.michael@gmail.com',
      pass: process.env.nodemailerPass,
    },
    tls: {
      rejectUnauthorized: false, // You may need to set this to false for some servers
    },
  };
  
  module.exports = {config}