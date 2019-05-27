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
    const resp = {data: [{name: "Ouzina", id: "18054", nametype: "Valid", recclass: "R4", mass: "642"}]}
    const spy = jest.spyOn(axios, 'get');
    spy.mockResolvedValue(resp);
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    await instance.componentDidMount();
    expect(wrapper.state('meteorites')).toEqual([{name: "Ouzina", id: "18054", nametype: "Valid", recclass: "R4", mass: "642"}]);
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
    expect(instance.parseQuery(searchTerm3)).toEqual("''the k!t<|-|en $ink''")
  })
  it('queries with a search term when a search term is given', () => {
    const wrapper = shallow(<App />);
    const spy = jest.spyOn(axios, 'get');
    const instance = wrapper.instance();
    const searchTerm = 'Meteorite'
    instance.queryNASA(searchTerm)
    expect(spy).toHaveBeenLastCalledWith(`https://data.nasa.gov/resource/gh4g-9sfh.json?$where=lower(name) like '%25meteorite%25'`)
  })
  it('alphabetizes results based on name', async () => {
    const sortedResults = [
      {name: "Bi'r Tazit", id: "48983", nametype: "Valid", recclass: "CK6", mass: "46"},
      {name: "Ilizi", id: "35519", nametype: "Valid", recclass: "H4", mass: "185"},
      {name: "Jodzie", id: "12173", nametype: "Valid", recclass: "Howardite", mass: "30"},
      {name: "Maziba", id: "15454", nametype: "Valid", recclass: "L6", mass: "4975"},
      {name: "McKenzie Draw (a)", id: "15461", nametype: "Valid", recclass: "H4", mass: "11800"},
      {name: "McKenzie Draw (b)", id: "15462", nametype: "Valid", recclass: "H4", mass: "2990"},
      {name: "Menziswyl", id: "15486", nametype: "Valid", recclass: "L5", mass: "28.9"},
      {name: "New Leipzig", id: "16955", nametype: "Valid", recclass: "Iron, IAB-MG", mass: "20000"},
      {name: "Ouzina", id: "18054", nametype: "Valid", recclass: "R4", mass: "642"},
      {name: "Podgrodzie", id: "31301", nametype: "Valid", recclass: "H4/5", mass: "8.9"},
      {name: "Santa Luzia", id: "23166", nametype: "Valid", recclass: "Iron, IIAB", mass: "1918000"},
      {name: "Zaborzika", id: "30379", nametype: "Valid", recclass: "L6", mass: "3867"},
      {name: "Zakłodzie", id: "30390", nametype: "Valid", recclass: "Enst achon-ung", mass: "8680"},
      {name: "Zillah 001", id: "31355", nametype: "Valid", recclass: "L6", mass: "1475"},
      {name: "Zillah 002", id: "31356", nametype: "Valid", recclass: "Eucrite", mass: "172"},
      {name: "Zinder", id: "30409", nametype: "Valid", recclass: "Pallasite, ungrouped", mass: "46"}
    ];
    const unsortedResults = [
      {name: "Ouzina", id: "18054", nametype: "Valid", recclass: "R4", mass: "642"},
      {name: "Zinder", id: "30409", nametype: "Valid", recclass: "Pallasite, ungrouped", mass: "46"},
      {name: "Ilizi", id: "35519", nametype: "Valid", recclass: "H4", mass: "185"},
      {name: "Jodzie", id: "12173", nametype: "Valid", recclass: "Howardite", mass: "30"},
      {name: "Zakłodzie", id: "30390", nametype: "Valid", recclass: "Enst achon-ung", mass: "8680"},
      {name: "McKenzie Draw (a)", id: "15461", nametype: "Valid", recclass: "H4", mass: "11800"},
      {name: "Santa Luzia", id: "23166", nametype: "Valid", recclass: "Iron, IIAB", mass: "1918000"},
      {name: "McKenzie Draw (b)", id: "15462", nametype: "Valid", recclass: "H4", mass: "2990"},
      {name: "Zillah 001", id: "31355", nametype: "Valid", recclass: "L6", mass: "1475"},
      {name: "Menziswyl", id: "15486", nametype: "Valid", recclass: "L5", mass: "28.9"},
      {name: "New Leipzig", id: "16955", nametype: "Valid", recclass: "Iron, IAB-MG", mass: "20000"},
      {name: "Podgrodzie", id: "31301", nametype: "Valid", recclass: "H4/5", mass: "8.9"},
      {name: "Bi'r Tazit", id: "48983", nametype: "Valid", recclass: "CK6", mass: "46"},
      {name: "Maziba", id: "15454", nametype: "Valid", recclass: "L6", mass: "4975"},
      {name: "Zaborzika", id: "30379", nametype: "Valid", recclass: "L6", mass: "3867"},
      {name: "Zillah 002", id: "31356", nametype: "Valid", recclass: "Eucrite", mass: "172"}
    ];
    const spy = jest.spyOn(axios, 'get');
    spy.mockResolvedValue({data: unsortedResults});
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    await instance.queryNASA('zi');
    expect(wrapper.state('meteorites')).toEqual(sortedResults);
  })
});
