"use client";

/* ==================================================
   IMPORTACIONES
================================================== */

import {
  Pencil,
  Trash2,
} from "lucide-react";

/* ==================================================
   PROPIEDADES DEL COMPONENTE
================================================== */

export default function EquipmentTable({

  /* Información */

  tableColumns,

  filteredData,

  currentRecords,

  /* Funciones */

  openEditForm,

  handleDelete,

}) {

  return (

    <>

      {/* ===========================================
          CONTENEDOR DE LA TABLA
      ============================================ */}

      <div className="dash-table-wrap">

        <div className="dash-table-scroll">

          <table className="dash-table">

            {/* =======================================
                ENCABEZADO DE LA TABLA
            ======================================== */}

            <thead>

              <tr>

                {tableColumns.map((column) => (

                  <th key={column.key}>

                    {column.label}

                  </th>

                ))}

                <th>
                  Acciones
                </th>

              </tr>

            </thead>

            {/* =======================================
                CUERPO DE LA TABLA
            ======================================== */}

            <tbody>
                              {/* =======================================
                  REGISTROS
              ======================================== */}

              {filteredData.length > 0 ? (

                currentRecords.map((item, index) => (

                  <tr
                    key={item._id || index}
                    className={
                      index % 2 === 0
                        ? "row-alt"
                        : ""
                    }
                  >

                    {/* ===================================
                        COLUMNAS
                    ==================================== */}

                    {tableColumns.map((column) => (

                      <td key={column.key}>

                        {item[column.key]}

                      </td>

                    ))}

                    {/* ===================================
                        ACCIONES
                    ==================================== */}

                    <td>

                      <div className="dash-actions">

                        {/* ===============================
                            EDITAR
                        ================================ */}

                        <button
                          onClick={() =>
                            openEditForm(item)
                          }
                          className="dash-icon-action dash-edit"
                          title="Editar"
                        >

                          <Pencil size={18} />

                        </button>

                        {/* ===============================
                            ELIMINAR
                        ================================ */}

                        <button
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          className="dash-icon-action dash-delete"
                          title="Eliminar"
                        >

                          <Trash2 size={18} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (
                                <tr>

                  <td
                    colSpan={
                      tableColumns.length + 1
                    }
                    className="dash-empty"
                  >

                    No hay registros para mostrar todavía.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );

}