"use client";

/* ==================================================
   IMPORTACIONES
================================================== */

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
  FileText
} from "lucide-react";

/* ==================================================
   PROPIEDADES DEL COMPONENTE
================================================== */

export default function SearchBar({

  /* Buscador */

  query,
  setQuery,

  /* Filtros */

  perfilFilter,
  setPerfilFilter,

  modeloFilter,
  setModeloFilter,

  candadoFilter,
  setCandadoFilter,

  conectividadFilter,
  setConectividadFilter,

  movilidadFilter,
  setMovilidadFilter,

  resguardoFilter,
  setResguardoFilter,

  serieMonitorFilter,
  setSerieMonitorFilter,

  serieMouseFilter,
  setSerieMouseFilter,

  modeloTecladoFilter,
  setModeloTecladoFilter,

  /* Opciones */

  opcionesModelo,
  opcionesCandado,
  opcionesConectividad,
  opcionesMovilidad,
  opcionesResguardo,
  opcionesSerieMonitor,
  opcionesSerieMouse,
  opcionesModeloTeclado,

  /* Funciones */

  openNewForm,

   descargarExcel,

   descargarPDF

}) {

  return (

    <>

      {/* ===========================================
          CONTENEDOR DE FILTROS
      ============================================ */}

      <div className="dash-filters">
<div className="dash-topbar">

          <div>

            <h1>
              Gestión de equipos
            </h1>

          </div>

        </div>
        {/* =======================================
            BARRA DE BÚSQUEDA
        ======================================== */}

        <div className="dash-search-row">

          {/* Buscador */}

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

        {/* =======================================
            FILTROS DEL DASHBOARD
        ======================================== */}

        <div className="dash-filters-container">

          <div className="dash-filters-row">



            {/* =======================================
    FILTRO FOLIO
======================================= */}

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

                        {/* =======================================
                FILTRO MODELO
            ======================================== */}

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


            {/* =======================================
    FILTRO SERIE MONITOR
======================================= */}

<div className="dash-filter-card">

  <div className="dash-filter-icon">
    <Monitor size={20} />
  </div>

  <div className="dash-filter-content">

    <span className="dash-filter-label">
      Serie monitor
    </span>

    <div className="dash-select-wrapper">

      <select
        value={serieMonitorFilter}
        onChange={(e) =>
          setSerieMonitorFilter(e.target.value)
        }
      >

        {opcionesSerieMonitor.map((opcion) => (

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

{/* =======================================
    FILTRO MODELO TECLADO
======================================= */}

<div className="dash-filter-card">

  <div className="dash-filter-icon">
    <Keyboard size={20} />
  </div>

  <div className="dash-filter-content">

    <span className="dash-filter-label">
      Modelo teclado
    </span>

    <div className="dash-select-wrapper">

      <select
        value={modeloTecladoFilter}
        onChange={(e) =>
          setModeloTecladoFilter(e.target.value)
        }
      >

        {opcionesModeloTeclado.map((opcion) => (

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

{/* =======================================
    FILTRO SERIE MOUSE
======================================= */}

<div className="dash-filter-card">

  <div className="dash-filter-icon">
    <Mouse size={20} />
  </div>

  <div className="dash-filter-content">

    <span className="dash-filter-label">
      Serie mouse
    </span>

    <div className="dash-select-wrapper">

      <select
        value={serieMouseFilter}
        onChange={(e) =>
          setSerieMouseFilter(e.target.value)
        }
      >

        {opcionesSerieMouse.map((opcion) => (

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
            {/* =======================================
                FILTRO CANDADO
            ======================================== */}

            <div className="dash-filter-card">

              <div className="dash-filter-icon">

                <Shield size={20} />

              </div>

              <div className="dash-filter-content">

                <span className="dash-filter-label">
                  Candado
                </span>

                <div className="dash-select-wrapper">

                  <select
                    value={candadoFilter}
                    onChange={(e) =>
                      setCandadoFilter(e.target.value)
                    }
                  >

                    {opcionesCandado.map((opcion) => (

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

            {/* =======================================
                FILTRO CONECTIVIDAD
            ======================================== */}

            <div className="dash-filter-card">

              <div className="dash-filter-icon">

                <Wifi size={20} />

              </div>

              <div className="dash-filter-content">

                <span className="dash-filter-label">
                  Conectividad
                </span>

                <div className="dash-select-wrapper">

                  <select
                    value={conectividadFilter}
                    onChange={(e) =>
                      setConectividadFilter(e.target.value)
                    }
                  >

                    {opcionesConectividad.map((opcion) => (

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

            {/* =======================================
                FILTRO MOVILIDAD
            ======================================== */}

            <div className="dash-filter-card">

              <div className="dash-filter-icon">

                <Laptop size={20} />

              </div>

              <div className="dash-filter-content">

                <span className="dash-filter-label">
                  Movilidad
                </span>

                <div className="dash-select-wrapper">

                  <select
                    value={movilidadFilter}
                    onChange={(e) =>
                      setMovilidadFilter(e.target.value)
                    }
                  >

                    {opcionesMovilidad.map((opcion) => (

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
</div> 

                    {/* =======================================
            ACCIONES
        ======================================== */}

        <div className="dash-actions-row">

    <div className="dash-export-buttons">

    <button
        className="dash-btn-excel"
        onClick={descargarExcel}
    >
        <FileSpreadsheet size={18} />
        Exportar Excel
    </button>

    <button
        className="dash-btn-pdf"
        onClick={descargarPDF}
    >
        <FileText size={18} />
        Exportar PDF
    </button>

</div>

    <button
        className="dash-btn-new"
        onClick={openNewForm}
    >
        <Plus size={18}/>
        Nuevo registro
    </button>

</div>

      </div>

    </div>

    </>

  );

}