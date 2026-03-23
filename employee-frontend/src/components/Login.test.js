import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import * as api from '../services/api';
import { AuthProvider } from '../context/AuthContext';
import { toast } from 'react-toastify';

jest.mock('../services/api');
jest.mock('./AbstractCanvas', () => () => <div data-testid="abstract-canvas-mock" />);
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const renderWithRouter = (ui) => {
  return render(
    <AuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthProvider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form properly', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('hello@catalyst.hr')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows error when fields are empty', async () => {
    renderWithRouter(<Login />);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitBtn);

    expect(toast.error).toHaveBeenCalledWith('Please enter both email and password.');
    expect(api.login).not.toHaveBeenCalled();
  });

  test('calls API and navigates on successful login', async () => {
    api.login.mockResolvedValueOnce({ token: 'mockToken' });
    renderWithRouter(<Login />);

    const emailInput = screen.getByPlaceholderText('hello@catalyst.hr');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    expect(submitBtn).toBeDisabled();

    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(toast.success).toHaveBeenCalledWith('Welcome back!');
    });
  });

  test('shows error toast on API failure', async () => {
    api.login.mockRejectedValueOnce(new Error('Invalid credentials'));
    renderWithRouter(<Login />);

    const emailInput = screen.getByPlaceholderText('hello@catalyst.hr');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.login).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    });
    
    // Ensure button is re-enabled
    expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
  });
});
