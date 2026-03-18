import { render, screen } from '@testing-library/react';
import App from './App';

test('renders employee dashboard header', () => {
  render(<App />);
  expect(screen.getByText(/employee management dashboard/i)).toBeInTheDocument();
});

test('renders add employee button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /\+ add employee/i })).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/search employee/i)).toBeInTheDocument();
});

test('renders pagination container', () => {
  render(<App />);
  expect(screen.getByTestId('pagination')).toBeInTheDocument();
});

