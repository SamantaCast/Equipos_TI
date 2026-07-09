/* EXPORTAR REPORTE A PDF
   Genera el reporte del inventario de equipos en
   formato PDF. */

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


/* CONVERTIR IMAGEN A BASE64
   Convierte una imagen ubicada en la carpeta pública
   al formato Base64 para insertarla en el PDF. */

async function cargarImagen(
  url: string
): Promise<string> {

  return new Promise((resolve, reject) => {

    const img = new Image();

    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {

      const canvas =
        document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) {

        reject(
          "No fue posible crear el Canvas."
        );

        return;

      }

      ctx.drawImage(img, 0, 0);

      resolve(
        canvas.toDataURL("image/png")
      );

    };

    img.onerror = () => {

      reject(
        `No fue posible cargar ${url}`
      );

    };

  });

}


/* EXPORTAR PDF
   Crea el documento PDF e inserta la información
   del inventario de equipos. */

export async function exportarPDF(
  registros: any[]
) {

  /* CREAR DOCUMENTO PDF */

  const doc = new jsPDF({

    orientation: "landscape",
    unit: "mm",
    format: [297, 650],

  });


  /* CARGAR LOGOTIPOS */

  const logo1 =
    await cargarImagen("/logos/1.png");

  const logo2 =
    await cargarImagen("/logos/2.png");

  const logo3 =
    await cargarImagen("/logos/3.png");


  /* FECHA ACTUAL */

  const fecha = new Date();


  /* ANCHO DE LA PÁGINA
     Se utiliza para centrar elementos y calcular
     posiciones dinámicamente. */

  const pageWidth =
    doc.internal.pageSize.getWidth();


  /* COLUMNAS DEL REPORTE
     Define el orden de las columnas que aparecerán
     en la tabla del PDF. */

  const columnas = [

    "USUARIO",
    "N° NOMINA",
    "PERFIL",
    "DESCRIPCIÓN DEL EQUIPO",
    "SERIE",
    "MARCA",
    "MODELO",
    "SERIE MONITOR",
    "MARCA MONITOR",
    "MODELO MONITOR",
    "SERIE TECLADO",
    "MARCA TECLADO",
    "MODELO TECLADO",
    "SERIE MOUSE",
    "MARCA MOUSE",
    "MODELO MOUSE",
    "SERIE DOCKING",
    "MARCA DOCKING",
    "MODELO DOCKING",
    "CANDADO",
    "SISTEMA OPERATIVO",
    "PROCESADOR",
    "CONECTIVIDAD",
    "NOMBRE DEL EQUIPO",
    "MOVILIDAD",

  ];


  /* FORMATEAR TEXTO
     Inserta saltos de línea para mejorar la
     presentación de textos largos. */

  function formatearTexto(valor: any) {

    if (!valor) return "";

    return String(valor)

      .replace(/\s*\(/g, "\n(")
      .replace(/\)\s*/g, ")\n")
      .replace(/\s+CON\s+/gi, "\nCON ")
      .replace(/\s+DE\s+/gi, "\nDE ")
      .replace(/\s+PARA\s+/gi, "\nPARA ")
      .replace(/\s+Y\s+/gi, "\nY ");

  }


  /* CREAR TABLA
     Genera la tabla principal del reporte. */

  autoTable(doc, {

    startY: 56,
    theme: "grid",
    margin: {

      top: 12,
      left: 5,
      right: 5,
      bottom: 20,

    },

    /* ENCABEZADOS */

    head: [

      columnas,

    ],

    /* REGISTROS */

    body: registros.map((registro) =>

      columnas.map((columna) => {

        if (

          columna === "DESCRIPCIÓN DEL EQUIPO" ||
          columna === "SISTEMA OPERATIVO" ||
          columna === "NOMBRE DEL EQUIPO"

        ) {

          return formatearTexto(
            registro[columna]
          );

        }

        return registro[columna] ?? "";

      })

    ),

    /* ESTILO GENERAL */

    styles: {

      fontSize: 6,
      cellPadding: 1,
      overflow: "linebreak",
      valign: "middle",

    },

    /* CONFIGURACIÓN DE COLUMNAS */

    columnStyles: {

      3: {

        cellWidth: 45,

      },

    },

    /* ESTILO DEL ENCABEZADO */

    headStyles: {

      minCellHeight: 9,
      fontSize: 6,
      halign: "center",
      valign: "middle",
      fillColor: [138, 32, 54],
      textColor: [255, 255, 255],
      fontStyle: "bold",

    },

    tableWidth: "auto",
    horizontalPageBreak: false,
    horizontalPageBreakRepeat: 0,

    /* FILAS ALTERNADAS */

    alternateRowStyles: {

      fillColor: [248, 248, 248],

    },

    /* ENCABEZADO DEL DOCUMENTO
       Se dibuja únicamente en la primera página. */

    willDrawPage: (data) => {

      if (data.pageNumber !== 1) return;

      /* LOGOTIPOS */

      doc.addImage(
        logo1,
        "PNG",
        10,
        10,
        58,
        13
      );

      doc.addImage(
        logo2,
        "PNG",
        72,
        10,
        52,
        13
      );

      doc.addImage(
        logo3,
        "PNG",
        128,
        9,
        34,
        13
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(18);
      doc.setTextColor(170);

      /* TÍTULO */

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(30);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setTextColor(
        138,
        32,
        54
      );

      doc.text(
        "GESTIÓN DE EQUIPOS",
        pageWidth / 2,
        35,
        {

          align: "center",

        }

      );

      /* SUBTÍTULO */

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(11);
      doc.setTextColor(90);
      doc.setFontSize(16);
      doc.text(
        "Inventario de Activos Informáticos",
        pageWidth / 2,
        47,
        {

          align: "center",

        }

      );

      /* FECHA, HORA Y TOTAL */

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(10);
      doc.setTextColor(
        138,
        32,
        54
      );

      const yInfo = 53;

      /* Posiciones */

      const xTotalValor =
        pageWidth - 8;

      const xTotalTexto =
        xTotalValor - 28;

      const xHoraValor =
        xTotalTexto - 55;

      const xHoraTexto =
        xHoraValor - 18;

      const xFechaValor =
        xHoraTexto - 55;

      const xFechaTexto =
        xFechaValor - 20;

      /* Fecha */

      doc.setTextColor(138, 32, 54);

      doc.text(
        "FECHA:",
        xFechaTexto,
        yInfo
      );

      doc.setTextColor(80, 80, 80);

      doc.text(
        fecha.toLocaleDateString("es-MX"),
        xFechaValor,
        yInfo
      );

      /* Hora */

      doc.setTextColor(138, 32, 54);

      doc.text(
        "HORA:",
        xHoraTexto,
        yInfo
      );

      doc.setTextColor(80, 80, 80);

      doc.text(
        fecha.toLocaleTimeString("es-MX"),
        xHoraValor,
        yInfo
      );

      /* Total */

      doc.setTextColor(138, 32, 54);

      doc.text(
        "TOTAL:",
        xTotalTexto,
        yInfo
      );

      doc.setTextColor(80, 80, 80);
      doc.text(

        `${registros.length}`,
        xTotalValor,
        yInfo,

        {

          align: "right",

        }

      );

    },

  });


  /* AGREGAR PIE DE PÁGINA
     Inserta un pie de página en todas las hojas del
     documento con información del sistema y la
     numeración de páginas. */

  const paginas = doc.getNumberOfPages();

  for (let pagina = 1; pagina <= paginas; pagina++) {

    /* Seleccionar página */

    doc.setPage(pagina);

    /* Configurar línea divisoria */

    doc.setDrawColor(220);
    doc.setLineWidth(0.3);

    /* Configurar fuente */

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(9);
    doc.setTextColor(90);

    /* Altura de la página */

    const pageHeight =
      doc.internal.pageSize.getHeight();

    /* Dibujar línea */

    doc.line(
      10,
      pageHeight - 12,
      pageWidth - 10,
      pageHeight - 12

    );

    /* Texto informativo */

    doc.text(
      "Documento generado automáticamente por el Sistema Gestión de Equipos | Departamento de Informática",
      10,
      pageHeight - 6
    );

    /* Número de página */

    doc.text(
      `Página ${pagina} de ${paginas}`,
      pageWidth - 10,
      pageHeight - 6,
      {

        align: "right",

      }

    );

  }


  /* GUARDAR PDF
     Genera el nombre del archivo utilizando la fecha
     actual e inicia la descarga del documento. */

  const nombreArchivo =

    `Gestion_Equipos_${fecha
      .toLocaleDateString("es-MX")
      .replace(/\//g, "-")}.pdf`;

  /* Descargar archivo */

  doc.save(

    nombreArchivo

  );

}