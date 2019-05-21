import React, { Component } from 'react';
import './SearchBar.css'


class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  search = () => {
    this.props.queryNASA(this.state.searchTerm);
    this.setState({searchTerm: ''})
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="SearchBar">
        <input type="text" name='searchTerm' value={this.state.searchTerm} onChange={(event) => this.handleChange(event)} /><button onClick={this.search}>Search</button>
      </div>
    )
  }

}


export default SearchBar;
