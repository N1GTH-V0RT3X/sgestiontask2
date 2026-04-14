# NodeJS 

Para instalar y ejecutar servidor ejecutar cmd en posición del archivo:


npm install
npm run dev

La API quedará en:

http://localhost:3000


1. Obtener todas las tareas

Endpoint

GET /tasks

Ejemplo

fetch("http://localhost:3001/tasks")
  .then(res => res.json())
  .then(data => console.log(data));

Respuesta

[
  {
    "id": 1,
    "title": "Ejemplo",
    "description": "Texto",
    "completed": false,
    "date": "",
    "comments": "",
    "tags": [],
    "createdAt": "...",
    "updatedAt": "..."
  }
]
2. Obtener una tarea por ID

Endpoint

GET /tasks/:id

Ejemplo

fetch("http://localhost:3001/tasks/1")
  .then(res => res.json())
  .then(data => console.log(data));

Errores

400 → ID inválido
404 → No existe
3. Crear tarea

Endpoint

POST /tasks

Body (JSON)

{
  "title": "Nueva tarea",
  "description": "Descripción opcional",
  "completed": false,
  "date": "",
  "comments": "",
  "tags": ["tag1", "tag2"]
}

Ejemplo

fetch("http://localhost:3001/tasks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Aprender Node",
    description: "Backend básico",
    tags: ["backend"]
  })
})
.then(res => res.json())
.then(data => console.log(data));

Respuesta

{
  "message": "Tarea creada correctamente.",
  "task": { ... }
}
4. Actualizar tarea

Endpoint

PUT /tasks/:id

Body (JSON)

{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "completed": true,
  "date": "",
  "comments": "",
  "tags": ["actualizado"]
}

Ejemplo

fetch("http://localhost:3001/tasks/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    completed: true
  })
})
.then(res => res.json())
.then(data => console.log(data));
5. Eliminar tarea

Endpoint

DELETE /tasks/:id

Ejemplo

fetch("http://localhost:3001/tasks/1", {
  method: "DELETE"
})
.then(res => res.json())
.then(data => console.log(data));

Respuesta

{
  "message": "Tarea eliminada correctamente.",
  "task": { ... }
}
6. Verificar API

Endpoint

GET /

Ejemplo

fetch("http://localhost:3001/")
  .then(res => res.json())
  .then(data => console.log(data));


# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

<img width="1768" height="1184" alt="image" src="https://github.com/user-attachments/assets/7bd66a1d-7946-4951-a8dd-5d8cb851dde9" />
<img width="1768" height="1184" alt="Captura de pantalla 2025-10-31 005028" src="https://github.com/user-attachments/assets/d5459c07-d979-4fb2-b1f1-4c2a88745cbd" />
<img width="2559" height="1182" alt="Captura de pantalla 2025-10-31 002558" src="https://github.com/user-attachments/assets/1bf82328-f589-476d-a82a-a4fdc1af3712" />
<img width="2553" height="1308" alt="Captura de pantalla 2025-10-31 002539" src="https://github.com/user-attachments/assets/e6a4d5fb-e998-4b0b-b43a-1dd9c34c0bde" />
<img width="1678" height="363" alt="Captura de pantalla 2025-10-31 002526" src="https://github.com/user-attachments/assets/dcb54130-f496-4f67-84f2-535366c09b27" />
<img width="2554" height="1183" alt="Captura de pantalla 2025-10-31 002512" src="https://github.com/user-attachments/assets/e115190b-87c2-4548-b257-2c3add67232f" />
<img width="2555" height="1173" alt="Captura de pantalla 2025-10-31 002457" src="https://github.com/user-attachments/assets/146ab522-2c60-4940-ab16-a794ff94090a" />
<img width="2557" height="1184" alt="Captura de pantalla 2025-10-31 002433" src="https://github.com/user-attachments/assets/32faa10e-0927-42a4-bedf-2d12a5e766ef" />
<img width="2546" height="1309" alt="Captura de pantalla 2025-10-31 002418" src="https://github.com/user-attachments/assets/c5952dba-0848-41a4-b254-005ae7ab3f21" />

