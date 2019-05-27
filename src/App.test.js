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
    const searchTerm1 = "'adfaf@$%@%2454'"
    const searchTerm2 = 'Yabba daBBa dOo'
    const searchTerm3 = "'The k!t<|-|en $iNk'"
    expect(instance.parseQuery(searchTerm1)).toEqual("''adfaf@$%@%2454''")
    expect(instance.parseQuery(searchTerm2)).toEqual('yabba dabba doo')
    expect(instance.parseQuery(searchTerm3)).toEqual("'the k!t<|-|en $ink'")


  })
  it('queries with a search term when a search term is given', () => {
    const wrapper = shallow(<App />);
    const spy = jest.spyOn(axios, 'get');
    const instance = wrapper.instance();
    const searchTerm = 'aa'
    instance.queryNASA(searchTerm)
    expect(spy).toHaveBeenLastCalledWith(`https://data.nasa.gov/resource/gh4g-9sfh.json?$where=lower(name) like '%25aa%25'`)
  })
});
