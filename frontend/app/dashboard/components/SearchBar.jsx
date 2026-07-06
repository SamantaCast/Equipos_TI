"use client";

/* IMPORTACIONES */

// Iconos utilizados en la barra de búsqueda, filtros y acciones.
import {
  Search,
  RefreshCw,
  Monitor,
  Shield,
  Wifi,
  Laptop,
  Hash,
  Mouse,
  Keyboard,
  ChevronDown,
  Plus,
  FileSpreadsheet,
  FileText,
} from "lucide-react";


/* COMPONENTE */

/**
 * Barra de búsqueda, filtros y acciones principales
 * del módulo de gestión de equipos.
 */
export default function SearchBar({

  /* BUSCADOR */

  // Texto de búsqueda.
  query,

  // Actualiza el texto de búsqueda.
  setQuery,


  /* FILTROS */

  // Filtro por perfil.
  perfilFilter,
  setPerfilFilter,

  // Filtro por modelo.
  modeloFilter,
  setModeloFilter,

  // Filtro por candado.
  candadoFilter,
  setCandadoFilter,

  // Filtro por conectividad.
  conectividadFilter,
  setConectividadFilter,

  // Filtro por movilidad.
  movilidadFilter,
  setMovilidadFilter,

  // Filtro por folio de resguardo.
  resguardoFilter,
  setResguardoFilter,

  // Filtro por serie del monitor.
  serieMonitorFilter,
  setSerieMonitorFilter,

  // Filtro por serie del mouse.
  serieMouseFilter,
  setSerieMouseFilter,

  // Filtro por modelo del teclado.
  modeloTecladoFilter,
  setModeloTecladoFilter,


  /* OPCIONES DE LOS FILTROS */

  opcionesModelo,
  opcionesCandado,
  opcionesConectividad,
  opcionesMovilidad,
  opcionesResguardo,
  opcionesSerieMonitor,
  opcionesSerieMouse,
  opcionesModeloTeclado,


  /* FUNCIONES */

  // Abre el formulario para registrar un equipo.
  openNewForm,

  // Exporta los registros a Excel.
  descargarExcel,

  // Exporta los registros a PDF.
  descargarPDF,

}) {

  return (

    <>

      {/* CONTENEDOR PRINCIPAL */}

      <div className="dash-filters">

        {/* TÍTULO */}

        <div className="dash-topbar">

          <div>

            <h1>
              Gestión de equipos
            </h1>

          </div>

        </div>


        {/* BARRA DE BÚSQUEDA */}

        <div className="dash-search-row">

          {/* Campo de búsqueda */}
          <label className="dash-search">

            <Search size={18} />

            <input
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Buscar en toda la tabla"
            />

          </label>

          {/* Botón para limpiar todos los filtros */}
          <button
            className="dash-refresh-btn"
            onClick={() => {

              setQuery("");
              setPerfilFilter("Todos");
              setModeloFilter("Todos");
              setCandadoFilter("Todos");
              setConectividadFilter("Todos");
              setMovilidadFilter("Todos");
              setResguardoFilter("Todos");
              setSerieMonitorFilter("Todos");
              setSerieMouseFilter("Todos");
              setModeloTecladoFilter("Todos");

            }}
            title="Restablecer filtros"
          >

            <RefreshCw size={18} />

          </button>

        </div>


        {/* FILTROS */}

        <div className="dash-filters-container">

          <div className="dash-filters-row">

            {/* FILTRO FOLIO */}

            <div className="dash-filter-card">

              <div className="dash-filter-icon">
                <Hash size={20} />
              </div>

              <div className="dash-filter-content">

                <span className="dash-filter-label">
                  Folio
                </span>

                <div className="dash-select-wrapper">

                  <select
                    value={resguardoFilter}
                    onChange={(e) =>
                      setResguardoFilter(e.target.value)
                    }
                  >

                    {opcionesResguardo.map((opcion, index) => (

                      <option
                        key={`${opcion}-${index}`}
                        value={opcion}
                      >

                        {opcion}

                      </option>

                    ))}

                  </select>

                  <ChevronDown
                    size={16}
                    className="dash-select-arrow"
                  />

                </div>

              </div>

            </div>


            {/* FILTRO MODELO */}

            <div className="dash-filter-card">

              <div className="dash-filter-icon">

                <Monitor size={20} />

              </div>

              <div className="dash-filter-content">

                <span className="dash-filter-label">
                  Modelo
                </span>

                <div className="dash-select-wrapper">

                  <select
                    value={modeloFilter}
                    onChange={(e) =>
                      setModeloFilter(e.target.value)
                    }
                  >

                    {opcionesModelo.map((opcion) => (

                      <option
                        key={opcion}
                        value={opcion}
                      >

                          {opcion}

                      </option>

                    ))}

                  </select>

                  <ChevronDown
                    size={16}
                    className="dash-select-arrow"
                  />

                </div>

              </div>

            </div>

            {/* FILTRO SERIE MONITOR */}

            <div className="dash-filter-card">

              {/* Icono del filtro */}
              <div className="dash-filter-icon">
                <Monitor size={20} />
              </div>

              {/* Contenido del filtro */}
              <div className="dash-filter-content">

                {/* Etiqueta */}
                <span className="dash-filter-label">
                  Serie monitor
                </span>

                {/* Selector */}
                <div className="dash-select-wrapper">

                  <select
                    value={serieMonitorFilter}
                    onChange={(e) =>
                      setSerieMonitorFilter(
                        e.target.value
                      )
                    }
                  >

                    {/* Opciones disponibles */}
                    {opcionesSerieMonitor.map((opcion) => (

                      <option
                        key={opcion}
                        value={opcion}
                      >

                        {opcion}

                      </option>

                    ))}

                  </select>

                  {/* Flecha del selector */}
                  <ChevronDown
                    size={16}
                    className="dash-select-arrow"
                  />

                </div>

              </div>

            </div>

            {/* FILTRO MODELO TECLADO */}

            <div className="dash-filter-card">

              {/* Icono del filtro */}
              <div className="dash-filter-icon">

                <Keyboard size={20} />

              </div>

              {/* Contenido del filtro */}
              <div className="dash-filter-content">

                {/* Etiqueta */}
                <span className="dash-filter-label">
                  Modelo teclado
                </span>

                {/* Selector */}
                <div className="dash-select-wrapper">

                  <select
                    value={modeloTecladoFilter}
                    onChange={(e) =>
                      setModeloTecladoFilter(
                        e.target.value
                      )
                    }
                  >

                    {/* Opciones disponibles */}
                    {opcionesModeloTeclado.map((opcion) => (

                      <option
                        key={opcion}
                        value={opcion}
                      >

                        {opcion}

                      </option>

                    ))}

                  </select>

                  {/* Flecha del selector */}
                  <ChevronDown
                    size={16}
                    className="dash-select-arrow"
                  />

                </div>

              </div>

            </div>

            {/* FILTRO SERIE MOUSE */}

            <div className="dash-filter-card">

              {/* Icono del filtro */}
              <div className="dash-filter-icon">
                <Mouse size={20} />
              </div>

              {/* Contenido del filtro */}
              <div className="dash-filter-content">

                {/* Etiqueta */}
                <span className="dash-filter-label">
                  Serie mouse
                </span>

                {/* Selector */}
                <div className="dash-select-wrapper">

                  <select
                    value={serieMouseFilter}
                    onChange={(e) =>
                      setSerieMouseFilter(
                        e.target.value
                      )
                    }
                  >
                    {/* Opciones disponibles */}
                    {opcionesSerieMouse.map((opcion) => (

                      <option
                        key={opcion}
                        value={opcion}
                      >
                        {opcion}

                      </option>

                    ))}

                  </select>

                  {/* Flecha del selector */}
                  <ChevronDown
                    size={16}
                    className="dash-select-arrow"
                  />

                </div>

              </div>

            </div>

            {/* FILTRO CANDADO */}

            <div className="dash-filter-card">

              {/* Icono del filtro */}
              <div className="dash-filter-icon">
                <Shield size={20} />
              </div>

              {/* Contenido del filtro */}
              <div className="dash-filter-content">

                {/* Etiqueta */}
                <span className="dash-filter-label">
                  Candado
                </span>

                {/* Selector */}
                <div className="dash-select-wrapper">

                  <select
                    value={candadoFilter}
                    onChange={(e) =>
                      setCandadoFilter(
                        e.target.value
                      )
                    }
                  >

                    {/* Opciones disponibles */}
                    {opcionesCandado.map((opcion) => (

                      <option
                        key={opcion}
                        value={opcion}
                      >
                        {opcion}

                      </option>

                    ))}

                  </select>

                  {/* Flecha del selector */}
                  <ChevronDown
                    size={16}
                    className="dash-select-arrow"
                  />

                </div>

              </div>

            </div>

            {/* FILTRO CONECTIVIDAD */}

            <div className="dash-filter-card">

              {/* Icono del filtro */}
              <div className="dash-filter-icon">

                <Wifi size={20} />

              </div>

              {/* Contenido del filtro */}
              <div className="dash-filter-content">

                {/* Etiqueta */}
                <span className="dash-filter-label">
                  Conectividad
                </span>

                {/* Selector */}
                <div className="dash-select-wrapper">

                  <select
                    value={conectividadFilter}
                    onChange={(e) =>
                      setConectividadFilter(
                        e.target.value
                      )
                    }
                  >

                    {/* Opciones disponibles */}
                    {opcionesConectividad.map((opcion) => (

                      <option
                        key={opcion}
                        value={opcion}
                      >
                        {opcion}
                      </option>

                    ))}

                  </select>

                  {/* Flecha del selector */}
                  <ChevronDown
                    size={16}
                    className="dash-select-arrow"
                  />

                </div>

              </div>

            </div>

            {/* FILTRO MOVILIDAD */}

            <div className="dash-filter-card">

              {/* Icono del filtro */}
              <div className="dash-filter-icon">

                <Laptop size={20} />

              </div>

              {/* Contenido del filtro */}
              <div className="dash-filter-content">

                {/* Etiqueta */}
                <span className="dash-filter-label">
                  Movilidad
                </span>

                {/* Selector */}
                <div className="dash-select-wrapper">

                  <select
                    value={movilidadFilter}
                    onChange={(e) =>
                      setMovilidadFilter(
                        e.target.value
                      )
                    }
                  >

                    {/* Opciones disponibles */}
                    {opcionesMovilidad.map((opcion) => (

                      <option
                        key={opcion}
                        value={opcion}
                      >
                        {opcion}
                      </option>

                    ))}

                  </select>

                  {/* Flecha del selector */}
                  <ChevronDown
                    size={16}
                    className="dash-select-arrow"
                  />

                </div>

              </div>

            </div>

          </div>


          {/* BOTONES DE ACCIÓN */}

          <div className="dash-actions-row">

            {/* Exportaciones */}
            <div className="dash-export-buttons">

              {/* Exportar a Excel */}
              <button
                className="dash-btn-excel"
                onClick={descargarExcel}
              >
                <FileSpreadsheet size={18} />
                Exportar Excel
              </button>

              {/* Exportar a PDF */}
              <button
                className="dash-btn-pdf"
                onClick={descargarPDF}
              >
                <FileText size={18} />
                Exportar PDF
              </button>

            </div>

            {/* Nuevo registro */}
            <button
              className="dash-btn-new"
              onClick={openNewForm}
            >
              <Plus size={18} />
              Nuevo registro
            </button>

          </div>

        </div>

      </div>

    </>

  );

}