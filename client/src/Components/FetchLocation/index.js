import React from 'react';
import './fetchLocation.css';
import axios from 'axios';

class FetchLocation extends React.Component {
  state = {
    location: null,
    loading: true,
    triggeredNext: false
  };

  getPosition = () => {
    // Simple wrapper
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.loading && prevState.loading) {
      setTimeout(() => this.props.triggerNextStep({value: this.state.location, trigger: this.state.location ? 'afterLocationFetch' : 'fetchCountryFromUser'}), 1000)
    }
  }

  componentDidMount() {
    this.getPosition().then((location) => {
      return {latitude: location.coords.latitude, longitude: location.coords.longitude};
    }).then(coordinates => {
      axios.get(`https://api.opencagedata.com/geocode/v1/json?key=1c44ed9a41784ca6994c6cd7b0bf8fa4&q=${coordinates.latitude}%2C+${coordinates.longitude}&pretty=1&no_annotations=1`).then(locationData => {
        let country = locationData.data.results[0].components.country;
        this.setState({location: country, loading: false});
      }).catch(() => this.setState({loading: false}))
    }).catch(() => this.setState({loading: false}))
  }

  render() {
    return (
      <div className="message-box">
        {this.state.loading ? 'Chargement...' : (this.state.location ? `Il me semble que vous etes actuellement dans le pays suivant : ${this.state.location}` : 'Impossible de trouver votre pays automatiquement. Veuillez activer la locaqlisation sur votre bar de recherche')}
      </div>
    );
  }
}

export default FetchLocation;
