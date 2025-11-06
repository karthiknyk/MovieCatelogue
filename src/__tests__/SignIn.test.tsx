// __tests__/SignIn.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '../screens/SignIn'; // adjust path
import { AuthContext } from '../routes';

describe('SignIn Screen', () => {
  const mockSignIn = jest.fn();

  const renderComponent = () =>
    render(
      <AuthContext.Provider value={{ signIn: mockSignIn }}>
        <SignIn />
      </AuthContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all UI elements', () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    expect(getByText('LOGIN')).toBeTruthy();
    expect(getByPlaceholderText('Mobile number')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
    expect(getByText('New user ?')).toBeTruthy();
  });

  it('shows validation errors when submitting empty form', async () => {
    const { getByText } = renderComponent();

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Mobile number is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });

  it('updates Formik values on typing in CustomInput', async () => {
    const { getByPlaceholderText } = renderComponent();

    const mobileInput = getByPlaceholderText('Mobile number');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(mobileInput, '9876543210');
    fireEvent.changeText(passwordInput, '123456');

    expect(mobileInput.props.value).toBe('9876543210');
    expect(passwordInput.props.value).toBe('123456');
  });

  it('toggles password visibility with eye icon', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    const passwordInput = getByPlaceholderText('Password');
    expect(passwordInput.props.secureTextEntry).toBe(true);

    const eyeButton = getByText((_, element) => element?.props?.name === 'eye-off');
    fireEvent.press(eyeButton);

    // After toggle
    expect(passwordInput.props.secureTextEntry).toBe(false);
  });

  it('calls signIn with correct data on valid submission', async () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Mobile number'), '9876543210');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({ accessToken: '9876543210' });
    });
  });

  it('shows ActivityIndicator when loading', async () => {
    const { getByText, getByPlaceholderText, getByTestId, rerender } = render(
      <AuthContext.Provider value={{ signIn: () => new Promise(() => {}) }}>
        <SignIn />
      </AuthContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Mobile number'), '9876543210');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');

    fireEvent.press(getByText('Submit'));

    // Add testID to ActivityIndicator in SignIn component:
    // <ActivityIndicator testID="ActivityIndicator" />

    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });
});
