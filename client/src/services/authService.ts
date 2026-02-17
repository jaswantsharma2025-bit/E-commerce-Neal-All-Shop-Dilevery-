const API_BASE = "/api";

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

/* ---------- CUSTOMER ---------- */

export function loginCustomer(data: {
  emailOrPhone: string;
  password: string;
}) {
  return apiFetch("/auth/customer/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function signupCustomer(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  return apiFetch("/auth/customer/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ---------- VENDOR ---------- */

export function loginVendor(data: {
  emailOrPhone: string;
  password: string;
}) {
  return apiFetch("/auth/vendor/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function signupVendor(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  storeName: string;
}) {
  return apiFetch("/auth/vendor/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getVendorProfile() {
  return apiFetch("/vendor/profile");
}

export function updateVendorProfile(data: any) {
  return apiFetch("/vendor/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}