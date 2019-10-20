import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import AppIndirect from './index';

describe('Components -> App', () => {
  it('Direct and Indirect imports should be same', () => {
    expect.assertions(1);

    expect(AppIndirect).toBe(App);
  });

  it('Should match with the snapshot', () => {
    // Cant use shallow rendering technique because of the react hooks:
    // https://github.com/airbnb/enzyme/issues/2011
    const app = mount(<App />);

    expect(app).toMatchSnapshot();
  });
});
