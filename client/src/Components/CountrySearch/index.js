import React from 'react';
import axios from 'axios';
import './countrySearch.scss';

class CountrySearch extends React.Component {
  state = {
    countryName: "",
    allCountryData: [],
    loading: true
  };

  componentDidMount() {
    console.log(this.props.steps);
    const countryNamesToShowFirst = ["Gabon", "Congo", "Equatorial Guinea", "World"];
    axios.get('https://disease.sh/v3/covid-19/countries/').then(covidRes => {
      let allCountryData = covidRes.data;
      console.log(allCountryData);
      const countryDataToShowFirst = allCountryData.filter(countryData => countryNamesToShowFirst.includes(countryData.country));
      countryNamesToShowFirst.forEach(countryName => allCountryData.splice(allCountryData.findIndex(country => country.country === countryName), 1));
      allCountryData = [...countryDataToShowFirst, ...allCountryData];
      this.setState({allCountryData: allCountryData, loading: false});
    })
  }

  render() {
    return this.state.loading ? <p>Chargement en cours...</p> : <div className="country-search">
      <input type="text" placeholder="Veuillez saisir le nom de votre pays ici ..." value={this.state.countryName} onChange={(evt) => this.setState({countryName: evt.target.value})} className="form-control country-input"/>
      <div className="country-search__popdown">
        {this.state.allCountryData.map((country, index) => ({name: country.country, index}))
          .filter(country => country.name.toLowerCase().includes(this.state.countryName.toLowerCase()))
          .slice(0, 4)
          .map(country => <button onClick={() => this.props.triggerNextStep({value: this.state.allCountryData[country.index], trigger: "displayCountryData"})} className="country-search__list-item">{country.name}</button>)
        }
      </div>
    </div>
  }
}

export default CountrySearch;

