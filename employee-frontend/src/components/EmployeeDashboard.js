import React, { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/api";
import { toast } from "react-toastify";

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;



  const filteredEmployees = employees.filter((e) =>
  `${e.firstName} ${e.lastName} ${e.email}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

const indexOfLast = currentPage * employeesPerPage;
const indexOfFirst = indexOfLast - employeesPerPage;

const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data || []);
    } catch (err) {
      console.error("Load error", err);
      alert("Failed to load employees: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onAdd = () => {
    setEditing(null);
    setShowForm(true);
  };
  const onEdit = (emp) => {
    setEditing(emp);
    setShowForm(true);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete employee #" + id + "?")) return;
    try {
      await deleteEmployee(id);
      toast.success("Employee deleted");
      load();
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed: " + (err.message || err));
    }
  };

  const onSubmit = async (form) => {
    try {
      if (editing) {
        await updateEmployee(editing.id, form);
        toast.success("Employee updated!");
      } else {
        await createEmployee(form);
        toast.success("Employee created!");
      }
    } catch (err) {
      console.error("Save error", err);
      toast.error("Save failed: " + (err.message || err));
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Employee Management Dashboard</h1>
        <button className="add-btn" onClick={onAdd}>
          + Add Employee
        </button>
      </header>
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 && (
              <tr>
                <td colSpan="6">No employees</td>
              </tr>
            )}
            {currentEmployees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.phone || "-"}</td>
                <td>{e.role || "-"}</td>
                <td className="actions">
                  <button onClick={() => onEdit(e)} title="Edit">
                    ✏️
                  </button>
                  <button onClick={() => onDelete(e.id)} title="Delete">
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <EmployeeForm
          initial={editing}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
