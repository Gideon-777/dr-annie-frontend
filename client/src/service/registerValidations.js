const Validator = require('validator');

const { isEmpty } = require('./generalFunctions');

const validateRegisterInputs = (data) => {
    let errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';

    if (!Validator.isLength(data.firstName, { min: 2, max: 50 })) {
        errors.firstName = 'Le prénom doit comprendre entre 2 et 50 caractères';
    }

    if (!Validator.isLength(data.lastName, { min: 2, max: 50 })) {
        errors.lastName = 'Le nom doit comprendre entre 2 et 50 caractères';
    }

    if (!Validator.isLength(data.phoneNumber, { min: 8, max: 50 })) {
        errors.phoneNumber = 'Le numero de telephone doit comprendre au moins 8 caractères';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email invalide';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Le champ du mot de passe est obligatoire';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 50 })) {
        errors.password = 'Le mot de passe doit être au moins de 6 caractères';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};

export default validateRegisterInputs;
