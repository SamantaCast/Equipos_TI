"use client";

import { ChevronDown, LogOut, User } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Header({
  usuario,
  mounted,
  mostrarMenu,
  setMostrarMenu,
  cerrarSesion,
}) {

  /* ===========================================
     REFERENCIA DEL MENÚ
  =========================================== */

  const menuRef = useRef(null);

  /* ===========================================
     CERRAR AL HACER CLIC FUERA
  =========================================== */

 useEffect(() => {

  if (!mostrarMenu) return;

  const handleClickOutside = (event) => {

    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMostrarMenu(false);
    }

  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };

}, [mostrarMenu]);

  return (

    /* ===============================================
       ENCABEZADO
    ================================================ */

    <header className="dash-header">

      <div className="dash-header-inner">

        {/* ===========================================
            LOGOTIPOS
        ============================================ */}

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

        {/* ===========================================
            TÍTULO
        ============================================ */}

        

        {/* ===========================================
            MENÚ DEL USUARIO
        ============================================ */}
{mounted && usuario && (

  <div
  className="usuario-menu"
  ref={menuRef}
>

    <button
  className="usuario-btn"
  onClick={(e) => {
    e.stopPropagation();
    setMostrarMenu((prev) => !prev);
  }}
>

      <div className="usuario-avatar">
        <User size={26} />
      </div>

      <div>
        <strong>{usuario.nombre}</strong>
        <p>Rol: {usuario.rol}</p>
      </div>

      <ChevronDown
        size={18}
        className={mostrarMenu ? "usuario-arrow open" : "usuario-arrow"}
      />

    </button>

    {mostrarMenu && (

      <div className="menu-dropdown">

        <button
  className="menu-item logout"
  onClick={(e) => {
    e.stopPropagation();

    // Cierra el menú desplegable
    setMostrarMenu(false);

    // Abre el modal de confirmación
    cerrarSesion();
  }}
>

          <div className="menu-icon">
            <LogOut size={18} />
          </div>

          <span>Cerrar sesión</span>

        </button>

      </div>

    )}

  </div>

)}

      </div>

    </header>

  );

}