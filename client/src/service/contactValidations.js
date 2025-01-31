const Validator = require('validator');

const { isEmpty } = require('./generalFunctions');

const contactValidation = (data) => {
    let errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.subject = !isEmpty(data.subject) ? data.subject : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if (!Validator.isLength(data.firstName, { min: 2, max: 50 })) {
        errors.firstName = 'Le prénom doit comprendre entre 2 et 50 caractères';
    }

    if (!Validator.isLength(data.lastName, { min: 2, max: 50 })) {
        errors.lastName = 'Le nom doit comprendre entre 2 et 50 caractères';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'L\'Email est invalide';
    }

    if (Validator.isEmpty(data.subject)) {
        errors.subject = 'Veuillez saisir l\'objet de votre message';
    }

    if (!Validator.isLength(data.subject, { min: 2 })) {
        errors.subject = 'L\'objet doit contenir au moins 2 caractères';
    }

    if (Validator.isEmpty(data.subject)) {
        errors.description = 'Veuillez saisir votre message';
    }

    if (!Validator.isLength(data.description, { min: 6 })) {
        errors.description = 'Le message doit contenir au moins 6 caractères';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};

export default contactValidation;
