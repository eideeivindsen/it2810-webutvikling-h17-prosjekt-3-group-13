import React from 'react';
import ReactDOM from 'react-dom';
import Events from '../HomeScreenEvents.js';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Events />);
  });
