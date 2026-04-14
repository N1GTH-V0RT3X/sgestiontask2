// Ruta: composables/useTasks.ts

export const useTasks = () => { // Composable para manejar la API de Tareas 
  // Acceso a variables de entorno para seguridad
  const config = useRuntimeConfig(); // Accede a runtimeConfig 
  const API_BASE = config.public.apiBaseUrl; // Base URL de la API
  const AUTH = config.public.apiAuthToken; // Token de Autorización
  const USER_TOKEN = config.public.userToken; // Token de Usuario 

  const headers = {  // Headers comunes para todas las peticiones 
    Authorization: AUTH, // Token de Autorización en headers 
    'Content-Type': 'application/x-www-form-urlencoded' // Tipo de contenido 
  };

  // Función genérica para manejar la petición y errores (Buena Práctica DRY)
  const customFetch = async (url: string, options: any) => {
    const TIMEOUT_MS = 40000; // 40 segundos de timeout para peticiones largas
    const { data, error } = await useFetch(url, {  // Uso de useFetch de Nuxt 3 
      ...options,  // Método, body, etc.
      headers, // Headers comunes
      server: false, // CRÍTICO: Evita "socket hang up"
      timeout: TIMEOUT_MS
    });

    if (error.value) {
      console.error('API Error:', error.value);
      throw error.value;
    }
    return data.value;
  };

  // GET LIST
  const list = async () => {
    const url = `${API_BASE}/tasks?token=${USER_TOKEN}`;
    return await customFetch(url, { method: 'GET' }) as any[] ?? [];
  };
  // GET ONE
  const getOne = async (id: string) => {
    const url = `${API_BASE}/tasks/${id}?token=${USER_TOKEN}`;
    return await customFetch(url, { method: 'GET' });
  };
  // POST CREATE
  const create = async (payload: any) => {
    const body = new URLSearchParams({ 
      token: USER_TOKEN,
      title: payload.title,
      is_completed: payload.completed ? '1' : '0',
      due_date: payload.date || '',
      comments: payload.comments || '',
      description: payload.description || '',
      tags: payload.tags?.join(',') || ''
    });

    const url = `${API_BASE}/tasks`;
    return await customFetch(url, { method: 'POST', body });
  };

  // PUT UPDATE (Token y datos en Body)
  const update = async (id: string, payload: any) => {
    const body = new URLSearchParams({
      token: USER_TOKEN,
      title: payload.title,
      is_completed: payload.completed ? '1' : '0',
      due_date: payload.date || '',
      comments: payload.comments || '',
      description: payload.description || '',
      tags: payload.tags?.join(',') || ''
    });

    const url = `${API_BASE}/tasks/${id}`; 
    return await customFetch(url, { method: 'PUT', body });
  };

  // DELETE (Token en URL)
  const remove = async (id: string) => {
    const url = `${API_BASE}/tasks/${id}?token=${USER_TOKEN}`;
    return await customFetch(url, { method: 'DELETE' });
  };

  return { list, getOne, create, update, remove };
};