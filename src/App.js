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

  componentDidMount() {
    axios.get('https://data.nasa.gov/resource/gh4g-9sfh.json')
    .then(resp => console.log(resp))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Meteorite Explorer</h1>
        </header>
        <body className="App-body">
          <SearchBar />
        </body>
      </div>
    );
  }
}

export default App;
