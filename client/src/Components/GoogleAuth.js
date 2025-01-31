import React from 'react';
import {withRouter} from 'react-router';
import queryString from 'querystring';
class GoogleAuth extends React.Component {
  componentDidMount() {
    let googleAuthToken = queryString.parse(this.props.location.search)["?token"];
    if (googleAuthToken) {
      window.localStorage.setItem("authToken", googleAuthToken);
      this.props.history.push('/');
    }
    console.log(googleAuthToken);
  }

  render() {
    return <div />
  }
};

export default withRouter(GoogleAuth);
