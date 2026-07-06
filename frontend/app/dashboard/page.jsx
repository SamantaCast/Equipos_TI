"use client";

/* IMPORTACIONES
   Librerías, componentes, hooks, utilidades e iconos
   utilizados por el Dashboard. */

/* COMPONENTES */

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import EquipmentTable from "./components/EquipmentTable";
import Pagination from "./components/Pagination";
import EquipmentModal from "./components/EquipmentModal";

/* UTILIDADES */

import { exportarExcel } from "../utils/exportExcel";
import { exportarPDF } from "@/app/utils/exportPDF";

/* HOOKS DE REACT */

import {
  useMemo,
  useState,
  useEffect,
} from "react";

/* LIBRERÍAS */

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

/* ICONOS */

import {

  /* Acciones */

  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,

  /* Formularios */

  ClipboardList,
  ClipboardPlus,

  /* Equipos y periféricos */

  Monitor,
  Keyboard,
  Mouse,
  Dock,

  /* Usuario */

  User,

  /* Información */

  Hash,
  Shield,
  FileText,
  Tag,
  Cpu,
  Wifi,
  Laptop,
  HardDrive,

  /* Navegación */

  RefreshCw,
  ChevronDown,
  LogOut,

} from "lucide-react";


/* DATOS INICIALES
   Arreglo donde se almacenarán todos los registros
   obtenidos desde MongoDB. */

const initialData = [];


/* FORMULARIO VACÍO
   Se utiliza para crear un nuevo registro y para
   limpiar todos los campos del formulario. */

const emptyForm = {

  /* Datos generales */

  usuario: "",
  nResguardo: "",
  perfil: "",
  descripcionEquipo: "",

  /* Equipo principal */

  serie: "",
  marca: "",
  modelo: "",

  /* Monitor */

  serieMonitor: "",
  marcaMonitor: "",
  modeloMonitor: "",

  /* Teclado */

  serieTeclado: "",
  marcaTeclado: "",
  modeloTeclado: "",

  /* Mouse */

  serieMouse: "",
  marcaMouse: "",
  modeloMouse: "",

  /* Docking */

  serieDocking: "",
  marcaDocking: "",
  modeloDocking: "",

  /* Información adicional */

  candado: "",
  sistemaOperativo: "",
  procesador: "",
  conectividad: "",
  nombreEquipo: "",
  movilidad: "",

};


/* CONFIGURACIÓN DEL FORMULARIO
   Cada objeto representa un paso del asistente y
   contiene los campos que se mostrarán. */

