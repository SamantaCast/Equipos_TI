"use client";

/* ==================================================
   PROPIEDADES DEL COMPONENTE
================================================== */

export default function Pagination({

  filteredData,

  currentRecords,

  currentPage,

  totalPages,

  startIndex,

  registrosPorPagina,

  setRegistrosPorPagina,

  setCurrentPage,

}) {

  return (

    <>

      {/* ===========================================
          PIE DE LA TABLA
      ============================================ */}

      <div className="dash-table-footer">

        {/* =======================================
            INFORMACIÓN DE REGISTROS
        ======================================== */}

        <p className="dash-table-info">

    {filteredData.length === 0 ? (

        <>
            <span className="dash-table-info-number">0 - 0</span>
            {" de "}
            <span className="dash-table-info-number">0</span>
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

        {/* =======================================
            PAGINACIÓN
        ======================================== */}

        <div className="dash-pagination">

          {/* ===============================
              PÁGINA ANTERIOR
          ================================ */}

          <button
            className="dash-page-btn"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >

            ‹

          </button>

          {/* ===============================
              NÚMEROS DE PÁGINA
          ================================ */}

          {Array.from(

            { length: totalPages },

            (_, i) => i + 1

          )

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

          {/* ===============================
              PÁGINA SIGUIENTE
          ================================ */}

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



        {/*COMENTAR*/}

        <div className="dash-pagination-size">

    <label>Mostrar</label>

   <select
    value={registrosPorPagina}
    onChange={(e) =>
        setRegistrosPorPagina(Number(e.target.value))
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