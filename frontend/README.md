# Sistema de Gestión de Equipos de Cómputo

Sistema web desarrollado para la administración e inventario de equipos de cómputo. Permite registrar, consultar, editar, eliminar y exportar información de los activos informáticos de la organización.

---

# Características

- Inicio de sesión con autenticación mediante JWT.
- Gestión completa de equipos de cómputo (CRUD).
- Búsqueda general en tiempo real.
- Filtros dinámicos por:
  - Perfil.
  - Modelo.
  - Candado.
  - Conectividad.
  - Movilidad.
  - Folio.
  - Serie del monitor.
  - Serie del mouse.
  - Modelo del teclado.
- Paginación configurable.
- Exportación a:
  - Excel (.xlsx)
  - PDF (.pdf)
- Diseño responsive.
- Interfaz moderna desarrollada con Next.js.

---

# Tecnologías utilizadas

## Frontend

- Next.js
- React
- TypeScript
- CSS
- Lucide React
- SweetAlert2
- ExcelJS
- jsPDF
- jsPDF-AutoTable

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

---

# Estructura del proyecto

```
Control-Equipos/

│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── styles/
│   ├── utils/
│   └── public/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/control-equipos.git
```

---

## 2. Instalar dependencias

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

# Variables de entorno

## Frontend

Crear un archivo:

```
frontend/.env.local
```

Contenido:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Backend

Crear un archivo:

```
backend/.env
```

Contenido:

```env
PORT=5000

MONGODB_URI=TU_CADENA_DE_CONEXIÓN

JWT_SECRET=TU_CLAVE_SECRETA
```

---

# Ejecutar el proyecto

## Backend

```bash
cd backend

npm start
```

o

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend

npm run dev
```

---

# Funcionalidades

## Autenticación

- Inicio de sesión.
- Protección mediante JWT.
- Cierre de sesión.

---

## Gestión de equipos

- Registrar equipo.
- Editar equipo.
- Eliminar equipo.
- Buscar registros.
- Filtrar información.
- Paginación.

---

## Exportación

El sistema permite generar reportes en:

- Excel (.xlsx)
- PDF (.pdf)

Incluyendo:

- Logos institucionales.
- Fecha y hora de generación.
- Total de registros.
- Diseño profesional para impresión.

---

# Autor

Departamento de Informática

Leche para el Bienestar S.A. de C.V.

---

# Licencia

Este proyecto fue desarrollado para uso interno de la organización.