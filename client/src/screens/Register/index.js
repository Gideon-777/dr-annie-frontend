import './register.scss';
import React from 'react';

import axios from "axios";
import validateRegisterInputs from "../../service/registerValidations";
import {Link} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import phoneCodes from './../../assets/data/countryPhoneCodes';

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: {
      code: "+241",
      name: "Gabon"
    },
    errors: {},
    successMessage: false,
    isPasswordShown: false
  };

  onRegisterFormSubmit = async () => {
    const newRegister = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
    };
    const {errors, isValid} = validateRegisterInputs(newRegister);
    console.log(errors);
    if (!isValid) {
      this.setState({errors: {...errors}});
      return;
    }
    this.setState({errors: {}});
    await this.initRegister(newRegister);
    console.log(newRegister);
  };

  initRegister = async () => {
    let response = (await axios.post('/api/auth/register', {...this.state, phoneNumber: {code: this.state.countryCode.code, number: this.state.phoneNumber}})).data;
    console.log({...this.state, phoneNumber: {code: this.state.countryCode, number: this.state.phoneNumber}});
    if (response.statusCode !== 201) {
      this.setState({errors: {message: response.message, ...this.state.errors}});
      return;
    }
    this.setState({successMessage: true})
  };



  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };



  render() {
    const { isPasswordShown } = this.state;
    return <header className="header">
      <div className="text-box">
        <h1 className="login-form__heading">S’inscrire</h1>
        <h3 className="black ">* Vos données personnelles restent confidentielles</h3>
        {this.state.successMessage ? <h2 className="login-form__success-heading">Inscription effectuée avec succès. Veuillez vérifier votre e-mail pour continuer.</h2> : <form className="login-form">
          <input className="form-control d-block mt-2" value={this.state.firstName} onChange={(evt) => this.setState({firstName: evt.target.value})} placeholder="Nom"/>
          <input className="form-control d-block mt-2" value={this.state.lastName} onChange={(evt) => this.setState({lastName: evt.target.value})} placeholder="Prenom"/>
          <input className="form-control d-block mt-2" value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})} placeholder="Email"/>
          <div className="d-flex align-items-center phone-number-holder">
            <Dropdown>
              <Dropdown.Toggle className="booking-drop-butt" id="dropdown-basic">{this.state.countryCode ? this.state.countryCode.code + '  ' + this.state.countryCode.name : ''}</Dropdown.Toggle>
              <Dropdown.Menu className="booking-drop-butt__drop fs-1-4-rem">
                {phoneCodes.countries.map((code, index) => <Dropdown.Item onClick={() => this.setState({countryCode: phoneCodes.countries[index]})}>{code.code + '  ' + code.name}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
            <input className="form-control d-block mt-2" value={this.state.phoneNumber} onChange={(evt) => this.setState({phoneNumber: evt.target.value})} placeholder="Telephone"/>

          </div>
          <div>
          <input type={isPasswordShown ? "text" : "password"} className="form-control d-block mt-2" value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})} placeholder="Mot de Passe"/>
          <i className="fa fa-eye password-icon" 
          onClick={this.togglePasswordVisiblity}
          />
          </div>
          <p className="error-text">{Object.keys(this.state.errors).length > 0 ? Object.values(this.state.errors)[0] : " "}</p>
        </form>}
        <div className="login-btn-holder">
          <a href="#" onClick={this.onRegisterFormSubmit} className="btn btn--white btn--animated">S’ENREGISTRER</a>
          <Link to='/auth/login' className="btn btn--purple ml-4 btn--animated">SE CONNECTER</Link>
        </div>
      </div>
    </header>
  }
}

export default Register;
