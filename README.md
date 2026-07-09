# Sistema de Gestión de Equipos de Cómputo

<<<<<<< HEAD
Sistema web desarrollado para la administración e inventario de equipos de cómputo.

Permite registrar, consultar, editar, eliminar y exportar la información de los activos informáticos mediante una interfaz moderna, intuitiva y segura.


## Vista general

El sistema fue desarrollado para facilitar la gestión del inventario de equipos de cómputo del Departamento de Informática, centralizando toda la información de los activos tecnológicos en una sola plataforma.


## Características

- Inicio de sesión seguro mediante JWT.
- Registro de equipos de cómputo.
- Edición de registros.
- Eliminación de registros.
- Búsqueda general en tiempo real.
- Filtros dinámicos.
- Paginación configurable.
- Exportación a Excel.
- Exportación a PDF.
- Diseño responsive.
- Interfaz moderna desarrollada con Next.js.

=======
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
>>>>>>> 66a2801 (Eliminacion de React)

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

<<<<<<< HEAD

# Estructura del proyecto

```text
Equipos_TI/

=======
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
>>>>>>> 66a2801 (Eliminacion de React)
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
<<<<<<< HEAD
│   ├── server.js
│   └── package.json
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
│   │   └── logos/
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```


# Instalación

## Clonar el repositorio

```bash
git clone https://github.com/SamantaCast/Equipos_TI.git
```

Entrar al proyecto

```bash
cd Equipos_TI
```


# Instalar dependencias

## Backend

```bash
cd backend

npm install
```

## Frontend

```bash
cd frontend

npm install
```


# Variables de entorno

## Backend

Crear un archivo:

```text
backend/.env
```

Ejemplo:

```env
PORT=5000

MONGODB_URI=TU_CADENA_DE_CONEXION

JWT_SECRET=TU_CLAVE_SECRETA
```


=======
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

>>>>>>> 66a2801 (Eliminacion de React)
## Frontend

Crear un archivo:

<<<<<<< HEAD
```text
frontend/.env.local
```

Ejemplo:
=======
```
frontend/.env.local
```

Contenido:
>>>>>>> 66a2801 (Eliminacion de React)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

<<<<<<< HEAD
=======
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
>>>>>>> 66a2801 (Eliminacion de React)

# Ejecutar el proyecto

## Backend

```bash
<<<<<<< HEAD
npm run dev
=======
cd backend

npm start
>>>>>>> 66a2801 (Eliminacion de React)
```

o

```bash
<<<<<<< HEAD
npm start
```

=======
npm run dev
```

---
>>>>>>> 66a2801 (Eliminacion de React)

## Frontend

```bash
<<<<<<< HEAD
npm run dev
```


# Funcionalidades

## Gestión de equipos

- Registrar equipos.
- Editar información.
- Eliminar registros.
- Consultar inventario.
- Búsqueda inteligente.
- Filtros dinámicos.
- Paginación configurable.


## Reportes

El sistema permite generar reportes profesionales en:
=======
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
>>>>>>> 66a2801 (Eliminacion de React)

- Excel (.xlsx)
- PDF (.pdf)

Incluyendo:

- Logos institucionales.
- Fecha y hora de generación.
- Total de registros.
<<<<<<< HEAD
- Encabezados personalizados.
- Diseño optimizado para impresión.


# Seguridad

- Autenticación mediante JWT.
- Protección de rutas.
- Almacenamiento seguro del token.
- Validación de credenciales.


# Autor

Desarrolladora del Sistema de Gestión de Equipos de Cómputo.

Proyecto desarrollado para el **Departamento de Informática** de **Leche para el Bienestar S.A. de C.V.**

# Licencia

Proyecto desarrollado para uso interno del Departamento de Informática de Leche para el Bienestar S.A. de C.V.
=======
- Diseño profesional para impresión.

---

# Autor

Departamento de Informática

Leche para el Bienestar S.A. de C.V.

---

# Licencia

Este proyecto fue desarrollado para uso interno de la organización.
>>>>>>> 66a2801 (Eliminacion de React)
