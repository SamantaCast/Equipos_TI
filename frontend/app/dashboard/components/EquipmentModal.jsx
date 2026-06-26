"use client";

/* ==================================================
   IMPORTACIONES
================================================== */

import {
  ClipboardPlus,
  Save,
  X,
} from "lucide-react";

/* ==================================================
   PROPIEDADES DEL COMPONENTE
================================================== */

export default function EquipmentModal({

  /* Estado */

  showForm,

  editingId,

  pasoActual,

  setPasoActual,

  /* Información */

  fieldGroups,

  /* Funciones */

  getGroupIcon,

  renderField,

  closeForm,

  handleSave,

}) {

  if (!showForm) {

    return null;

  }

  return (

    <>

      {/* ===========================================
          FONDO DEL MODAL
      ============================================ */}

      <div className="dash-modal-backdrop">

        {/* =======================================
            CONTENEDOR DEL MODAL
        ======================================== */}

        <div className="dash-modal">

          {/* =======================================
              ENCABEZADO
          ======================================== */}

          <div className="dash-modal-head">

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

            {/* Botón cerrar */}

            <button
              onClick={closeForm}
              className="dash-icon-btn"
            >

              <X size={28} />

            </button>

          </div>

          {/* =======================================
              PASOS DEL FORMULARIO
          ======================================== */}

          <div className="dash-stepper">

            {fieldGroups.map((group, index) => {

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
                    {/* =======================================
              CONTENIDO DEL FORMULARIO
          ======================================== */}

          <div className="dash-form-scroll">

            <div className="dash-group">

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

              {/* ===============================
                  CAMPOS DEL PASO ACTUAL
              ================================ */}

              <div className="dash-form-grid">

                {fieldGroups[
                  pasoActual - 1
                ].fields.map((field) =>

                  renderField(field)

                )}

              </div>

            </div>

          </div>

          {/* =======================================
              PIE DEL MODAL
          ======================================== */}

          <div className="dash-modal-actions">

            {/* ===============================
                INFORMACIÓN
            ================================ */}

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

            {/* ===============================
                NAVEGACIÓN ENTRE PASOS
            ================================ */}

            <div className="dash-modal-navigation">

              {/* Paso anterior */}

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

              {/* Indicador */}

              <span className="dash-nav-text">

                {pasoActual} de {fieldGroups.length}

              </span>

              {/* Paso siguiente */}

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

              {/* Guardar */}

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