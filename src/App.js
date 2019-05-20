import React, { Component } from 'react';
import SearchBar from './SearchBar';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meteorites: []
    }
  }

  defaultRequest = () => {
    axios.get('https://data.nasa.gov/resource/gh4g-9sfh.json')
    .then(resp => this.setState({meteorites: resp.data}));
  }

  queryNASA = (term) => {
    axios.get(`https://data.nasa.gov/resource/gh4g-9sfh.json?$where=name like '%25${term}%25'`)
    .then(resp => {
      this.setState({meteorites: resp.data})
    });
  }

  componentDidMount() {
    this.defaultRequest()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Meteorite Explorer</h1>
        </header>
        <body className="App-body">
          <SearchBar queryNASA={this.queryNASA} />
        </body>
      </div>
    );
  }
}

export default App;
