// Ruta: composables/useTasks.ts
// Composable para manejar la API de Tareas con Node.js y Nuxt 3

export const useTasks = () => {
  const config = useRuntimeConfig();
  const API_BASE = config.public.apiBaseUrl;

  const headers = {
    'Content-Type': 'application/json'
  };

  const customFetch = async (url: string, options: any = {}) => {
    const TIMEOUT_MS = 40000;

    const { data, error } = await useFetch(url, {
      ...options,
      headers,
      server: false,
      timeout: TIMEOUT_MS
    });

    if (error.value) {
      console.error('API Error:', error.value);
      throw error.value;
    }

    return data.value;
  };

  // GET /tasks
  const list = async () => {
    const url = `${API_BASE}/tasks`;
    const response = await customFetch(url, { method: 'GET' });
    return Array.isArray(response) ? response : [];
  };

  // GET /tasks/:id
  const getOne = async (id: string | number) => {
    const url = `${API_BASE}/tasks/${id}`;
    return await customFetch(url, { method: 'GET' });
  };

  // POST /tasks
  const create = async (payload: any) => {
    const body = {
      title: payload.title,
      description: payload.description || '',
      completed: payload.completed ?? false,
      date: payload.date || '',
      comments: payload.comments || '',
      tags: Array.isArray(payload.tags) ? payload.tags : []
    };

    const url = `${API_BASE}/tasks`;
    return await customFetch(url, {
      method: 'POST',
      body
    });
  };

  // PUT /tasks/:id
  const update = async (id: string | number, payload: any) => {
    const body = {
      title: payload.title ?? '',
      description: payload.description || '',
      completed: payload.completed ?? false,
      date: payload.date || '',
      comments: payload.comments || '',
      tags: Array.isArray(payload.tags) ? payload.tags : []
    };

    const url = `${API_BASE}/tasks/${id}`;
    return await customFetch(url, {
      method: 'PUT',
      body
    });
  };

  // DELETE /tasks/:id
  const remove = async (id: string | number) => {
    const url = `${API_BASE}/tasks/${id}`;
    return await customFetch(url, {
      method: 'DELETE'
    });
  };

  return { list, getOne, create, update, remove };
};