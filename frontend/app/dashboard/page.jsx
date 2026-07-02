"use client";

/* ==================================================
   IMPORTACIONES
   Librerías, iconos y dependencias utilizadas por
   el Dashboard.
================================================== */

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import EquipmentTable from "./components/EquipmentTable";
import Pagination from "./components/Pagination";
import EquipmentModal from "./components/EquipmentModal";

import { exportarExcel } from "../utils/exportExcel";
import { exportarPDF } from "@/app/utils/exportPDF";

import {
  useMemo,
  useState,
  useEffect,
} from "react";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


import {

  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,

  ClipboardList,
  ClipboardPlus,

  Monitor,
  Keyboard,
  Mouse,
  Dock,

  User,

  Hash,
  Shield,
  FileText,
  Tag,
  Cpu,
  Wifi,
  Laptop,
  HardDrive,

  RefreshCw,
  ChevronDown,
  LogOut,

} from "lucide-react";






/* ==================================================
   DATOS INICIALES
   Arreglo donde se almacenarán todos los registros
   obtenidos desde MongoDB.
================================================== */

const initialData = [];

/* ==================================================
   FORMULARIO VACÍO
   Se utiliza al crear un registro nuevo y también
   para limpiar el formulario.
================================================== */

const emptyForm = {

  usuario: "",
  nResguardo: "",
  perfil: "",
  descripcionEquipo: "",

  serie: "",
  marca: "",
  modelo: "",

  serieMonitor: "",
  marcaMonitor: "",
  modeloMonitor: "",

  serieTeclado: "",
  marcaTeclado: "",
  modeloTeclado: "",

  serieMouse: "",
  marcaMouse: "",
  modeloMouse: "",

  serieDocking: "",
  marcaDocking: "",
  modeloDocking: "",

  candado: "",
  sistemaOperativo: "",
  procesador: "",
  conectividad: "",
  nombreEquipo: "",
  movilidad: "",

};

/* ==================================================
   CONFIGURACIÓN DEL FORMULARIO
   Cada objeto representa un paso del asistente y
   contiene los campos que se mostrarán.
================================================== */

const fieldGroups = [

  /* ===============================================
     DATOS GENERALES
  ================================================ */

  {
    title: "Datos generales",

    fields: [

      {
        key: "usuario",
        label: "Usuario",
        type: "text",
      },

      {
        key: "nResguardo",
        label: "N° resguardo",
        type: "text",
      },

      {
        key: "perfil",
        label: "Perfil",
        type: "text",
      },

      {
        key: "nombreEquipo",
        label: "Nombre del equipo",
        type: "text",
      },

      {
        key: "descripcionEquipo",
        label: "Descripción del equipo",
        type: "text",
      },

    ],

  },

  /* ===============================================
     EQUIPO PRINCIPAL
  ================================================ */

  {

    title: "Equipo principal",

    fields: [

      {
        key: "serie",
        label: "Serie",
        type: "text",
      },

      {
        key: "marca",
        label: "Marca",
        type: "text",
      },

      {
        key: "modelo",
        label: "Modelo",
        type: "text",
      },

      {
        key: "sistemaOperativo",
        label: "Sistema operativo",
        type: "text",
      },

      {
        key: "procesador",
        label: "Procesador",
        type: "text",
      },

      {
        key: "conectividad",
        label: "Conectividad",
        type: "select",
        options: [
          "WI-FI",
          "ETHERNET",
          "SIN CONEXIÓN",
        ],
      },

      {
        key: "candado",
        label: "Candado",
        type: "select",
        options: [
          "Sí",
          "No",
        ],
      },

      {
        key: "movilidad",
        label: "Movilidad",
        type: "select",
        options: [
          "PORTATIL",
          "ESCRITORIO",
        ],
      },

    ],

  },

  /* ===============================================
     MONITOR
  ================================================ */

  {

    title: "Monitor",

    fields: [

      {
        key: "serieMonitor",
        label: "Serie monitor",
        type: "text",
      },

      {
        key: "marcaMonitor",
        label: "Marca monitor",
        type: "text",
      },

      {
        key: "modeloMonitor",
        label: "Modelo monitor",
        type: "text",
      },

    ],

  },

  /* ===============================================
     TECLADO
  ================================================ */

  {

    title: "Teclado",

    fields: [

      {
        key: "serieTeclado",
        label: "Serie teclado",
        type: "text",
      },

      {
        key: "marcaTeclado",
        label: "Marca teclado",
        type: "text",
      },

      {
        key: "modeloTeclado",
        label: "Modelo teclado",
        type: "text",
      },

    ],

  },

  /* ===============================================
     MOUSE
  ================================================ */

  {

    title: "Mouse",

    fields: [

      {
        key: "serieMouse",
        label: "Serie mouse",
        type: "text",
      },

      {
        key: "marcaMouse",
        label: "Marca mouse",
        type: "text",
      },

      {
        key: "modeloMouse",
        label: "Modelo mouse",
        type: "text",
      },

    ],

  },

  /* ===============================================
     DOCKING
  ================================================ */

  {

    title: "Docking",

    fields: [

      {
        key: "serieDocking",
        label: "Serie docking",
        type: "text",
      },

      {
        key: "marcaDocking",
        label: "Marca docking",
        type: "text",
      },

      {
        key: "modeloDocking",
        label: "Modelo docking",
        type: "text",
      },

    ],

  },

];

