"use client";

/* COMPONENTE */

/**
 * Componente encargado de mostrar la paginación
 * y la información de los registros de la tabla.
 */
export default function Pagination({

  /* INFORMACIÓN */

  // Total de registros después de aplicar los filtros.
  filteredData,

  // Registros que se muestran en la página actual.
  currentRecords,

  // Página actualmente seleccionada.
  currentPage,

  // Número total de páginas.
  totalPages,

  // Índice del primer registro mostrado.
  startIndex,

  // Cantidad de registros que se muestran por página.
  registrosPorPagina,

  /* FUNCIONES */

  // Cambia la cantidad de registros por página.
  setRegistrosPorPagina,

  // Cambia la página actual.
  setCurrentPage,

}) {

  return (

    <>

      {/* PIE DE LA TABLA */}

      <div className="dash-table-footer">

        {/* INFORMACIÓN DE REGISTROS */}

        <p className="dash-table-info">

          {filteredData.length === 0 ? (

            <>
              <span className="dash-table-info-number">
                0 - 0
              </span>

              {" de "}
              <span className="dash-table-info-number">
                0
              </span>

              {" registros"}
            </>

          ) : (

            <>
              <span className="dash-table-info-number">

                {startIndex + 1} - {startIndex + currentRecords.length}

              </span>

              {" de "}

              <span className="dash-table-info-number">

                {filteredData.length}

              </span>

              {" registros"}

            </>

          )}

        </p>


        {/* CONTROLES DE PAGINACIÓN */}

        <div className="dash-pagination">

          {/* PÁGINA ANTERIOR */}

          <button
            className="dash-page-btn"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >

            ‹

          </button>


          {/* NÚMEROS DE PÁGINA */}

          {Array.from(

            { length: totalPages },

            (_, i) => i + 1

          )

            // Muestra únicamente las páginas necesarias.
            .filter(

              (page) =>

                page === 1 ||

                page === totalPages ||

                Math.abs(
                  page - currentPage
                ) <= 1

            )

            .map(

              (page, index, array) => (

                <div key={page}>

                  {/* Muestra puntos suspensivos cuando existen páginas ocultas. */}
                  {index > 0 &&
                    page -
                      array[index - 1] >
                      1 && (

                      <span className="dash-page-dots">
                        ...
                      </span>

                    )}

                  <button
                    className={`dash-page-btn ${
                      currentPage === page
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setCurrentPage(page)
                    }
                  >

                    {page}

                  </button>

                </div>

              )

            )}


          {/* PÁGINA SIGUIENTE */}

          <button
            className="dash-page-btn"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >

            ›

          </button>

        </div>


        {/*  CANTIDAD DE REGISTROS POR PÁGINA */}

        <div className="dash-pagination-size">

          {/* Etiqueta del selector */}
          <label>

            Mostrar

          </label>

          {/* Selector de registros por página */}
          <select
            value={registrosPorPagina}
            onChange={(e) =>
              setRegistrosPorPagina(
                Number(e.target.value)
              )
            }
          >

            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>

          </select>

        </div>

      </div>

    </>

  );

}