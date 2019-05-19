import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  it('has in input', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('input').length).toEqual(1);
  });
  it('has a button', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});
