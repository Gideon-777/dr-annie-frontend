import isAuthenticated from "../../service/AuthService";
import React from 'react';
import './QuestionAuthChecker.scss'
import {withRouter} from "react-router";

class QuestionAuthChecker extends React.Component {
  state = {
    textToShow: null,
    loading: true,
    nextStep: null,

  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.loading && prevState.loading && this.state.nextStep) {
      setTimeout(() => this.props.triggerNextStep({
        trigger: this.state.nextStep
      }), 1000)
    }
  }

  componentDidMount() {
    if (isAuthenticated()) {
      this.setState({loading: false, textToShow: "Avant de commencer le diagnostic, nous tenons à préciser que ce chat ne remplace pas l’avis d’un médecin. En cas de doute, veuillez vous rapprocher d’une structure sanitaire.", nextStep: '17'});
      return;
    }
    this.setState({loading: false});
  }

  render() {
    return (
      <div className="message-box-small">
        {
          (() => {
            if (this.state.loading) {
              return 'Chargement...';
            }
            if (this.state.textToShow) {
              return this.state.textToShow
            }
            return (<div>
              <p>Connectez vous afin d'etre diagnostiqué</p>
              <button onClick={() => this.props.history.push('/auth/login')} className="chat-login-button">Se Connecter</button>
            </div>)
          })()
        }
      </div>
    );
  }
}

export default withRouter(QuestionAuthChecker);
