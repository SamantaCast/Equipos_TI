"use client";

/* IMPORTACIONES */

// Iconos utilizados dentro del modal.
import {
  ClipboardPlus,
  Save,
  X,
} from "lucide-react";

/* COMPONENTE */

/**
 * Modal para agregar o editar un equipo de cómputo.
 */
export default function EquipmentModal({

  /* ESTADO */

  // Indica si el modal debe mostrarse.
  showForm,

  // Identificador del registro que se está editando.
  // Si es null, se trata de un nuevo registro.
  editingId,

  // Paso actual del formulario.
  pasoActual,

  // Función para cambiar el paso actual.
  setPasoActual,

  /* INFORMACIÓN */

  // Grupos de campos que conforman el formulario.
  fieldGroups,

  /* FUNCIONES */

  // Devuelve el icono correspondiente a cada grupo.
  getGroupIcon,

  // Renderiza cada campo del formulario.
  renderField,

  // Cierra el modal.
  closeForm,

  // Guarda la información capturada.
  handleSave,

}) {

  // Si el formulario no debe mostrarse, no se renderiza el componente.
  if (!showForm) {

    return null;

  }

  return (

    <>

      {/* FONDO DEL MODAL */}

      <div className="dash-modal-backdrop">

        {/* CONTENEDOR PRINCIPAL */}

        <div className="dash-modal">

          {/* ENCABEZADO DEL MODAL */}

          <div className="dash-modal-head">

            {/* Título e icono */}

            <div className="dash-modal-title">
              <div className="dash-modal-logo">
                <ClipboardPlus size={34} />
              </div>
              <div>

                <h2>
                  {editingId === null
                    ? "Agregar registro"
                    : "Editar registro"}
                </h2>

                <p>
                  Complete la información correspondiente al equipo de cómputo.
                </p>

              </div>
            </div>

            {/* Botón para cerrar el formulario */}
            <button
              onClick={closeForm}
              className="dash-icon-btn"
            >
              <X size={28} />
            </button>
          </div>


          {/* STEPPER DEL FORMULARIO */}

          <div className="dash-stepper">

            {fieldGroups.map((group, index) => {

              // Número del paso mostrado.
              const numeroPaso = index + 1;

              return (

                <button
                  key={group.title}
                  type="button"
                  onClick={() =>
                    setPasoActual(numeroPaso)
                  }
                  className={`dash-step ${
                    pasoActual === numeroPaso
                      ? "active"
                      : pasoActual > numeroPaso
                      ? "completed"
                      : ""
                  }`}
                >

                  {group.title}

                </button>

              );

            })}

          </div>


          {/* CONTENIDO DEL PASO ACTUAL */}

          <div className="dash-form-scroll">

            <div className="dash-group">

              {/* Título del grupo */}
              <h3>
                <span className="dash-group-icon">

                  {getGroupIcon(
                    fieldGroups[
                      pasoActual - 1
                    ].title
                  )}

                </span>

                {fieldGroups[
                  pasoActual - 1
                ].title}

              </h3>

              {/* CAMPOS DEL FORMULARIO */}

              <div className="dash-form-grid">

                {fieldGroups[
                  pasoActual - 1
                ].fields.map((field) =>

                  renderField(field)

                )}

              </div>
            </div>
          </div>


          {/* PIE DEL MODAL */}

          <div className="dash-modal-actions">

            {/* INFORMACIÓN PARA EL USUARIO */}

            <div className="dash-modal-info">

              <div className="dash-modal-info-icon">
                i
              </div>

              <div>

                <strong>
                  Verifique la información
                </strong>

                <p>
                  Asegúrese de que los datos capturados sean correctos.
                </p>

              </div>
              
            </div>


            {/* CONTROLES DE NAVEGACIÓN */}

            <div className="dash-modal-navigation">

              {/* Botón para regresar al paso anterior */}
              <button
                className="dash-nav-btn"
                onClick={() =>
                  setPasoActual(
                    (prev) => prev - 1
                  )
                }
                disabled={pasoActual === 1}
              >

                &lt;

              </button>

              {/* Indicador del paso actual */}
              <span className="dash-nav-text">

                {pasoActual} de {fieldGroups.length}

              </span>

              {/* Botón para avanzar al siguiente paso */}
              <button
                className="dash-nav-btn"
                onClick={() =>
                  setPasoActual(
                    (prev) => prev + 1
                  )
                }
                disabled={
                  pasoActual ===
                  fieldGroups.length
                }
              >

                &gt;

              </button>

              {/* Botón para guardar la información */}
              <button
                className="dash-btn dash-btn-primary"
                onClick={handleSave}
              >

                <Save size={16} />

                Guardar

              </button>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}