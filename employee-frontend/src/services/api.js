const API_ROOT = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const base = `${API_ROOT}/api/employees`;

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(res.status + ' ' + res.statusText + ' - ' + text);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function login(email, password) {
  const res = await fetch(`${base}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include' // this tells fetch to include cookies
  });
  return handleResponse(res);
}

export async function getEmployees() {
  const res = await fetch(base, { credentials: 'include' });
  return handleResponse(res);
}

export async function getEmployee(id) {
  const res = await fetch(`${base}/${id}`, { credentials: 'include' });
  return handleResponse(res);
}

export async function createEmployee(payload) {
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include'
  });
  return handleResponse(res);
}

export async function updateEmployee(id, payload) {
  const res = await fetch(`${base}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include'
  });
  return handleResponse(res);
}

export async function deleteEmployee(id) {
  const res = await fetch(`${base}/${id}`, { 
    method: 'DELETE',
    credentials: 'include' 
  });
  return handleResponse(res);
}