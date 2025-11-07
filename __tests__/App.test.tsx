import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

test('renders correctly', async () => {
  const { toJSON } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(toJSON()).toBeTruthy();
});
