import React, { Component } from 'react';


class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  render() {
    return (
      <div>
        <input type="text" /><button>Search</button>
      </div>
    )
  }

}


export default SearchBar;
