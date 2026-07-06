"use client";

/* IMPORTACIONES */

// Iconos utilizados en el encabezado.
import {
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

// Hooks de React.
import {
  useEffect,
  useRef,
} from "react";


/* COMPONENTE */

/**
 * Encabezado principal del sistema.
 * Muestra los logotipos institucionales y el menú del usuario.
 */
export default function Header({

  /* INFORMACIÓN */

  // Información del usuario autenticado.
  usuario,

  // Indica si el componente ya fue montado.
  mounted,

  // Estado del menú desplegable.
  mostrarMenu,

  // Función para mostrar u ocultar el menú.
  setMostrarMenu,

  // Función para cerrar la sesión.
  cerrarSesion,

}) {

  /* REFERENCIA DEL MENÚ */

  // Referencia utilizada para detectar clics fuera del menú.
  const menuRef = useRef(null);


  /* CERRAR MENÚ AL HACER CLIC FUERA */

  useEffect(() => {

    // Si el menú está cerrado no es necesario agregar el evento.
    if (!mostrarMenu) return;

    // Detecta clics fuera del contenedor del menú.
    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {

        setMostrarMenu(false);

      }

    };

    // Agrega el evento al documento.
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    // Elimina el evento al desmontar el componente.
    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, [mostrarMenu]);


  return (

    /* ENCABEZADO */

    <header className="dash-header">

      <div className="dash-header-inner">

        {/* LOGOTIPOS INSTITUCIONALES */}

        <div className="dash-logos">

          <img
            src="/logos/1.png"
            alt="Agricultura"
          />

          <img
            src="/logos/2.png"
            alt="Leche para el Bienestar"
          />

          <img
            src="/logos/3.png"
            alt="Margarita Maza"
          />

        </div>


        {/* MENÚ DEL USUARIO */}

        {mounted && usuario && (

          <div
            className="usuario-menu"
            ref={menuRef}
          >

            {/* Botón principal del usuario */}
            <button
              className="usuario-btn"
              onClick={(e) => {

                e.stopPropagation();

                setMostrarMenu(
                  (prev) => !prev
                );

              }}
            >

              {/* Avatar */}
              <div className="usuario-avatar">

                <User size={26} />

              </div>

              {/* Información del usuario */}
              <div>

                <strong>

                  {usuario.nombre}

                </strong>

                <p>

                  Rol: {usuario.rol}

                </p>

              </div>

              {/* Flecha del menú */}
              <ChevronDown
                size={18}
                className={
                  mostrarMenu
                    ? "usuario-arrow open"
                    : "usuario-arrow"
                }
              />

            </button>


            {/* MENÚ DESPLEGABLE */}

            {mostrarMenu && (

              <div className="menu-dropdown">

                {/* Botón para cerrar la sesión */}
                <button
                  className="menu-item logout"
                  onClick={(e) => {

                    e.stopPropagation();

                    // Cierra el menú desplegable.
                    setMostrarMenu(false);

                    // Ejecuta la función para cerrar la sesión.
                    cerrarSesion();

                  }}
                >

                  {/* Icono */}
                  <div className="menu-icon">

                    <LogOut size={18} />

                  </div>

                  {/* Texto */}
                  <span>

                    Cerrar sesión

                  </span>

                </button>

              </div>

            )}

          </div>

        )}

      </div>

    </header>

  );

}