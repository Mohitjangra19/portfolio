import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio sections', () => {
  render(<App />);
  expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  expect(screen.getByText(/Experience/i)).toBeInTheDocument();
  expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
});
