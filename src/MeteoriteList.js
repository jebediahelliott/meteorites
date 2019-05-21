import React, { Component } from 'react';
import './MeteoriteList.css'

class MeteoriteList extends Component {

  rows = () => {
    return this.props.meteorites.map((meteorite) => {
      return (
        <tr key={meteorite.id}>
          <td>{meteorite.name}</td>
          <td>{meteorite.id}</td>
          <td>{meteorite.nametype}</td>
          <td>{meteorite.recclass}</td>
          <td>{meteorite.mass}</td>
          <td>{meteorite.fall}</td>
          <td className="year">{new Date(meteorite.year).getFullYear()}</td>
          <td>{meteorite.reclat}</td>
          <td>{meteorite.reclong}</td>
        </tr>
      )
    })
  }

  render() {
    console.log(this.props.meteorites.lenght);
    if (this.props.meteorites.length === 0) {
      return (
        <div className="noResult">
          <p>Sorry, there were no results that match your search. Please try again.</p>
        </div>
      )
    }else {
      return (
        <div className="MeteoriteList">
          <table>
            <thead>
              <tr id="theader">
                <th>Name</th>
                <th>Id</th>
                <th>Name Type</th>
                <th>Rec Class</th>
                <th>Mass(g)</th>
                <th>Fall</th>
                <th>Year</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {this.rows()}
            </tbody>
          </table>
        </div>
      )
    }

  }
}

export default MeteoriteList;
