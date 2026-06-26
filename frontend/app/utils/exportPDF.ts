/* ==================================================
   EXPORTAR REPORTE PDF
================================================== */

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ==================================================
   CONVERTIR IMAGEN A BASE64
================================================== */

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

/* ==================================================
   EXPORTAR PDF
================================================== */

export async function exportarPDF(
    registros: any[]
) {

    /* ==========================================
       CREAR DOCUMENTO
    ========================================== */

 const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [297, 650]
});

    /* ==========================================
       CARGAR LOGOS
    ========================================== */

    const logo1 =
        await cargarImagen("/logos/1.png");

    const logo2 =
        await cargarImagen("/logos/2.png");

    const logo3 =
        await cargarImagen("/logos/3.png");

    /* ==========================================
       FECHA ACTUAL
    ========================================== */

    const fecha = new Date();

//cometar
const pageWidth = doc.internal.pageSize.getWidth();











    /* ==========================================
       comentar
    ========================================== */
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
    "MOVILIDAD"
];
/* ==========================================
   TABLA
========================================== */
//COEMTAR
function formatearTexto(valor: any) {

    if (!valor) return "";

    return String(valor)

        .replace(/\s*\(/g, "\n(")          // antes del (
        .replace(/\)\s*/g, ")\n")          // después del )
        .replace(/\s+CON\s+/gi, "\nCON ")
        .replace(/\s+DE\s+/gi, "\nDE ")
        .replace(/\s+PARA\s+/gi, "\nPARA ")
        .replace(/\s+Y\s+/gi, "\nY ");

}


//COMENTAR//
autoTable(doc, {

    startY: 56,

    theme: "grid",

margin: {
    top: 12,
    left: 5,
    right: 5,
    bottom: 20
},

    /* ======================================
       ENCABEZADOS DINÁMICOS
    ====================================== */

    head: [
        columnas
    ],

    /* ======================================
       DATOS DINÁMICOS
    ====================================== */

body: registros.map((registro) =>

    columnas.map((columna) => {

        if (
            columna === "DESCRIPCIÓN DEL EQUIPO" ||
            columna === "SISTEMA OPERATIVO" ||
            columna === "NOMBRE DEL EQUIPO"
        ) {

            return formatearTexto(registro[columna]);

        }

        return registro[columna] ?? "";

    })

),
styles: {
    fontSize: 6,
    cellPadding: 1,
    overflow: "linebreak",
    valign: "middle"
},
columnStyles: {
    3: {
        cellWidth: 45
    }
},
headStyles: {

    minCellHeight: 9,

    fontSize: 6,

    halign: "center",

    valign: "middle",

    fillColor: [138,32,54],

    textColor: [255,255,255],

    fontStyle: "bold"

},
tableWidth: "auto",

horizontalPageBreak: false,
horizontalPageBreakRepeat: 0,
    alternateRowStyles: {

        fillColor: [248, 248, 248]

    },

    /* ==========================================
       ENCABEZADO
       (Sólo en la primera página)
    ========================================== */

    willDrawPage: (data) => {

        if (data.pageNumber !== 1) return;

        /* ======================================
           LOGOS
        ====================================== */

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

        doc.text("|", 55, 18);

        /* ======================================
           TÍTULO
        ====================================== */

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(30);
        doc.setFont("helvetica", "bold");
doc.setTextColor(138,32,54);

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
        align: "center"
    }
);

        /* ======================================
           SUBTÍTULO
        ====================================== */

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
        align: "center"
    }
);

        /* ======================================
           FECHA / HORA / TOTAL
        ====================================== */

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
/* ======================================
   FECHA - HORA - TOTAL
====================================== */

const yInfo = 53;

// Posiciones alineadas con el borde derecho de la tabla
const xTotalValor = pageWidth - 8;
const xTotalTexto = xTotalValor - 28;

const xHoraValor = xTotalTexto - 55;
const xHoraTexto = xHoraValor - 18;

const xFechaValor = xHoraTexto - 55;
const xFechaTexto = xFechaValor - 20;

// FECHA
doc.setTextColor(138, 32, 54);
doc.text("FECHA:", xFechaTexto, yInfo);

doc.setTextColor(80, 80, 80);
doc.text(
    fecha.toLocaleDateString("es-MX"),
    xFechaValor,
    yInfo
);

// HORA
doc.setTextColor(138, 32, 54);
doc.text("HORA:", xHoraTexto, yInfo);

doc.setTextColor(80, 80, 80);
doc.text(
    fecha.toLocaleTimeString("es-MX"),
    xHoraValor,
    yInfo
);

// TOTAL
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
        align: "right"
    }
);
doc.line(
    10,
    196,
    pageWidth - 10,
    196
);

    },

});




/* ==========================================
   AGREGAR PIE DE PÁGINA
========================================== */

const paginas = doc.getNumberOfPages();

for (let pagina = 1; pagina <= paginas; pagina++) {

    doc.setPage(pagina);

    doc.setDrawColor(220);
    doc.setLineWidth(.3);

    doc.setFont("helvetica","normal");
    doc.setFontSize(9);
    doc.setTextColor(90);

    const pageHeight = doc.internal.pageSize.getHeight();

doc.line(
    10,
    pageHeight - 12,
    pageWidth - 10,
    pageHeight - 12
);

doc.text(
    "Documento generado automáticamente por el Sistema Gestión de Equipos | Departamento de Informática",
    10,
    pageHeight - 6
);

doc.text(
    `Página ${pagina} de ${paginas}`,
    pageWidth - 10,
    pageHeight - 6,
    {
        align: "right"
    }
);

}
    /* ==========================================
       GUARDAR PDF
    ========================================== */

/* ==========================================
   GUARDAR PDF
========================================== */

/* ==========================================
   GUARDAR PDF
========================================== */

const nombreArchivo =

    `Gestion_Equipos_${fecha
        .toLocaleDateString("es-MX")
        .replace(/\//g, "-")}.pdf`;

doc.save(
    nombreArchivo
);

}