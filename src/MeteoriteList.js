import React, { Component } from 'react';

class MeteoriteList extends Component {

  rows = () => {
    return this.props.meteorites.map((meteorite) => {
      return (
        <tr>
          <td>{meteorite.name}</td>
          <td>{meteorite.id}</td>
          <td>{meteorite.nametype}</td>
          <td>{meteorite.recclass}</td>
          <td>{meteorite.mass}</td>
          <td>{meteorite.fall}</td>
          <td>{meteorite.year}</td>
          <td>{meteorite.reclat}</td>
          <td>{meteorite.reclong}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
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

export default MeteoriteList;
