import React from 'react';
import './hi.css';
import isAuthenticated, {getName} from "../../service/AuthService";

class Hi extends React.Component {
  state = {
    isAuth: false
  };

  componentDidMount() {
    this.setState({isAuth: true});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.isAuth && this.state.isAuth) {
      setTimeout(() => this.props.triggerNextStep({value: getName(), trigger: isAuthenticated() ? 'loggedInGreeting' : '1'}), 1000)
    }
  }

  render() {
    return (
      <div className="message-box">Bienvenue, Je suis Dr.Annie. </div>
    );
  }
}

export default Hi;
