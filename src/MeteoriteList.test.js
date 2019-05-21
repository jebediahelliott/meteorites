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
  it('displays a row for each meteorite', () => {
    const wrapper = shallow(<MeteoriteList meteorites={meteorites} />)
    expect(wrapper.find('tr').length).toEqual(meteorites.length + 1)
  })
  it('displays the year in a human readable format', () => {
    const wrapper = shallow(<MeteoriteList meteorites={meteorites} />)
    const years = [];
    wrapper.find('.year').forEach(node => years.push(node.text()));
    expect(years).toEqual(['1967', '1993'])
  })
  it('shows error message when there are no search results', () => {
    const wrapper = shallow(<MeteoriteList meteorites={[]} />)
    expect(wrapper.find('p').text()).toEqual('Sorry, there were no results that match your search. Please try again.')
  })
})
