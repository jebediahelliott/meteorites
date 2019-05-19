import React from 'react';
import App from './App';
import { shallow } from 'enzyme'

describe('<App />', () => {
  it('renders a title', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('h1').text()).toEqual('Meteorite Explorer')
  });
});
