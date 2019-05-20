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
  it('uses the search term to make a request to the API', () => {
    const wrapper = shallow(<SearchBar />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'search');
    const input = wrapper.find('input');
    const button = wrapper.find('button');
    input.simulate('change', {target: {value: 'search term'}})
    button.simulate('click');
    expect(spy).toHaveBeenCalled();
  })
});
