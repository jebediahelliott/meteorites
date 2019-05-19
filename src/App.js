import React from 'react';
import SearchBar from './SearchBar';
import './App.css';

function App() {
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

export default App;
