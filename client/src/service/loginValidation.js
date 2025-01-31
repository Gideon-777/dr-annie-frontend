const Validator = require('validator');

const { isEmpty } = require('./generalFunctions');

const validateLoginInputs = (data) => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'L\'Email est invalide';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Veuillez saisir votre Email';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Veuillez saisir votre mot de passe';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

};

export default validateLoginInputs;