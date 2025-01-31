import React from 'react';

class DisplayCountryData extends React.Component {
  state = {
    displayed: false,
    countryData: ''
  };

  componentDidMount() {
    if (!this.state.displayed) {
      this.setState({displayed: true});
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.displayed && this.state.displayed) {
      const country = this.props.steps["fetchCountryInputFromUser"].value;
      const confirmed  = this.props.steps["fetchCountryInputFromUser"].value;
      const recovered  = this.props.steps["fetchCountryInputFromUser"].value;
      const actif  = this.props.steps["fetchCountryInputFromUser"].value;
      const deaths = this.props.steps["fetchCountryInputFromUser"].value;
      const continent = this.props.steps["fetchCountryInputFromUser"].value;
      const critical = this.props.steps["fetchCountryInputFromUser"].value;
      const newCases = this.props.steps["fetchCountryInputFromUser"].value;
      const newdeaths = this.props.steps["fetchCountryInputFromUser"].value;
      const test = this.props.steps["fetchCountryInputFromUser"].value;
      const caseMil = this.props.steps["fetchCountryInputFromUser"].value;
      const population = this.props.steps["fetchCountryInputFromUser"].value;
      const caseMort = this.props.steps["fetchCountryInputFromUser"].value;

      this.setState({country: `${country.country}`})
      this.setState({confirmed: `${confirmed["cases"]}`})
      this.setState({newCases: `${newCases["todayCases"]}`})
      this.setState({deaths: `${deaths["deaths"]}`})
      this.setState({newdeaths: `${newdeaths["todayDeaths"]}`})
      this.setState({recovered: `${recovered["recovered"]}`})
      this.setState({actif: `${actif["active"]}`})
      this.setState({test: `${test["tests"]}`})
      this.setState({caseMil: `${caseMil["testsPerOneMillion"]}`})
      this.setState({continent: `${continent["continent"]}`})
      this.setState({population: `${population["population"]}`})
      this.setState({critical: `${critical["critical"]}`})
      this.setState({caseMort: `${caseMort["oneDeathPerPeople"]}`})


      setTimeout(() => this.props.triggerNextStep({value: this.props.steps["fetchCountryInputFromUser"].value, trigger: '13'}), 500)
    }
  }

  render() {
    return <div className="response">

    <strong>Pays :  {this.state.country}</strong>
    <p>
      
      <ul>
        <li> Nouveaux cas confirmés : {this.state.newCases}</li>
        <li> Nouveaux cas de décès : {this.state.newdeaths} </li>
        <li> Nombre total de cas confirmés : {this.state.confirmed}</li>
        <li> Nombre total de morts : {this.state.deaths} </li>
        <li> Nombre de cas guéris : {this.state.recovered}</li>
        <li> Nombre de cas actifs : {this.state.actif} </li>
        <li> Nombre de tests effectués : {this.state.test} </li>
        <li> Population du pays : {this.state.population} </li> 
      </ul>

    </p>

    </div>
  }
}

export default DisplayCountryData;
