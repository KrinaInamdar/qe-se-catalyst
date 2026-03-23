import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import EmployeeDashboard from './EmployeeDashboard';
import * as api from '../services/api';
import { toast } from 'react-toastify';

jest.mock('../services/api');
jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn()
  },
}));

const mockAuthLogout = jest.fn();

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    login: jest.fn(),
    logout: mockAuthLogout
  }),
  AuthProvider: ({ children }) => <div>{children}</div>
}));

const mockEmployees = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123', role: 'Dev' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '456', role: 'QA' }
];

describe('EmployeeDashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.getEmployees.mockResolvedValue(mockEmployees);
  });

  test('renders dashboard and loads employees', async () => {
    await act(async () => {
      render(<EmployeeDashboard />);
    });

    // Header is always visible
    expect(screen.getByText('Employee Dashboard')).toBeInTheDocument();

    // After load, employees appear as "FirstName LastName"
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  test('handles deleting an employee', async () => {
    window.confirm = jest.fn(() => true);
    api.deleteEmployee.mockResolvedValue(null);

    await act(async () => {
      render(<EmployeeDashboard />);
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Delete buttons have title="Delete"
    const deleteBtns = screen.getAllByTitle('Delete');
    await act(async () => {
      fireEvent.click(deleteBtns[0]);
    });

    await waitFor(() => {
      expect(api.deleteEmployee).toHaveBeenCalledWith(1);
      expect(toast.success).toHaveBeenCalledWith('Employee deleted');
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  test('does not delete if confirm is cancelled', async () => {
    window.confirm = jest.fn(() => false);

    await act(async () => {
      render(<EmployeeDashboard />);
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const deleteBtns = screen.getAllByTitle('Delete');
    fireEvent.click(deleteBtns[0]);

    expect(api.deleteEmployee).not.toHaveBeenCalled();
  });

  test('opens add employee form and creates employee', async () => {
    api.createEmployee.mockResolvedValue({ id: 3, firstName: 'New', lastName: 'User', email: 'n@u.com' });
    api.getEmployees
      .mockResolvedValueOnce(mockEmployees)
      .mockResolvedValueOnce([...mockEmployees, { id: 3, firstName: 'New', lastName: 'User', email: 'n@u.com', phone: '', role: '' }]);

    await act(async () => {
      render(<EmployeeDashboard />);
    });

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    // Click Add Employee button
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));

    // Form should open - an "Add Employee" heading appears in the modal
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Add Employee' })).toBeInTheDocument());

    // Fill required fields using accessible labels
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'New' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'n@u.com' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /create/i }));
    });

    await waitFor(() => {
      expect(api.createEmployee).toHaveBeenCalled();
    });
  });

  test('opens edit form and updates employee', async () => {
    api.updateEmployee.mockResolvedValue({ ...mockEmployees[0], firstName: 'UpdatedJohn' });
    api.getEmployees
      .mockResolvedValueOnce(mockEmployees)
      .mockResolvedValueOnce([{ ...mockEmployees[0], firstName: 'UpdatedJohn' }, mockEmployees[1]]);

    await act(async () => {
      render(<EmployeeDashboard />);
    });

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    const editBtns = screen.getAllByTitle('Edit');
    fireEvent.click(editBtns[0]);

    await waitFor(() => expect(screen.getByText('Edit Employee')).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'UpdatedJohn' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /save/i }));
    });

    await waitFor(() => {
      expect(api.updateEmployee).toHaveBeenCalled();
    });
  });

  test('handles search filtering', async () => {
    await act(async () => {
      render(<EmployeeDashboard />);
    });

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    const searchInput = screen.getByPlaceholderText('Search directory...');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Jane' } });
    });

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  test('handles logout button', async () => {
    await act(async () => {
      render(<EmployeeDashboard />);
    });

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    fireEvent.click(screen.getByText(/logout/i));
    expect(mockAuthLogout).toHaveBeenCalled();
  });
});
