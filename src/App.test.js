import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import axios from 'axios';
// jest.mock('axios')


describe('<App />', () => {
  it('renders a title', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('h1').text()).toEqual('Meteorite Explorer')
  });
  it('fetches the meteorite list when it mounts', () => {
    const spy = jest.spyOn(axios, 'get');
    const wrapper = shallow(<App />);
    expect(spy).toHaveBeenCalledWith('https://data.nasa.gov/resource/gh4g-9sfh.json');
  });
  it('sets state with response from NASA API', async () => {
    const resp = {data: 42}
    const spy = jest.spyOn(axios, 'get');
    spy.mockResolvedValue(resp);
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    await instance.componentDidMount()
    expect(wrapper.state('meteorites')).toEqual(42);
  });
});
