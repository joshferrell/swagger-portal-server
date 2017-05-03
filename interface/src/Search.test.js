import React from 'react';
import { render, shallow } from 'enzyme';
import Search from './Search';

describe('given 2 apis', () => {
    const apis = [
    { id: '1', title: 'one' },
    { id: '2', title: 'two' }
    ];

    test('when no search term is provided, then display all items', () => {
        const search = render(<Search apis={apis} />);
        expect(search.find('li').length).toBe(2);
    });

    test("when searching for 'one', then 1 item is displayed", () => {
        const search = shallow(<Search apis={apis} />);
        search.setState({ text: 'one' });
        expect(search.find('li').length).toBe(1);
    });

    test("when searching for 'three', then 0 items are displayed", () => {
        const search = shallow(<Search apis={apis} />);
        search.setState({ text: 'three' });
        expect(search.find('li').length).toBe(0);
    });
});