/* ==================================================
   CONFIGURACIÓN DE LA TABLA
   Define las columnas mostradas en el listado
   principal.
================================================== */

/* ==================================================
   COLUMNAS DE LA TABLA
   Define las columnas que se mostrarán en el listado.
================================================== */

const tableColumns = [

  { key: "USUARIO", label: "Usuario" },

  { key: "FOLIO", label: "Folio" },

  { key: "PERFIL", label: "Perfil" },

  { key: "DESCRIPCIÓN DEL EQUIPO", label: "Descripción" },

  { key: "SERIE", label: "Serie" },

  { key: "MARCA", label: "Marca" },

  { key: "MODELO", label: "Modelo" },

  {
    key: "SERIE MONITOR",
    label: "Serie Monitor",
  },

  {
    key: "MARCA MONITOR",
    label: "Marca Monitor",
  },

  {
    key: "MODELO MONITOR",
    label: "Modelo Monitor",
  },

  {
    key: "SERIE TECLADO",
    label: "Serie Teclado",
  },

  {
    key: "MARCA TECLADO",
    label: "Marca Teclado",
  },

  {
    key: "MODELO TECLADO",
    label: "Modelo Teclado",
  },

  {
    key: "SERIE MOUSE",
    label: "Serie Mouse",
  },

  {
    key: "MARCA MOUSE",
    label: "Marca Mouse",
  },

  {
    key: "MODELO MOUSE",
    label: "Modelo Mouse",
  },

  {
    key: "SERIE DOCKING",
    label: "Serie Docking",
  },

  {
    key: "MARCA DOCKING",
    label: "Marca Docking",
  },

  {
    key: "MODELO DOCKING",
    label: "Modelo Docking",
  },

  { key: "CANDADO", label: "Candado" },

  {
    key: "SISTEMA OPERATIVO",
    label: "S. O.",
  },

  {
    key: "PROCESADOR",
    label: "Procesador",
  },

  {
    key: "CONECTIVIDAD",
    label: "Conectividad",
  },

  {
    key: "NOMBRE DEL EQUIPO",
    label: "Nombre del equipo",
  },

  {
    key: "MOVILIDAD",
    label: "Movilidad",
  },

];

/* ==================================================
   FUNCIÓN AUXILIAR
   Convierte texto a mayúsculas y elimina acentos
   para facilitar las búsquedas.
================================================== */

const normalizar = (texto = "") => {

  return texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();

};

