# Sistema de Gestión de Equipos de Cómputo

Sistema web desarrollado para la administración e inventario de equipos de cómputo.

Permite registrar, consultar, editar, eliminar y exportar la información de los activos informáticos mediante una interfaz moderna, intuitiva y segura.

---

# Vista general

El sistema fue desarrollado para facilitar la gestión del inventario de equipos de cómputo del Departamento de Informática, centralizando toda la información de los activos tecnológicos en una sola plataforma.

---

# Características

- Inicio de sesión seguro mediante JWT.
- Registro de equipos de cómputo.
- Edición de registros.
- Eliminación de registros.
- Búsqueda general en tiempo real.
- Filtros dinámicos.
- Paginación configurable.
- Exportación a Excel (.xlsx).
- Exportación a PDF (.pdf).
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

```text
Equipos_TI/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── globals.css
│   │
│   ├── public/
│   ├── package.json
│   └── .env.local
│
├── .gitignore
└── README.md
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/SamantaCast/Equipos_TI.git
```

## 2. Entrar al proyecto

```bash
cd Equipos_TI
```

---

# Instalar dependencias

## Backend

```bash
cd backend
npm install
```

## Frontend

```bash
cd ../frontend
npm install
```

---

# Variables de entorno

## Backend

Crear el archivo:

```text
backend/.env
```

Contenido:

```env
PORT=5000

MONGODB_URI=TU_CADENA_DE_CONEXION

JWT_SECRET=TU_CLAVE_SECRETA
```

## Frontend

Crear el archivo:

```text
frontend/.env.local
```

Contenido:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

# Ejecutar el proyecto

## Backend

```bash
cd backend
npm run dev
```

o

```bash
npm start
```

## Frontend

```bash
cd frontend
npm run dev
```

---

# Funcionalidades

## Gestión de equipos

- Registrar equipos.
- Editar información.
- Eliminar registros.
- Consultar inventario.
- Búsqueda inteligente.
- Aplicación de filtros.
- Paginación configurable.

## Reportes

El sistema permite generar reportes en:

- Excel (.xlsx)
- PDF (.pdf)

Incluyendo:

- Logos institucionales.
- Fecha y hora de generación.
- Total de registros.
- Encabezados personalizados.
- Diseño optimizado para impresión.

---

# Seguridad

- Autenticación mediante JWT.
- Protección de rutas.
- Validación de credenciales.
- Almacenamiento seguro del token.

---

# Autor

Proyecto desarrollado para el **Departamento de Informática** de **Leche para el Bienestar S.A. de C.V.**

---

# Licencia

Proyecto desarrollado para uso interno del Departamento de Informática de **Leche para el Bienestar S.A. de C.V.**
