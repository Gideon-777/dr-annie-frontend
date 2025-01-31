const genericResponse = require('./genericResponse');
const {addContactFormDetails} = require("../service/contactFormService");
const router = require('express').Router();

router.post('/', async (req, res) => {
  return res.json(genericResponse.ok({message: await addContactFormDetails(req.body) ? "Formulaire soumis." : "La soumission du formulaire a échoué"}));
});

module.exports = router;
