const API_BASE = "http://localhost:5000/api";

export async function loginCustomer(data: {
  emailOrPhone: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE}/auth/customer/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function signupCustomer(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE}/auth/customer/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function loginVendor(data: {
  emailOrPhone: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE}/auth/vendor/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function signupVendor(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  storeName: string;
}) {
  const res = await fetch(`${API_BASE}/auth/vendor/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