//comentar
const getGroupIcon = (grupo) => {

switch(grupo){

case "Datos generales":
return <ClipboardList size={18}/>;

case "Equipo principal":
return <Monitor size={18}/>;

case "Monitor":
return <Monitor size={18}/>;

case "Teclado":
return <Keyboard size={18}/>;

case "Mouse":
return <Mouse size={18}/>;

case "Docking":
return <Dock size={18}/>;

default:
return <ClipboardList size={18}/>;

}

};

//agrega
const getFieldIcon = (campo)=>{

switch(campo){

case "usuario":
return <User size={16}/>;

case "nResguardo":
return <Hash size={16}/>;

case "serie":
return <Tag size={16}/>;

case "procesador":
return <Cpu size={16}/>;

case "conectividad":
return <Wifi size={16}/>;

case "movilidad":
return <Laptop size={16}/>;

case "candado":
return <Shield size={16}/>;

default:
return <FileText size={16}/>;

}

};

/* ==================================================
   COMPONENTE PRINCIPAL
================================================== */

export default function DashboardPage() {
    const router = useRouter();

  /* ==================================================
     ESTADOS
     Información del Dashboard.
  ================================================== */

  const [data, setData] = useState([]);

  const [query, setQuery] = useState("");

  const [perfilFilter, setPerfilFilter] =
    useState("Todos");

  const [movilidadFilter, setMovilidadFilter] =
    useState("Todos");

  const [candadoFilter, setCandadoFilter] =
    useState("Todos");

  const [modeloFilter, setModeloFilter] =
    useState("Todos");

  const [resguardoFilter, setResguardoFilter] =
    useState("Todos");

  const [serieMonitorFilter, setSerieMonitorFilter] =
    useState("Todos");

  const [serieMouseFilter, setSerieMouseFilter] =
    useState("Todos");

  const [modeloTecladoFilter, setModeloTecladoFilter] =
    useState("Todos");

  const [conectividadFilter, setConectividadFilter] =
    useState("Todos");

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState(emptyForm);

  const [pasoActual, setPasoActual] =
    useState(1);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [usuario, setUsuario] =
    useState(null);

  const [mostrarMenu, setMostrarMenu] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

  /* ==================================================
     CONFIGURACIÓN DE PAGINACIÓN
  ================================================== */

const [registrosPorPagina, setRegistrosPorPagina] = useState(15);
  /* ==================================================
   EFECTOS
================================================== */

/* ===============================================
   MONTAR COMPONENTE
   Evita errores de hidratación y habilita el
   renderizado de elementos dependientes del cliente.
================================================== */

useEffect(() => {

  setMounted(true);

}, []);

/* ===============================================
   RECUPERAR USUARIO
   Obtiene la información almacenada durante el
   inicio de sesión.
================================================== */

useEffect(() => {

  const usuarioGuardado = localStorage.getItem(
    "usuario"
  );

  if (!usuarioGuardado) {

    return;

  }

  try {

    setUsuario(
      JSON.parse(usuarioGuardado)
    );

  }

  catch {

    localStorage.removeItem(
      "usuario"
    );

  }

}, []);

/* ===============================================
   CARGAR REGISTROS
   Consulta todos los equipos registrados al
   iniciar el Dashboard.
================================================== */

useEffect(() => {

  obtenerEquipos();

}, []);
/* ==================================================
   FILTRADO DE REGISTROS
   Aplica la búsqueda general y todos los filtros.
================================================== */

const filteredData = useMemo(() => {

  return data

    .filter((item) => {

      const matchesQuery = normalizar(

        Object.values(item).join(" ")

      ).includes(

        normalizar(query)

      );

      const matchesPerfil =
        perfilFilter === "Todos" ||
        normalizar(item["PERFIL"]) ===
        normalizar(perfilFilter);

      const matchesMovilidad =
        movilidadFilter === "Todos" ||
        normalizar(item["MOVILIDAD"]) ===
        normalizar(movilidadFilter);

      const matchesCandado =
        candadoFilter === "Todos" ||
        normalizar(item["CANDADO"]) ===
        normalizar(candadoFilter);

      const matchesModelo =
        modeloFilter === "Todos" ||
        normalizar(item["MODELO"]) ===
        normalizar(modeloFilter);

      const matchesConectividad =
        conectividadFilter === "Todos" ||
        normalizar(item["CONECTIVIDAD"]) ===
        normalizar(conectividadFilter);

      const matchesResguardo =
  resguardoFilter === "Todos" ||
  String(item["FOLIO"]) === String(resguardoFilter);

      const matchesSerieMonitor =
        serieMonitorFilter === "Todos" ||
        normalizar(item["SERIE MONITOR"]) ===
        normalizar(serieMonitorFilter);

      const matchesSerieMouse =
        serieMouseFilter === "Todos" ||
        normalizar(item["SERIE MOUSE"]) ===
        normalizar(serieMouseFilter);

      const matchesModeloTeclado =
        modeloTecladoFilter === "Todos" ||
        normalizar(item["MODELO TECLADO"]) ===
        normalizar(modeloTecladoFilter);

      return (

        matchesQuery &&
        matchesPerfil &&
        matchesMovilidad &&
        matchesCandado &&
        matchesModelo &&
        matchesConectividad &&
        matchesResguardo &&
        matchesSerieMonitor &&
        matchesSerieMouse &&
        matchesModeloTeclado

      );

    })

    .sort((a, b) =>
      a["USUARIO"]?.localeCompare(
        b["USUARIO"]
      )
    );

}, [

  data,

  query,

  perfilFilter,

  movilidadFilter,

  candadoFilter,

  modeloFilter,

  conectividadFilter,

  resguardoFilter,

  serieMonitorFilter,

  serieMouseFilter,

  modeloTecladoFilter,

]);

/* ==================================================
   PAGINACIÓN
   Calcula las páginas y los registros que se
   mostrarán en la página actual.
================================================== */
const totalPages = Math.ceil(
    filteredData.length / registrosPorPagina
);

const startIndex =
    (currentPage - 1) * registrosPorPagina;

const endIndex =
    startIndex + registrosPorPagina;

const currentRecords =
    filteredData.slice(
        startIndex,
        endIndex
    );
/* ===============================================
   VALIDAR PÁGINA
   Si los filtros reducen la cantidad de registros,
   evita que la página actual quede fuera del rango.
================================================== */

useEffect(() => {

  if (

    currentPage > totalPages &&
    totalPages > 0

  ) {

    setCurrentPage(totalPages);

  }

}, [

  currentPage,

  totalPages,

]);

/* ===============================================
   REINICIAR PAGINACIÓN
   Cuando cambia un filtro o la búsqueda se vuelve
   automáticamente a la primera página.
================================================== */

useEffect(() => {

    setCurrentPage(1);

}, [

    query,
    perfilFilter,
    modeloFilter,
    candadoFilter,
    conectividadFilter,
    movilidadFilter,
    resguardoFilter,
    serieMonitorFilter,
    serieMouseFilter,
    modeloTecladoFilter,

]);

useEffect(() => {

    setCurrentPage(1);

}, [registrosPorPagina]);
/* ==================================================
   OBTENER REGISTROS
   Consulta todos los equipos almacenados en MongoDB.
================================================== */

const obtenerEquipos = async () => {
  try {

    console.log("API:", process.env.NEXT_PUBLIC_API_URL);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/equipos`;

    console.log("URL:", url);

    const respuesta = await fetch(url);

    console.log("Status:", respuesta.status);

    const datos = await respuesta.json();

    console.log(datos);

    setData(datos);

  } catch (error) {

    console.error(error);

  }
};

/* ==================================================
   CERRAR SESIÓN
   Elimina la información del usuario almacenada y
   regresa a la pantalla de inicio de sesión.
================================================== */

const cerrarSesion = () => {

  Swal.fire({

    title: "Cerrar sesión",

    text: "¿Desea salir del sistema?",

    icon: "question",

    showCancelButton: true,

    confirmButtonText: "Sí",

    cancelButtonText: "Cancelar",

    confirmButtonColor: "#8b1e3f",

  }).then((result) => {

    if (!result.isConfirmed) return;

    localStorage.removeItem("usuario");

    router.push("/");

  });

};

/* ==================================================
   NUEVO REGISTRO
   Limpia el formulario para capturar un nuevo equipo.
================================================== */

const openNewForm = () => {

  setEditingId(null);

  setForm(emptyForm);

  setPasoActual(1);

  setShowForm(true);

};

/* ==================================================
   EDITAR REGISTRO
   Carga la información del equipo seleccionado.
================================================== */

/* ==================================================
   EDITAR REGISTRO
   Carga la información del registro seleccionado
   dentro del formulario para su edición.
================================================== */

const openEditForm = (item) => {

  /* Ir al primer paso del formulario */

  setPasoActual(1);

  /* Guardar el ID del registro */

  setEditingId(item._id);

  /* Cargar la información */

  setForm({

    usuario: item["USUARIO"] || "",

    nResguardo: item["N° RESGUARDO"] || "",

    perfil: item["PERFIL"] || "",

    descripcionEquipo:
      item["DESCRIPCIÓN DEL EQUIPO"] || "",

    serie: item["SERIE"] || "",

    marca: item["MARCA"] || "",

    modelo: item["MODELO"] || "",

    serieMonitor:
      item["SERIE MONITOR"] || "",

    marcaMonitor:
      item["MARCA MONITOR"] || "",

    modeloMonitor:
      item["MODELO MONITOR"] || "",

    serieTeclado:
      item["SERIE TECLADO"] || "",

    marcaTeclado:
      item["MARCA TECLADO"] || "",

    modeloTeclado:
      item["MODELO TECLADO"] || "",

    serieMouse:
      item["SERIE MOUSE"] || "",

    marcaMouse:
      item["MARCA MOUSE"] || "",

    modeloMouse:
      item["MODELO MOUSE"] || "",

    serieDocking:
      item["SERIE DOCKING"] || "",

    marcaDocking:
      item["MARCA DOCKING"] || "",

    modeloDocking:
      item["MODELO DOCKING"] || "",

    candado:
      item["CANDADO"] || "",

    sistemaOperativo:
      item["SISTEMA OPERATIVO"] || "",

    procesador:
      item["PROCESADOR"] || "",

    conectividad:
      item["CONECTIVIDAD"] || "",

    nombreEquipo:
      item["NOMBRE DEL EQUIPO"] || "",

    movilidad:
      item["MOVILIDAD"] || "",

  });

  /* Mostrar el modal */

  setShowForm(true);

};

/* ==================================================
   CERRAR FORMULARIO
   Restablece el estado inicial del modal.
================================================== */

const closeForm = () => {

  setShowForm(false);

  setEditingId(null);

  setPasoActual(1);

  setForm(emptyForm);

};

/* ==================================================
   ACTUALIZAR CAMPOS DEL FORMULARIO
   Modifica el estado del formulario conforme el
   usuario captura información.
================================================== */

/* ==================================================
   GUARDAR REGISTRO
   Crea un nuevo equipo o actualiza uno existente
   dependiendo del modo del formulario.
================================================== */


























/* ==================================================
   GUARDAR REGISTRO
   Crea un nuevo registro o actualiza uno existente.
================================================== */

const handleSave = async () => {

  let cargando;

  /* ===============================================
     VALIDAR CAMPO OBLIGATORIO
  ================================================ */

  if (!String(form.usuario || "").trim()) {

    Swal.fire({

      icon: "warning",

      title: "Campo obligatorio",

      text: "Por favor, ingrese el nombre del usuario.",

      confirmButtonColor: "#8b1e3f",

      confirmButtonText: "Aceptar",

    });

    return;

  }

  try {

    /* ===========================================
       OBJETO A ENVIAR A MONGODB
    ============================================ */

    const registroMongo = {

      "USUARIO": form.usuario,
      "N° RESGUARDO": form.nResguardo,
      "PERFIL": form.perfil,
      "DESCRIPCIÓN DEL EQUIPO": form.descripcionEquipo,

      "SERIE": form.serie,
      "MARCA": form.marca,
      "MODELO": form.modelo,

      "SERIE MONITOR": form.serieMonitor,
      "MARCA MONITOR": form.marcaMonitor,
      "MODELO MONITOR": form.modeloMonitor,

      "SERIE TECLADO": form.serieTeclado,
      "MARCA TECLADO": form.marcaTeclado,
      "MODELO TECLADO": form.modeloTeclado,

      "SERIE MOUSE": form.serieMouse,
      "MARCA MOUSE": form.marcaMouse,
      "MODELO MOUSE": form.modeloMouse,

      "SERIE DOCKING": form.serieDocking,
      "MARCA DOCKING": form.marcaDocking,
      "MODELO DOCKING": form.modeloDocking,

      "CANDADO": form.candado,
      "SISTEMA OPERATIVO": form.sistemaOperativo,
      "PROCESADOR": form.procesador,
      "CONECTIVIDAD": form.conectividad,
      "NOMBRE DEL EQUIPO": form.nombreEquipo,
      "MOVILIDAD": form.movilidad,

      "Columna1": ""

    };

    /* ===========================================
       MOSTRAR CARGANDO
    ============================================ */

    cargando = setTimeout(() => {

      Swal.fire({

        title:

          editingId === null

            ? "Guardando..."

            : "Actualizando...",

        text: "Por favor, espere un momento.",

        allowOutsideClick: false,

        allowEscapeKey: false,

        showConfirmButton: false,

        didOpen: () => {

          Swal.showLoading();

        },

      });

    }, 1000);

    /* ===========================================
       NUEVO REGISTRO
    ============================================ */

    if (editingId === null) {

      const respuesta = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/equipos`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(registroMongo),

        }

      );

      const resultado = await respuesta.json();

      setData((prev) => [

        ...prev,

        {

          ...registroMongo,

          _id: resultado.insertedId,

        },

      ]);

    }

    /* ===========================================
       ACTUALIZAR REGISTRO
    ============================================ */

    else {

      await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/equipos/${editingId}`,

        {

          method: "PUT",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(registroMongo),

        }

      );

      setData((prev) =>

        prev.map((item) =>

          item._id === editingId

            ? {

                ...registroMongo,

                _id: editingId,

              }

            : item

        )

      );

    }

    /* ===========================================
       FINALIZAR
    ============================================ */

    clearTimeout(cargando);

    Swal.close();

    await Swal.fire({

      icon: "success",

      title:

        editingId === null

          ? "Registro agregado"

          : "Registro actualizado",

      text:

        editingId === null

          ? "El registro se guardó correctamente."

          : "Los cambios se guardaron correctamente.",

      confirmButtonColor: "#8b1e3f",

      confirmButtonText: "Aceptar",

    });

    closeForm();

  }

  catch (error) {

    console.error(error);

    clearTimeout(cargando);

    Swal.close();

    Swal.fire({

      icon: "error",

      title: "Error",

      text: "Ocurrió un error al guardar el registro.",

      confirmButtonColor: "#8b1e3f",

      confirmButtonText: "Aceptar",

    });

  }

};



/* ==================================================
   ELIMINAR REGISTRO
   Solicita confirmación antes de eliminar un equipo.
================================================== */

/* ==================================================
   ELIMINAR REGISTRO
   Solicita confirmación y elimina el registro
   seleccionado de la base de datos.
================================================== */

const handleDelete = async (id) => {

  /* ===============================================
     CONFIRMAR ELIMINACIÓN
  ================================================ */

  const resultado = await Swal.fire({

    title: "¿Eliminar registro?",

    text: "Esta acción no se puede deshacer.",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#8b1e3f",

    cancelButtonColor: "#6c757d",

    confirmButtonText: "Sí, eliminar",

    cancelButtonText: "Cancelar",

  });

  if (!resultado.isConfirmed) {

    return;

  }

  try {

    /* ===========================================
       ELIMINAR EN MONGODB
    ============================================ */

   await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/equipos/${id}`,
  {
  method: "DELETE",
});

    /* ===========================================
       ACTUALIZAR TABLA
    ============================================ */

    setData((prev) =>

      prev.filter((item) => item._id !== id)

    );

    /* ===========================================
       MENSAJE DE ÉXITO
    ============================================ */

    Swal.fire({

      icon: "success",

      title: "Registro eliminado",

      text: "El registro fue eliminado correctamente.",

      confirmButtonColor: "#8b1e3f",

      confirmButtonText: "Aceptar",

    });

  }

  catch (error) {

    console.error(error);

    Swal.fire({

      icon: "error",

      title: "Error",

      text: "No fue posible eliminar el registro.",

      confirmButtonColor: "#8b1e3f",

      confirmButtonText: "Aceptar",

    });

  }

};

