const mongoose = require('mongoose');
const sendMail = require('./emailService');

const ContactForm = mongoose.model('contactForms');

let sendersEmail = '241covid19.info@gmail.com';

const addContactFormDetails = async (formDetails) => {
  let savedForm = await new ContactForm({
    ...formDetails
  }).save();
  sendMail(sendersEmail, "Formulaire Contactez-nous", `Name: ${formDetails.firstName + ' ' + formDetails.lastName}<br/>Email: ${formDetails.email}<br/>Subject: ${formDetails.subject}<br/>Description: ${formDetails.description}`)
  return !!savedForm;
};

module.exports = {
  addContactFormDetails
};


