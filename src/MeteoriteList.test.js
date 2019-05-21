import React from 'react';
import { shallow } from 'enzyme';
import MeteoriteList from './MeteoriteList'

describe('<MeteoriteList />', () => {
  it('displays a table', () => {
    const wrapper = shallow(<MeteoriteList />)
    expect(wrapper.find('table').length).toEqual(1)
  })
})
