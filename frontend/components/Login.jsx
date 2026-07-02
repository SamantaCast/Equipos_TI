"use client";

/* ==================================================
   IMPORTACIONES
================================================== */

import { useRef, useState } from "react";

import { useRouter } from "next/navigation";

import {
  User,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import Swal from "sweetalert2";

/* ==================================================
   COMPONENTE
================================================== */

export default function Login() {

  /* ===============================================
     REFERENCIAS
     Permiten controlar el enfoque entre inputs.
  ================================================ */

  const passwordRef = useRef(null);

  /* ===============================================
     NAVEGACIÓN
     Redirecciona al Dashboard después del login.
  ================================================ */

  const router = useRouter();

  /* ===============================================
     ESTADOS
     Controlan la información del formulario.
  ================================================ */

  const [usuario, setUsuario] = useState("");

  const [password, setPassword] = useState("");

  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  /* ===============================================
     INICIAR SESIÓN
     Envía las credenciales al servidor y valida
     la respuesta del backend.
  ================================================ */

  const iniciarSesion = async () => {

   try {

  console.log(process.env.NEXT_PUBLIC_API_URL);

  const respuesta = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario,
        password,
      }),
    }
  );

  const datos = await respuesta.json();

      /* ===========================================
         VALIDAR RESPUESTA
      ============================================ */

      if (!respuesta.ok) {

        Swal.fire({

          icon: "error",

          title: "Error",

          text: datos.mensaje,

          confirmButtonColor: "#8b1e3f",

        });

        return;

      }

      /* ===========================================
         LOGIN CORRECTO
      ============================================ */

      await Swal.fire({

        icon: "success",

        title: "Bienvenida",

        text: `Hola, ${datos.usuario.nombre}`,

        confirmButtonColor: "#8b1e3f",

        confirmButtonText: "Continuar",

      });

      /* ===========================================
         GUARDAR USUARIO
      ============================================ */

      localStorage.setItem(

        "usuario",

        JSON.stringify(datos.usuario)

      );

      /* ===========================================
         REDIRECCIONAR AL DASHBOARD
      ============================================ */

      router.push("/dashboard");

    }

    catch (error) {

      console.error(error);

      Swal.fire({

        icon: "error",

        title: "Error",

        text: "No fue posible conectar con el servidor.",

        confirmButtonColor: "#8b1e3f",

      });

    }

  };

  /* ===============================================
     ENVIAR FORMULARIO
     Ejecuta el inicio de sesión.
  ================================================ */

  const handleSubmit = (e) => {

    e.preventDefault();

    iniciarSesion();

  };

  /* ===============================================
     INTERFAZ
  ================================================ */

  return (

    <main className="login-page">

      <section className="login-card">

        {/* =======================================
            ICONO DEL USUARIO
        ======================================== */}

        <div className="user-circle">

          <User
            size={48}
            color="white"
          />

        </div>

        {/* =======================================
            FORMULARIO
        ======================================== */}

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          {/* ===================================
              CAMPO USUARIO
          ==================================== */}

          <div className="input-group">

            <User
              size={18}
              className="input-icon"
            />

            <input
              type="text"
              placeholder="Usuario"
              autoComplete="username"
              value={usuario}
              onChange={(e) =>
                setUsuario(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  passwordRef.current?.focus();

                }

              }}
            />

          </div>

          {/* ===================================
              CAMPO CONTRASEÑA
          ==================================== */}

          <div className="input-group">

            <Lock
              size={18}
              className="input-icon"
            />

            <input
              ref={passwordRef}
              type={
                mostrarPassword
                  ? "text"
                  : "password"
              }
              placeholder="Contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            {/* ===============================
                MOSTRAR / OCULTAR CONTRASEÑA
            ================================ */}

            <button
              type="button"
              className="toggle-password"
              onClick={() =>
                setMostrarPassword(
                  !mostrarPassword
                )
              }
            >

              {mostrarPassword ? (

                <EyeOff size={20} />

              ) : (

                <Eye size={20} />

              )}

            </button>

          </div>

          {/* ===================================
              BOTÓN INICIAR SESIÓN
          ==================================== */}

          <button
            type="submit"
            className="btn-login"
          >

            INICIAR SESIÓN

          </button>

        </form>

      </section>

    </main>

  );

}