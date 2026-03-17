const API_ROOT = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const base = `${API_ROOT}/api/employees`;

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(res.status + ' ' + res.statusText + ' - ' + text);
  }
  return res.status === 204 ? null : res.json();
}

export async function getEmployees() {
  const res = await fetch(base);
  return handleResponse(res);
}

export async function getEmployee(id) {
  const res = await fetch(`${base}/${id}`);
  return handleResponse(res);
}

export async function createEmployee(payload) {
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function updateEmployee(id, payload) {
  const res = await fetch(`${base}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function deleteEmployee(id) {
  const res = await fetch(`${base}/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}