/* ==================================================
   EXPORTAR A EXCEL
================================================== */

const descargarExcel = async () => {

  await exportarExcel(filteredData);

};

/* ==================================================
   EXPORTAR A PDF
================================================== */

const descargarPDF = async () => {

    await exportarPDF(filteredData);

};

/* ==================================================
   RENDERIZAR CAMPOS
   Genera dinámicamente cada control del formulario
   según la configuración definida en fieldGroups.
================================================== */
/* ==================================================
   RENDERIZAR CAMPO
   Genera dinámicamente cada campo del formulario
   dependiendo de su tipo (texto o lista).
================================================== */

const renderField = (field) => {

  /* ===============================================
     CAMPOS TIPO SELECT
  ================================================ */

  if (field.type === "select") {

    return (

      <label
        key={field.key}
        className="dash-field"
      >

        {/* Nombre del campo */}

        <span>

          {field.label}

        </span>

        {/* Contenedor del control */}

        <div className="dash-input-wrapper">

          {/* Icono */}

          <div className="dash-input-icon">

            {getFieldIcon(field.key)}

          </div>

          {/* Lista desplegable */}

          <select

            value={form[field.key]}

            onChange={(e) =>

              setForm({

                ...form,

                [field.key]: e.target.value,

              })

            }

            className="dash-input"

          >

            {field.options.map((option) => (

              <option

                key={option}

                value={option}

              >

                {option}

              </option>

            ))}

          </select>

        </div>

      </label>

    );

  }

  /* ===============================================
     CAMPOS DE TEXTO
  ================================================ */

  return (

    <label

      key={field.key}

      className="dash-field"

    >

      {/* Nombre del campo */}

      <span>

        {field.label}

      </span>

      {/* Contenedor */}

      <div className="dash-input-wrapper">

        {/* Icono */}

        <div className="dash-input-icon">

          {getFieldIcon(field.key)}

        </div>

        {/* Caja de texto */}

        <input

          type="text"

          value={form[field.key]}

          onChange={(e) =>

            setForm({

              ...form,

              [field.key]: e.target.value,

            })

          }

          className="dash-input"

          placeholder={`Escribe ${field.label.toLowerCase()}`}

        />

      </div>

    </label>

  );

};
/* ==================================================
   OPCIONES DE LOS FILTROS
   Se generan automáticamente a partir de la
   información obtenida desde la base de datos.
================================================== */

