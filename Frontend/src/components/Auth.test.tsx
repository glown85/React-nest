import React from 'react';
import { render } from '@testing-library/react';
import AuthPage from  './Auth';


test('auth page render', () => {
    const { getByText } = render(<AuthPage />);
    const emailElement = getByText('Email');
    const passwordElement = getByText('Password');
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
  });

  test('no error', () => {
    const { queryByTestId } = render(<AuthPage />);
    const errorElement = queryByTestId('error-message');
    expect(errorElement).toBeNull();
  });




