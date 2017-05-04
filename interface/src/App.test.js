import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';
import { checkResults } from './Utils';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('should render the search view by default', () => {
    const component = renderer.create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
});

it('should render the search view by default', () => {
    const sample = [{ title: 'foo' }, { title: 'bar' }];
    expect(checkResults('oo', sample)).toEqual([{ title: 'foo' }]);
});
