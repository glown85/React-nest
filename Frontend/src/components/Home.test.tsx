import React from 'react';
import { render } from '@testing-library/react';
import HelloPage from  './Home';


test('auth page render', () => {
    const { getByText } = render(<HelloPage />);
    const emailElement = getByText('Hello!');
  
    expect(emailElement).toBeInTheDocument();

  });

