import React from 'react';
import { mount, shallow } from 'enzyme';
import Donate from '../components/donate/index';
import moxios from 'moxios';
describe('Component Donate', () => {
	beforeEach(() => {
		moxios.install();
	})

	afterEach(() => {
		moxios.uninstall();
	})

	it('should execute nextSection on tab', () => {
		const wrapper = mount(<Donate texts={{}} />);
		const input = 	wrapper.find('input').at(0);
	
		input.simulate('change', {currentTarget: {value: 50}});
		wrapper.simulate('keyDown', {keyCode: 9, wich: 9});
		
		expect(wrapper.state().section).toEqual(1);
	})

});
