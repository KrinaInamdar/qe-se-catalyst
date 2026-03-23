import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from './Signup';
import * as api from '../services/api';
import { toast } from 'react-toastify';

jest.mock('../services/api');
jest.mock('./AbstractCanvas', () => () => <div data-testid="abstract-canvas-mock" />);
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form', () => {
    renderWithRouter(<Signup />);
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  test('validates required fields', () => {
    renderWithRouter(<Signup />);
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(toast.error).toHaveBeenCalledWith('First name, last name, email and password are required.');
  });

  test('submits successfully', async () => {
    api.createEmployee.mockResolvedValueOnce({ id: 1 });
    renderWithRouter(<Signup />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('John'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Doe'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('john.doe@catalyst.hr'), { target: { value: 'john@doe.com' } });
    fireEvent.change(screen.getByPlaceholderText('Create a strong password'), { target: { value: 'password123' } });
    
    const submitBtn = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitBtn);
    expect(submitBtn).toBeDisabled();

    await waitFor(() => {
      expect(api.createEmployee).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        phone: '',
        role: '',
        password: 'password123'
      });
      expect(toast.success).toHaveBeenCalledWith('Account created successfully! Please sign in.');
    });
  });

  test('shows error on failure', async () => {
    api.createEmployee.mockRejectedValueOnce(new Error('Email already exists'));
    renderWithRouter(<Signup />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('John'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByPlaceholderText('Doe'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('john.doe@catalyst.hr'), { target: { value: 'jane@doe.com' } });
    fireEvent.change(screen.getByPlaceholderText('Create a strong password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email already exists');
    });
  });
});
