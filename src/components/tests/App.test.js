import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  });

it('should render a container', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("Container")).toHaveLength(1);
});