const opcionesModelo = [
  "Todos",
  ...new Set(
    data
      .map((item) => item["MODELO"])
      .filter(Boolean)
  ),
];

const opcionesCandado = [
  "Todos",
  ...new Set(
    data
      .map((item) => item["CANDADO"])
      .filter(Boolean)
  ),
];

const opcionesConectividad = [
  "Todos",
  ...new Set(
    data
      .map((item) => item["CONECTIVIDAD"])
      .filter(Boolean)
  ),
];

const opcionesMovilidad = [
  "Todos",
  ...new Set(
    data
      .map((item) => item["MOVILIDAD"])
      .filter(Boolean)
  ),
];

const opcionesFolio = [
  "Todos",
  ...data
    .map((item) => item["FOLIO"])
    .filter(Boolean)
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
];

const opcionesSerieMonitor = [
  "Todos",
  ...new Set(
    data
      .map((item) => item["SERIE MONITOR"])
      .filter(Boolean)
  ),
];

const opcionesSerieMouse = [
  "Todos",
  ...new Set(
    data
      .map((item) => item["SERIE MOUSE"])
      .filter(Boolean)
  ),
];

const opcionesModeloTeclado = [
  "Todos",
  ...new Set(
    data
      .map((item) => item["MODELO TECLADO"])
      .filter(Boolean)
  ),
];



  /* ==================================================
   INTERFAZ DEL DASHBOARD
================================================== */

