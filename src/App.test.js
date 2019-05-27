import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import axios from 'axios';
// jest.mock('axios')


describe('<App />', () => {
  it('renders a title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).toEqual('Meteorite Explorer');
  });
  it('renders a search bar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('SearchBar').length).toEqual(1);
  })
  it('renders a list of meteorites', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('MeteoriteList').length).toEqual(1);
  })
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
  it('parses user search term', () => {
    const wrapper = shallow(<App />);
    const spy = jest.spyOn(axios, 'get');
    const instance = wrapper.instance();
    const searchTerm = "'adfaf@$%@%2454'"
    expect(instance.parseQuery(searchTerm)).toEqual(`'${searchTerm}'`)
  })
  it('queries with a search term when a search term is given', () => {
    const wrapper = shallow(<App />);
    const spy = jest.spyOn(axios, 'get');
    const instance = wrapper.instance();
    const searchTerm = 'aa'
    instance.queryNASA(searchTerm)
    expect(spy).toHaveBeenLastCalledWith(`https://data.nasa.gov/resource/gh4g-9sfh.json?$where=lower(name) like '%25${searchTerm}%25'`)
  })
  it('makes search case insensitive', () => {
    const wrapper = shallow(<App />);
    const spy = jest.spyOn(axios, 'get');
    const instance = wrapper.instance();
    const searchTerm = 'Yabba daBBa dOo'
    instance.queryNASA(searchTerm)
    expect(spy).toHaveBeenLastCalledWith(`https://data.nasa.gov/resource/gh4g-9sfh.json?$where=lower(name) like '%25${searchTerm.toLowerCase()}%25'`)

  })
});
