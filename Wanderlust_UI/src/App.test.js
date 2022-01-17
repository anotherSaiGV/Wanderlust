import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/home';
import {shallow, mount, render} from 'enzyme';

describe('APP', () => {

  test("CHECK NAV TAG", () => {
    const wrapper= shallow(<App />);
    expect(wrapper.find('nav').length).toEqual(1);
  });

})