const fieldGroups = [

  /* DATOS GENERALES */

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

  /* EQUIPO PRINCIPAL */

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

  /* MONITOR */

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

  /* TECLADO */

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

  /* MOUSE */

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

  /* DOCKING */

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

/* CONFIGURACIÓN DE LA TABLA
   Define las columnas que se mostrarán en el listado
   principal del Dashboard. */

const tableColumns = [

  /* Datos generales */

  { key: "USUARIO", label: "Usuario" },
  { key: "FOLIO", label: "Folio" },
  { key: "PERFIL", label: "Perfil" },
  { key: "DESCRIPCIÓN DEL EQUIPO", label: "Descripción" },

  /* Equipo principal */

  { key: "SERIE", label: "Serie" },
  { key: "MARCA", label: "Marca" },
  { key: "MODELO", label: "Modelo" },

  /* Monitor */

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

  /* Teclado */

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

  /* Mouse */

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

  /* Docking */

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

  /* Información adicional */

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


/* FUNCIÓN AUXILIAR
   Convierte un texto a mayúsculas y elimina los
   acentos para facilitar las búsquedas. */

const normalizar = (texto = "") => {

  return texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();

};


/* OBTENER ICONO DEL GRUPO
   Devuelve el icono correspondiente a cada grupo
   del formulario. */

const getGroupIcon = (grupo) => {

  switch (grupo) {

    /* Datos generales */

    case "Datos generales":

      return <ClipboardList size={18} />;

    /* Equipo principal */

    case "Equipo principal":

      return <Monitor size={18} />;

    /* Monitor */

    case "Monitor":

      return <Monitor size={18} />;

    /* Teclado */

    case "Teclado":

      return <Keyboard size={18} />;

    /* Mouse */

    case "Mouse":

      return <Mouse size={18} />;

    /* Docking */

    case "Docking":

      return <Dock size={18} />;

    /* Valor por defecto */

    default:

      return <ClipboardList size={18} />;

  }

};


/* OBTENER ICONO DEL CAMPO
   Devuelve el icono correspondiente a cada campo
   del formulario. */

const getFieldIcon = (campo) => {

  switch (campo) {

    /* Usuario */

    case "usuario":

      return <User size={16} />;

    /* Número de resguardo */

    case "nResguardo":

      return <Hash size={16} />;

    /* Serie */

    case "serie":

      return <Tag size={16} />;

    /* Procesador */

    case "procesador":

      return <Cpu size={16} />;

    /* Conectividad */

    case "conectividad":

      return <Wifi size={16} />;

    /* Movilidad */

    case "movilidad":

      return <Laptop size={16} />;

    /* Candado */

    case "candado":

      return <Shield size={16} />;

    /* Valor por defecto */

    default:

      return <FileText size={16} />;

  }

};


/* COMPONENTE PRINCIPAL */

/**
 * Componente principal del Dashboard.
 * Administra la información, filtros, paginación
 * y operaciones del sistema.
*/

export default function DashboardPage() {

  /* NAVEGACIÓN */

  // Permite redireccionar entre páginas.
  const router = useRouter();


  /* ESTADOS
     Información utilizada por el Dashboard.
  */

  /* REGISTROS */

  // Información obtenida desde la base de datos.
  const [data, setData] = useState([]);


  /* BÚSQUEDA */

  // Texto utilizado para la búsqueda general.
  const [query, setQuery] = useState("");


  /* FILTROS */

  // Filtro por perfil.
  const [perfilFilter, setPerfilFilter] =
    useState("Todos");

  // Filtro por movilidad.
  const [movilidadFilter, setMovilidadFilter] =
    useState("Todos");

  // Filtro por candado.
  const [candadoFilter, setCandadoFilter] =
    useState("Todos");

  // Filtro por modelo.
  const [modeloFilter, setModeloFilter] =
    useState("Todos");

  // Filtro por folio de resguardo.
  const [resguardoFilter, setResguardoFilter] =
    useState("Todos");

  // Filtro por serie del monitor.
  const [serieMonitorFilter, setSerieMonitorFilter] =
    useState("Todos");

  // Filtro por serie del mouse.
  const [serieMouseFilter, setSerieMouseFilter] =
    useState("Todos");

  // Filtro por modelo del teclado.
  const [modeloTecladoFilter, setModeloTecladoFilter] =
    useState("Todos");

  // Filtro por conectividad.
  const [conectividadFilter, setConectividadFilter] =
    useState("Todos");


  /* FORMULARIO */

  // Controla la visibilidad del formulario.
  const [showForm, setShowForm] =
    useState(false);

  // Identificador del registro en edición.
  const [editingId, setEditingId] =
    useState(null);

  // Información capturada en el formulario.
  const [form, setForm] =
    useState(emptyForm);

  // Paso actual del formulario.
  const [pasoActual, setPasoActual] =
    useState(1);


  /* PAGINACIÓN */

  // Página actual.
  const [currentPage, setCurrentPage] =
    useState(1);

  // Cantidad de registros mostrados por página.
  const [registrosPorPagina, setRegistrosPorPagina] =
    useState(15);


  /* SESIÓN */

  // Información del usuario autenticado.
  const [usuario, setUsuario] =
    useState(null);

  // Controla la visualización del menú del usuario.
  const [mostrarMenu, setMostrarMenu] =
    useState(false);

  // Evita problemas de hidratación.
  const [mounted, setMounted] =
    useState(false);

  // Indica si el usuario tiene acceso al Dashboard.
  const [autorizado, setAutorizado] =
    useState(false);


  /* EFECTOS */

  /* MONTAR COMPONENTE
     Evita errores de hidratación y habilita el
     renderizado de elementos del cliente. */

  useEffect(() => {

    setMounted(true);

  }, []);


  /* RECUPERAR USUARIO
     Obtiene la información almacenada durante el
     inicio de sesión. */

  useEffect(() => {

    // Obtiene el token y el usuario almacenados.
    const token = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");

    // Verifica que exista una sesión válida.
    if (!token || !usuarioGuardado) {

      router.replace("/");

      return;

    }

    try {

      // Recupera la información del usuario.
      setUsuario(
        JSON.parse(usuarioGuardado)
      );

      // Autoriza el acceso al Dashboard.
      setAutorizado(true);

    } catch {

      // Elimina la información inválida.
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");

      // Regresa al inicio de sesión.
      router.replace("/");

    }

  }, [router]);


  /* CARGAR REGISTROS
     Obtiene la información cuando el usuario ya
     fue autorizado. */

  useEffect(() => {

    if (autorizado) {

      obtenerEquipos();

    }

  }, [autorizado]);


  /* FILTRADO DE REGISTROS
     Aplica la búsqueda general y todos los filtros. */

  const filteredData = useMemo(() => {

    return data

      .filter((item) => {

        /* BÚSQUEDA GENERAL */

        const matchesQuery = normalizar(

          Object.values(item).join(" ")

        ).includes(

          normalizar(query)

        );

        /* FILTROS */

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
          String(item["FOLIO"]) ===
          String(resguardoFilter);

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

        // Devuelve únicamente los registros que cumplen
        // con todos los filtros.
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

      // Ordena los registros por usuario.
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


  /* PAGINACIÓN
     Calcula las páginas y los registros visibles. */

  // Total de páginas.
  const totalPages = Math.ceil(
    filteredData.length / registrosPorPagina
  );

  // Índice inicial.
  const startIndex =
    (currentPage - 1) * registrosPorPagina;

  // Índice final.
  const endIndex =
    startIndex + registrosPorPagina;

  // Registros visibles.
  const currentRecords =
    filteredData.slice(
      startIndex,
      endIndex
    );


  /* VALIDAR PÁGINA
     Evita que la página actual quede fuera del
     rango disponible. */

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



/* REINICIAR PAGINACIÓN
   Cuando cambia un filtro o la búsqueda, el
   listado vuelve automáticamente a la primera
   página. */

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


/* ACTUALIZAR PAGINACIÓN
   Reinicia la página actual cuando cambia la
   cantidad de registros mostrados. */

useEffect(() => {

  setCurrentPage(1);

}, [

  registrosPorPagina,

]);


/* OBTENER REGISTROS
   Consulta todos los equipos almacenados en
   MongoDB. */

const obtenerEquipos = async () => {

  try {

    /* MOSTRAR URL DE LA API */

    console.log(
      "API:",
      process.env.NEXT_PUBLIC_API_URL
    );

    /* CONSTRUIR URL */

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/equipos`;

    console.log(
      "URL:",
      url
    );

    /* OBTENER TOKEN */

    const token =
      localStorage.getItem("token");

    /* CONSULTAR API */

    const respuesta = await fetch(url, {

      headers: {

        Authorization: `Bearer ${token}`,

      },

    });

    console.log(
      "Status:",
      respuesta.status
    );

    /* OBTENER DATOS */

    const datos =
      await respuesta.json();

    console.log(datos);

    /* ACTUALIZAR ESTADO */

    setData(datos);

  } catch (error) {

    /* MANEJO DE ERRORES */

    console.error(error);

  }

};


/* CERRAR SESIÓN
   Elimina la información almacenada del usuario
   y regresa a la pantalla de inicio de sesión. */

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

    /* VALIDAR CONFIRMACIÓN */

    if (!result.isConfirmed) return;

    /* ELIMINAR SESIÓN */

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    /* REDIRECCIONAR */

    router.push("/");

  });

};


/* NUEVO REGISTRO
   Limpia el formulario para capturar un nuevo
   equipo. */

const openNewForm = () => {

  /* Reinicia el modo edición */

  setEditingId(null);

  /* Limpia el formulario */

  setForm(emptyForm);

  /* Regresa al primer paso */

  setPasoActual(1);

  /* Muestra el formulario */

  setShowForm(true);

};


/* EDITAR REGISTRO
   Carga la información del registro seleccionado
   dentro del formulario para permitir su edición. */

const openEditForm = (item) => {

  /* REINICIAR FORMULARIO */

  // Regresa al primer paso del asistente.
  setPasoActual(1);

  // Guarda el identificador del registro.
  setEditingId(item._id);

  /* CARGAR INFORMACIÓN */

  // Copia la información del registro seleccionado
  // al formulario.
  setForm({

    /* Datos generales */

    usuario: item["USUARIO"] || "",
    nResguardo: item["N° RESGUARDO"] || "",
    perfil: item["PERFIL"] || "",
    descripcionEquipo:
      item["DESCRIPCIÓN DEL EQUIPO"] || "",

    /* Equipo principal */

    serie: item["SERIE"] || "",
    marca: item["MARCA"] || "",
    modelo: item["MODELO"] || "",

    /* Monitor */

    serieMonitor:
      item["SERIE MONITOR"] || "",

    marcaMonitor:
      item["MARCA MONITOR"] || "",

    modeloMonitor:
      item["MODELO MONITOR"] || "",

    /* Teclado */

    serieTeclado:
      item["SERIE TECLADO"] || "",

    marcaTeclado:
      item["MARCA TECLADO"] || "",

    modeloTeclado:
      item["MODELO TECLADO"] || "",

    /* Mouse */

    serieMouse:
      item["SERIE MOUSE"] || "",

    marcaMouse:
      item["MARCA MOUSE"] || "",

    modeloMouse:
      item["MODELO MOUSE"] || "",

    /* Docking */

    serieDocking:
      item["SERIE DOCKING"] || "",

    marcaDocking:
      item["MARCA DOCKING"] || "",

    modeloDocking:
      item["MODELO DOCKING"] || "",

    /* Información adicional */

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

  /* MOSTRAR FORMULARIO */

  setShowForm(true);

};


/* CERRAR FORMULARIO
   Restablece el estado inicial del formulario. */

const closeForm = () => {

  /* Oculta el formulario */

  setShowForm(false);

  /* Limpia el modo edición */

  setEditingId(null);

  /* Regresa al primer paso */

  setPasoActual(1);

  /* Restablece el formulario */

  setForm(emptyForm);

};


/* GUARDAR REGISTRO
   Crea un nuevo registro o actualiza uno existente
   dependiendo del modo del formulario. */

const handleSave = async () => {

  /* Variable utilizada para la alerta de carga */

  let cargando;

  /* VALIDAR CAMPO OBLIGATORIO */

  // Verifica que el usuario haya sido capturado.
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

    /* PREPARAR INFORMACIÓN */

    // Construye el objeto que será enviado a MongoDB.
    const registroMongo = {

      /* Datos generales */

      "USUARIO": form.usuario,
      "N° RESGUARDO": form.nResguardo,
      "PERFIL": form.perfil,
      "DESCRIPCIÓN DEL EQUIPO": form.descripcionEquipo,

      /* Equipo principal */

      "SERIE": form.serie,
      "MARCA": form.marca,
      "MODELO": form.modelo,

      /* Monitor */

      "SERIE MONITOR": form.serieMonitor,
      "MARCA MONITOR": form.marcaMonitor,
      "MODELO MONITOR": form.modeloMonitor,

      /* Teclado */

      "SERIE TECLADO": form.serieTeclado,
      "MARCA TECLADO": form.marcaTeclado,
      "MODELO TECLADO": form.modeloTeclado,

      /* Mouse */

      "SERIE MOUSE": form.serieMouse,
      "MARCA MOUSE": form.marcaMouse,
      "MODELO MOUSE": form.modeloMouse,

      /* Docking */

      "SERIE DOCKING": form.serieDocking,
      "MARCA DOCKING": form.marcaDocking,
      "MODELO DOCKING": form.modeloDocking,

      /* Información adicional */

      "CANDADO": form.candado,
      "SISTEMA OPERATIVO": form.sistemaOperativo,
      "PROCESADOR": form.procesador,
      "CONECTIVIDAD": form.conectividad,
      "NOMBRE DEL EQUIPO": form.nombreEquipo,
      "MOVILIDAD": form.movilidad,

      /* Columna reservada */

      "Columna1": ""

    };

    /* MOSTRAR CARGANDO */

    // Muestra una alerta de carga si la operación
    // tarda más de un segundo.
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


    /* NUEVO REGISTRO */

    // Si no existe un ID, se crea un nuevo registro.
    if (editingId === null) {

      /* Enviar información */

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

      /* Obtener respuesta */

      const resultado = await respuesta.json();

      /* Actualizar información local */

      setData((prev) => [

        ...prev,

        {

          ...registroMongo,

          _id: resultado.insertedId,

        },

      ]);

    }


    /* ACTUALIZAR REGISTRO */

    // Si existe un ID, se actualiza el registro.
    else {

      /* Enviar actualización */

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

      /* Actualizar información local */

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


    /* FINALIZAR PROCESO */

    // Detiene el temporizador de carga.
    clearTimeout(cargando);

    // Cierra la alerta de carga.
    Swal.close();

    // Muestra el mensaje de éxito.
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

    // Restablece el formulario.
    closeForm();

  }

  /* MANEJO DE ERRORES */

  catch (error) {

    // Muestra el error en consola.
    console.error(error);

    // Detiene el temporizador de carga.
    clearTimeout(cargando);

    // Cierra la alerta de carga.
    Swal.close();

    // Informa al usuario que ocurrió un error.
    Swal.fire({

      icon: "error",
      title: "Error",
      text: "Ocurrió un error al guardar el registro.",
      confirmButtonColor: "#8b1e3f",
      confirmButtonText: "Aceptar",

    });

  }

};


/* ELIMINAR REGISTRO
   Solicita confirmación y elimina el registro
   seleccionado de la base de datos. */

const handleDelete = async (id) => {

  /* SOLICITAR CONFIRMACIÓN */

  // Muestra un mensaje de confirmación antes
  // de eliminar el registro.
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

  /* VALIDAR CONFIRMACIÓN */

  if (!resultado.isConfirmed) {

    return;

  }

  try {

    /* ELIMINAR REGISTRO */

    // Envía la solicitud para eliminar el registro.
    await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/api/equipos/${id}`,

      {

        method: "DELETE",

      }

    );

    /* ACTUALIZAR INFORMACIÓN */

    // Elimina el registro de la tabla sin volver
    // a consultar la base de datos.
    setData((prev) =>

      prev.filter((item) => item._id !== id)

    );

    /* MENSAJE DE ÉXITO */

    Swal.fire({

      icon: "success",
      title: "Registro eliminado",
      text: "El registro fue eliminado correctamente.",
      confirmButtonColor: "#8b1e3f",
      confirmButtonText: "Aceptar",

    });

  }

  /* MANEJO DE ERRORES */

  catch (error) {

    // Muestra el error en consola.
    console.error(error);

    // Informa al usuario que ocurrió un error.
    Swal.fire({

      icon: "error",
      title: "Error",
      text: "No fue posible eliminar el registro.",
      confirmButtonColor: "#8b1e3f",
      confirmButtonText: "Aceptar",

    });

  }

};


/* EXPORTAR A EXCEL
   Exporta los registros filtrados a un archivo
   de Microsoft Excel. */

const descargarExcel = async () => {

  await exportarExcel(filteredData);

};


/* EXPORTAR A PDF
   Exporta los registros filtrados a un archivo PDF. */

const descargarPDF = async () => {

  await exportarPDF(filteredData);

};


/* RENDERIZAR CAMPO
   Genera dinámicamente cada campo del formulario
   dependiendo de su tipo (texto o lista). */

const renderField = (field) => {

  /* CAMPOS TIPO SELECT */

  if (field.type === "select") {

    return (

      <label
        key={field.key}
        className="dash-field"
      >

        {/* Etiqueta del campo */}

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

            {/* Opciones disponibles */}

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

  /* CAMPOS TIPO TEXTO */

  return (

    <label
      key={field.key}
      className="dash-field"
    >

      {/* Etiqueta del campo */}

      <span>

        {field.label}

      </span>

      {/* Contenedor del control */}

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


/* OPCIONES DE LOS FILTROS
   Se generan automáticamente a partir de la
   información obtenida desde la base de datos. */

/* MODELO */

const opcionesModelo = [

  "Todos",

  ...new Set(

    data

      .map((item) => item["MODELO"])
      .filter(Boolean)

  ),

];

/* CANDADO */

const opcionesCandado = [

  "Todos",

  ...new Set(

    data

      .map((item) => item["CANDADO"])
      .filter(Boolean)

  ),

];

/* CONECTIVIDAD */

const opcionesConectividad = [

  "Todos",

  ...new Set(

    data

      .map((item) => item["CONECTIVIDAD"])
      .filter(Boolean)

  ),

];

/* MOVILIDAD */

const opcionesMovilidad = [

  "Todos",

  ...new Set(

    data

      .map((item) => item["MOVILIDAD"])
      .filter(Boolean)

  ),

];

/* FOLIO */

const opcionesFolio = [

  "Todos",

  ...data

    .map((item) => item["FOLIO"])
    .filter(Boolean)
    .sort(

      (a, b) =>

        parseInt(a, 10) - parseInt(b, 10)

    ),

];

/* SERIE MONITOR */

const opcionesSerieMonitor = [

  "Todos",

  ...new Set(

    data

      .map((item) => item["SERIE MONITOR"])
      .filter(Boolean)

  ),

];

/* SERIE MOUSE */

const opcionesSerieMouse = [

  "Todos",

  ...new Set(

    data

      .map((item) => item["SERIE MOUSE"])
      .filter(Boolean)

  ),

];

/* MODELO TECLADO */

const opcionesModeloTeclado = [

  "Todos",

  ...new Set(

    data

      .map((item) => item["MODELO TECLADO"])
      .filter(Boolean)

  ),

];


/* VALIDAR AUTORIZACIÓN
   Evita mostrar el Dashboard cuando el usuario
   no ha iniciado sesión. */

if (!autorizado) {

  return null;

}


/* INTERFAZ DEL DASHBOARD*/

return (

  <main className="dash-page">

    {/* ENCABEZADO */}

    <Header

      usuario={usuario}
      mounted={mounted}
      mostrarMenu={mostrarMenu}
      setMostrarMenu={setMostrarMenu}
      cerrarSesion={cerrarSesion}

    />

    {/* CONTENIDO PRINCIPAL */}

    <section className="dash-content">

      {/* BUSCADOR Y FILTROS */}

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

      {/* TABLA DE REGISTROS */}

      <EquipmentTable

        tableColumns={tableColumns}
        filteredData={filteredData}
        currentRecords={currentRecords}
        openEditForm={openEditForm}
        handleDelete={handleDelete}

      />

      {/* PAGINACIÓN */}

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

    {/* FORMULARIO (MODAL) */}

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