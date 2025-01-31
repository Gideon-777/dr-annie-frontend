import React from 'react';
import './fetchLocation.css';
import axios from 'axios';

class DisplayUserEnteredLocation extends React.Component {
  state = {
    info: null,
    loading: true,
    nextStep: null
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.loading && prevState.loading) {
      setTimeout(() => this.props.triggerNextStep({
        value: this.props.steps['12'].value,
        trigger: this.state.nextStep
      }), 1000)
    }
  }

  componentDidMount() {
    axios.get(`/api/covid-data/countries/${this.props.steps['12'].value}`).then(res => {
      const info = res.data;
      if (info.data.count === 0) {
        return {nextStep: '11', message: 'Impossible de trouver ce pays. Essayer le nom du pays en anglais'};
      } else if (info.data.count > 1) {
        return {nextStep: 'fetchUserEnteredStateName', message: 'Please enter the name of your state.'}
      } else {
        return {nextStep: '13', message: `La dernière mise à jour a été effectuée le ${info.data.data.Last_Update}. Il ya  ${info.data.data.Confirmed} cas confirmés, ${info.data.data.Deaths} morts, ${info.data.data.Recovered} guéris et ${info.data.data.Active} cas actifs au ${info.data.data.Country_Region}.`}
      }
    }).then(message => {
      console.log(message);
      this.setState({info: message.message, loading: false, nextStep: message.nextStep});
    });
  }

  render() {
    return (
      <div className="message-box">
        {this.state.loading ? 'Chargement...' : this.state.info}
      </div>
    );
  }
}

export default DisplayUserEnteredLocation;
