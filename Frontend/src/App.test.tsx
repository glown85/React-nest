import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';
import reactDom from 'react-dom'

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/email/i);
  expect(linkElement).toBeInTheDocument();
});


describe('App', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


});
