import * as React from 'react';
import App from '../App';
import {mount, ReactWrapper} from 'enzyme'

test('App is rendered', () => {
    const wrapper: ReactWrapper = mount(<App/>)
    expect(wrapper).toBeTruthy()
});
