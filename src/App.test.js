import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main brand title', () => {
  render(<App />);
  const brand = screen.getAllByText(/CafeDirecto/i)[0];
  expect(brand).toBeInTheDocument();
});
