import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmployeeForm from './EmployeeForm';

describe('EmployeeForm Component', () => {
  const mockOnCancel = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Add Employee form when no initial props', () => {
    render(<EmployeeForm onCancel={mockOnCancel} onSubmit={mockOnSubmit} />);
    expect(screen.getByText('Add Employee')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  test('renders Edit Employee form when initial props exist', () => {
    const initialData = {
      id: 1,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@test.com',
      phone: '123',
      role: 'Dev',
    };
    render(<EmployeeForm initial={initialData} onCancel={mockOnCancel} onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Edit Employee')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Smith')).toBeInTheDocument();
    expect(screen.getByDisplayValue('alice@test.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('validates required fields before submitting', async () => {
    render(<EmployeeForm onCancel={mockOnCancel} onSubmit={mockOnSubmit} />);

    // Missing fields submit
    const submitBtn = screen.getByRole('button', { name: /create/i });
    fireEvent.click(submitBtn);

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(await screen.findByText(/first name, last name and email are required/i)).toBeInTheDocument();
  });

  test('calls onSubmit when valid data is entered', async () => {
    mockOnSubmit.mockResolvedValueOnce({});
    render(<EmployeeForm onCancel={mockOnCancel} onSubmit={mockOnSubmit} />);

    // Only required fields are necessary
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Dylan' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'bob@example.com' } });

    const submitBtn = screen.getByRole('button', { name: /create/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: 'Bob',
        lastName: 'Dylan',
        email: 'bob@example.com',
        phone: '',
        role: '',
      });
    });
  });

  test('calls onCancel function', () => {
    render(<EmployeeForm onCancel={mockOnCancel} onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