return (

  <main className="dash-page">

    {/* ===========================================
        CONTENIDO PRINCIPAL
    ============================================ */}

        {/* =======================================
            ENCABEZADO
        ======================================== */}

        <Header

          usuario={usuario}

          mounted={mounted}

          mostrarMenu={mostrarMenu}

          setMostrarMenu={setMostrarMenu}

          cerrarSesion={cerrarSesion}

        />

        <section className="dash-content">

        {/* =======================================
            BUSCADOR Y FILTROS
        ======================================== */}

        <SearchBar

          query={query}
          setQuery={setQuery}

          perfilFilter={perfilFilter}
          setPerfilFilter={setPerfilFilter}

          modeloFilter={modeloFilter}
          setModeloFilter={setModeloFilter}

          candadoFilter={candadoFilter}
          setCandadoFilter={setCandadoFilter}

          conectividadFilter={conectividadFilter}
          setConectividadFilter={setConectividadFilter}

          movilidadFilter={movilidadFilter}
          setMovilidadFilter={setMovilidadFilter}

          resguardoFilter={resguardoFilter}
          setResguardoFilter={setResguardoFilter}

          serieMonitorFilter={serieMonitorFilter}
          setSerieMonitorFilter={setSerieMonitorFilter}

          serieMouseFilter={serieMouseFilter}
          setSerieMouseFilter={setSerieMouseFilter}

          modeloTecladoFilter={modeloTecladoFilter}
          setModeloTecladoFilter={setModeloTecladoFilter}

          opcionesModelo={opcionesModelo}
          opcionesCandado={opcionesCandado}
          opcionesConectividad={opcionesConectividad}
          opcionesMovilidad={opcionesMovilidad}
          opcionesResguardo={opcionesFolio}
          opcionesSerieMonitor={opcionesSerieMonitor}
          opcionesSerieMouse={opcionesSerieMouse}
          opcionesModeloTeclado={opcionesModeloTeclado}

          openNewForm={openNewForm}

          descargarExcel={descargarExcel}
descargarPDF={descargarPDF}

        />

        {/* =======================================
            TABLA
        ======================================== */}

        <EquipmentTable

          tableColumns={tableColumns}

          filteredData={filteredData}

          currentRecords={currentRecords}

          openEditForm={openEditForm}

          handleDelete={handleDelete}

        />

        {/* =======================================
            PAGINACIÓN
        ======================================== */}

        <Pagination
    filteredData={filteredData}
    currentRecords={currentRecords}
    currentPage={currentPage}
    totalPages={totalPages}
    startIndex={startIndex}

    registrosPorPagina={registrosPorPagina}
    setRegistrosPorPagina={setRegistrosPorPagina}

    setCurrentPage={setCurrentPage}
/>

        </section>

    {/* ===========================================
        MODAL
    ============================================ */}

    <EquipmentModal

      showForm={showForm}

      editingId={editingId}

      pasoActual={pasoActual}

      setPasoActual={setPasoActual}

      fieldGroups={fieldGroups}

      form={form}

      setForm={setForm}

      renderField={renderField}

      getGroupIcon={getGroupIcon}

      closeForm={closeForm}

      handleSave={handleSave}

    />

  </main>

);

}





