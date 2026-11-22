/**
 * SB Solar Energy API Service Client
 * Connects frontend to the Node.js / PHP backend & MySQL database
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || (
  typeof window !== 'undefined' && window.location.hostname.includes('sbsolarenergy.in')
    ? '/api'
    : 'https://sbsolarenergy.in/api'
);

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (netErr: any) {
    throw new Error(`Database server is unreachable at ${API_BASE_URL}. (${netErr?.message || 'Network error'})`);
  }

  // Graceful fallback for Apache setups where mod_rewrite might be restricted
  if (response.status === 404) {
    let fallbackEndpoint = '';
    if (endpoint.startsWith('/auth/login')) {
      fallbackEndpoint = '/auth.php?action=login';
    } else if (endpoint.startsWith('/auth/register')) {
      fallbackEndpoint = '/auth.php?action=register';
    } else if (endpoint.startsWith('/complaints')) {
      fallbackEndpoint = '/complaints.php' + endpoint.replace('/complaints', '');
    }

    if (fallbackEndpoint) {
      try {
        const fallbackRes = await fetch(`${API_BASE_URL}${fallbackEndpoint}`, { ...options, headers });
        if (fallbackRes.status !== 404) {
          response = fallbackRes;
        }
      } catch {
        // keep original response
      }
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Database error (${response.status}): ${response.statusText}`);
  }

  return response.json();
}

// ==================== AUTH API ====================
export const authApi = {
  login: (data: { email: string; password: string; role?: 'admin' | 'customer' }) =>
    request<{ success: boolean; token: string; user: any; message?: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  register: (data: { name: string; email: string; password: string; phone?: string; role?: 'admin' | 'customer' }) =>
    request<{ success: boolean; data: any; message?: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ==================== COMPLAINTS API ====================
export const complaintsApi = {
  getAll: (params?: { status?: string; email?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.email) searchParams.set('email', params.email);
    const qs = searchParams.toString();
    return request<{ success: boolean; data: any[] }>(`/complaints${qs ? `?${qs}` : ''}`);
  },
  create: (data: {
    category: string;
    sub_category?: string;
    nature: string;
    description?: string;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
  }) =>
    request<{ success: boolean; data: any; message?: string }>('/complaints', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateStatus: (id: string | number, status: string) =>
    request<{ success: boolean; message: string }>(`/complaints/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

// ==================== LEADS API ====================
export const leadsApi = {
  getAll: (params?: { status?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.search) searchParams.set('search', params.search);
    const qs = searchParams.toString();
    return request<{ success: boolean; data: any[] }>(`/leads${qs ? `?${qs}` : ''}`);
  },
  getById: (id: string | number) => request<{ success: boolean; data: any }>(`/leads/${id}`),
  create: (data: any) => request<{ success: boolean; data: any }>('/leads', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string | number, data: any) => request<{ success: boolean; data: any }>(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string | number) => request<{ success: boolean; message: string }>(`/leads/${id}`, { method: 'DELETE' }),
};

// ==================== DEALS API ====================
export const dealsApi = {
  getAll: (params?: { stage?: string; owner?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.stage) searchParams.set('stage', params.stage);
    if (params?.owner) searchParams.set('owner', params.owner);
    const qs = searchParams.toString();
    return request<{ success: boolean; data: any[] }>(`/deals${qs ? `?${qs}` : ''}`);
  },
  create: (data: any) => request<{ success: boolean; data: any }>('/deals', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string | number, data: any) => request<{ success: boolean; data: any }>(`/deals/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string | number) => request<{ success: boolean; message: string }>(`/deals/${id}`, { method: 'DELETE' }),
};

// ==================== CONTACTS API ====================
export const contactsApi = {
  getAll: (params?: { tag?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.tag) searchParams.set('tag', params.tag);
    if (params?.search) searchParams.set('search', params.search);
    const qs = searchParams.toString();
    return request<{ success: boolean; data: any[] }>(`/contacts${qs ? `?${qs}` : ''}`);
  },
  create: (data: any) => request<{ success: boolean; data: any }>('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string | number, data: any) => request<{ success: boolean; data: any }>(`/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string | number) => request<{ success: boolean; message: string }>(`/contacts/${id}`, { method: 'DELETE' }),
};

// ==================== TASKS API ====================
export const tasksApi = {
  getAll: (params?: { section?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.section) searchParams.set('section', params.section);
    const qs = searchParams.toString();
    return request<{ success: boolean; data: any[] }>(`/tasks${qs ? `?${qs}` : ''}`);
  },
  create: (data: any) => request<{ success: boolean; data: any }>('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string | number, data: any) => request<{ success: boolean; data: any }>(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string | number) => request<{ success: boolean; message: string }>(`/tasks/${id}`, { method: 'DELETE' }),
};

// ==================== VENDORS API ====================
export const vendorsApi = {
  getAll: (params?: { district?: string; status?: string; type?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.district) searchParams.set('district', params.district);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.type) searchParams.set('type', params.type);
    const qs = searchParams.toString();
    return request<{ success: boolean; data: any[] }>(`/vendors${qs ? `?${qs}` : ''}`);
  },
  create: (data: any) => request<{ success: boolean; data: any }>('/vendors', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string | number, data: any) => request<{ success: boolean; data: any }>(`/vendors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string | number) => request<{ success: boolean; message: string }>(`/vendors/${id}`, { method: 'DELETE' }),
};

// ==================== QUOTES API ====================
export const quotesApi = {
  getAll: () => request<{ success: boolean; data: any[] }>('/quotes'),
  create: (data: any) => request<{ success: boolean; data: any }>('/quotes', { method: 'POST', body: JSON.stringify(data) }),
};

// Health Check
export const checkBackendHealth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health.php`);
    return res.ok;
  } catch {
    return false;
  }
};
