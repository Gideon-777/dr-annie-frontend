import './login.scss';
import React from 'react';
import validateLoginInputs from "../../service/loginValidation";
import axios from "axios";
import {Link} from "react-router-dom";
import isAuthenticated from "../../service/AuthService";
import googleLogo from './../../assets/images/google-logo.png'

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {},
    isPasswordShown: false
  };

  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.push('/');
    }
  }

  onLoginFormSubmit = () => {
    const newLogin = {
      email: this.state.email,
      password: this.state.password
    };
    const {errors, isValid} = validateLoginInputs(newLogin);
    console.log(errors);
    if (!isValid) {
      this.setState({errors: {...errors}});
      return;
    }
    this.setState({errors: {}});
    this.initLogin(newLogin);
    console.log(newLogin);
  };

  initLogin = async () => {
    let response = (await axios.post('/api/auth/login', {...this.state})).data;
    console.log(response);
    if (response.statusCode !== 200) {
      this.setState({errors: {message: response.message, ...this.state.errors}});
      return ;
    }
    console.log(response.data.token);
    window.localStorage.setItem("authToken", response.data.token);
    this.props.history.push('/');
  };


    togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  render() {
    const { isPasswordShown } = this.state;
    return <header className="header">
      <div className="text-box">
        <h1 className="login-form__heading">Se Connecter</h1>
        <form className="login-form">
          <input className="form-control d-block mt-2" value={this.state.email}
                 onChange={(evt) => this.setState({email: evt.target.value})} placeholder="Email"/>
          <div>
          <input type={isPasswordShown ? "text" : "password"} className="form-control d-block mt-2" value={this.state.password}
                 onChange={(evt) => this.setState({password: evt.target.value})} placeholder="Mot de passe"


                 />
          
          <i className="fa fa-eye password-login" 
          onClick={this.togglePasswordVisiblity}
          />
          </div>

          <p
            className="error-text">{Object.keys(this.state.errors).length > 0 ? Object.values(this.state.errors)[0] : " "}</p>
        </form>
              <div className="login-btn-holder">
      <a href="#" onClick={this.onLoginFormSubmit} className="btn btn--white btn--animated">SE CONNECTER</a>
      <Link to='/auth/register' className="btn btn--purple register-button btn--animated">S’ENREGISTRER</Link> <br/>
      </div>
        <a href='/api/auth/google' className="btn btn--white mt-3 google-button btn--animated"><img className="google-logo" src={googleLogo} alt=""/> Se Connecter avec Google</a>
      </div>
    </header>
  }
}

export default Login;




