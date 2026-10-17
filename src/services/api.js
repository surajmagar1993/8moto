// API Client for 8Moto Backend Server

export async function fetchSettings() {
  try {
    const res = await fetch('/api/settings');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error('Failed to fetch settings from API:', err);
    return null;
  }
}

export async function updateSettings(settings, token) {
  const res = await fetch('/api/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(settings)
  });
  return await res.json();
}

export async function fetchExpeditions() {
  try {
    const res = await fetch('/api/expeditions');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Failed to fetch expeditions:', err);
    return [];
  }
}

export async function createExpedition(expedition, token) {
  const res = await fetch('/api/expeditions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(expedition)
  });
  return await res.json();
}

export async function updateExpedition(id, expedition, token) {
  const res = await fetch(`/api/expeditions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(expedition)
  });
  return await res.json();
}

export async function deleteExpedition(id, token) {
  const res = await fetch(`/api/expeditions/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await res.json();
}

export async function adminLogin(password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  return await res.json();
}

export async function submitInquiry(inquiry) {
  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiry)
  });
  return await res.json();
}

export async function fetchInquiries(token) {
  const res = await fetch('/api/inquiries', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await res.json();
}
