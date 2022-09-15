import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { PAGE_TITLE } from './constants';

test('renders page title', () => {
  render(<App />);
  const header = screen.getByText(PAGE_TITLE);
  expect(header).toBeInTheDocument();
});
