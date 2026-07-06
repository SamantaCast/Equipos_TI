"use client";

/* IMPORTACIONES */

// Iconos utilizados para las acciones de la tabla.
import {
  Pencil,
  Trash2,
} from "lucide-react";


/* COMPONENTE */

/**
 * Tabla encargada de mostrar los registros de equipos
 * junto con las acciones disponibles para cada uno.
 */
export default function EquipmentTable({

  /* INFORMACIÓN */

  // Columnas que se mostrarán en la tabla.
  tableColumns,

  // Lista completa de registros filtrados.
  filteredData,

  // Registros correspondientes a la página actual.
  currentRecords,

  /* FUNCIONES */

  // Abre el formulario para editar un registro.
  openEditForm,

  // Elimina un registro seleccionado.
  handleDelete,

}) {

  return (

    <>

      {/* CONTENEDOR PRINCIPAL DE LA TABLA */}

      <div className="dash-table-wrap">

        {/* Contenedor con desplazamiento */}
        <div className="dash-table-scroll">

          <table className="dash-table">

            {/* ENCABEZADO DE LA TABLA */}

            <thead>

              <tr>

                {/* Genera dinámicamente los encabezados */}
                {tableColumns.map((column) => (

                  <th key={column.key}>
                    {column.label}
                  </th>

                ))}

                {/* Columna para acciones */}
                <th>
                  Acciones
                </th>

              </tr>

            </thead>


            {/* CUERPO DE LA TABLA */}

            <tbody>

              {/* REGISTROS */}

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

                    {/* COLUMNAS DE INFORMACIÓN */}

                    {tableColumns.map((column) => (

                      <td key={column.key}>
                        {item[column.key]}
                      </td>

                    ))}


                    {/* ACCIONES */}

                    <td>

                      <div className="dash-actions">

                        {/* Botón para editar el registro */}
                        <button
                          onClick={() =>
                            openEditForm(item)
                          }
                          className="dash-icon-action dash-edit"
                          title="Editar"
                        >

                          <Pencil size={18} />

                        </button>

                        {/* Botón para eliminar el registro */}
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

                /* Mensaje cuando no existen registros */
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