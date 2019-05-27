import React, { Component } from 'react';
import SearchBar from './SearchBar';
import MeteoriteList from './MeteoriteList';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meteorites: []
    };
  }

  defaultRequest = () => {
    axios.get('https://data.nasa.gov/resource/gh4g-9sfh.json')
    .then(resp => this.setState({meteorites: this.alphabetize(resp.data)}));
  }

  parseQuery = term => {
    return term.replace(/'/g, "''").toLowerCase()
  }

  alphabetize = (dataArray) => {
    return dataArray.sort(function(a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
  }

  queryNASA = term => {
    axios.get(`https://data.nasa.gov/resource/gh4g-9sfh.json?$where=lower(name) like '%25${this.parseQuery(term)}%25'`)
    .then(resp => {
      this.setState({meteorites: this.alphabetize(resp.data)})
    })
    .catch(res => console.log(res.message));
  }

  componentDidMount() {
    this.defaultRequest();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Meteorite Explorer</h1>
        </header>
        <div className="App-body">
          <SearchBar queryNASA={this.queryNASA} />
          <MeteoriteList meteorites={this.state.meteorites} />
        </div>
      </div>
    );
  }
}

export default App;
