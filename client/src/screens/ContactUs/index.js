import './contactUs.scss';
import React from 'react';
import axios from "axios";
import validateRegisterInputs from "../../service/registerValidations";
import contactValidation from "../../service/contactValidations";

class ContactUs extends React.Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    subject: "",
    description: "",
    errors: {},
    successMessage: false
  };

  onRegisterFormSubmit = async () => {
    const {errors, isValid} = contactValidation({...this.state});
    console.log(errors);
    if (!isValid) {
      this.setState({errors: {...errors}});
      return;
    }
    this.setState({errors: {}});
    await this.initContactUs();
    console.log();
  };

  initContactUs = async () => {
    let response = (await axios.post('/api/contact-us', {
      ...this.state
    })).data;
    console.log({...this.state});
    if (response.statusCode !== 200) {
      this.setState({errors: {message: response.message, ...this.state.errors}});
      return;
    }
    this.setState({successMessage: true})
  };

  render() {
    return <header className="header">
      <div className="text-box">
        <h1 className="login-form__heading">Contactez Nous</h1>
        {this.state.successMessage ?
          <h2 className="login-form__success-heading">Formulaire soumis avec succès</h2> : <form className="login-form">
            <input className="form-control d-block mt-2" value={this.state.firstName}
                   onChange={(evt) => this.setState({firstName: evt.target.value})} placeholder="Nom"/>
            <input className="form-control d-block mt-2" value={this.state.lastName}
                   onChange={(evt) => this.setState({lastName: evt.target.value})} placeholder="Prenom"/>
            <input className="form-control d-block mt-2" value={this.state.email}
                   onChange={(evt) => this.setState({email: evt.target.value})} placeholder="Email"/>
            <input className="form-control d-block mt-2" value={this.state.subject}
                   onChange={(evt) => this.setState({subject: evt.target.value})} placeholder="Objet"/>
            <textarea rows="4" className="form-control d-block mt-2" value={this.state.description}
                      onChange={(evt) => this.setState({description: evt.target.value})} placeholder="Ecrivez votre message"/>
            <p
              className="error-text">{Object.keys(this.state.errors).length > 0 ? Object.values(this.state.errors)[0] : " "}</p>
          </form>}
        <a href="#" onClick={this.onRegisterFormSubmit} className="btn btn--white btn--animated">Envoyer</a>
      </div>
    </header>
  }
}

export default ContactUs;
