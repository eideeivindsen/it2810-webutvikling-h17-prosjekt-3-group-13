import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeScreen from '../WelcomeScreen.js';
import { shallow } from 'enzyme';

  it('should render a welcome card', () => {
    const wrapper = shallow(<WelcomeScreen />);
    expect(wrapper.find("Card")).toHaveLength(1);
  });
