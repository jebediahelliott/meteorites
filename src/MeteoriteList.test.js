import React from 'react';
import { shallow } from 'enzyme';
import MeteoriteList from './MeteoriteList'

describe('<MeteoriteList />', () => {
  const meteorites = [
    {
      fall: "Found",
      id: "4914",
      mass: "256.3",
      name: "Baandee",
      nametype: "Valid",
      recclass: "H6",
      reclat: "-31.616670",
      reclong: "118.033330",
      year: "1967-01-01T00:00:00.000"
    },
    {
      fall: "Found",
      id: "5054",
      mass: "7200",
      name: "Bir Rebaa",
      nametype: "Valid",
      recclass: "H6",
      reclat: "31.666670",
      reclong: "8.416670",
      year: "1993-01-01T00:00:00.000"
    }
  ]
  it('displays a table', () => {
    const wrapper = shallow(<MeteoriteList meteorites={meteorites} />)
    expect(wrapper.find('table').length).toEqual(1)
  })
})
