/* EXPORTAR REPORTE A EXCEL
   Genera el archivo de Excel con la información
   del inventario de equipos de cómputo. */

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";


/* CARGAR IMAGEN
   Obtiene una imagen desde la carpeta pública para
   incorporarla al reporte de Excel. */

async function cargarImagen(
  url: string
): Promise<ArrayBuffer> {

  const respuesta = await fetch(url);

  return await respuesta.arrayBuffer();

}


/* EXPORTAR EXCEL
   Crea el libro de Excel y configura la estructura
   principal del reporte. */

export async function exportarExcel(
  impresoras: any[]
) {

  /* FECHA ACTUAL */

  const fecha = new Date();


  /* CREAR LIBRO */

  const libro = new ExcelJS.Workbook();

  libro.creator = "Departamento de Informática";
  libro.company = "LECHE PARA EL BIENESTAR S.A de C.V";
  libro.subject = "Gestión de Equipos";
  libro.title = "Gestión de Equipos";
  libro.created = fecha;


  /* CREAR HOJA */

  const hoja = libro.addWorksheet("GENERAL");


  /* ENCABEZADOS DE LA TABLA */

  const encabezados = [

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


  /* ÚLTIMA COLUMNA
     Obtiene la última columna para combinar celdas
     dinámicamente. */

  const ultimaColumna =
    hoja.getColumn(encabezados.length).letter;


  /* CONFIGURAR PÁGINA */

  hoja.pageSetup = {

    paperSize: 9,
    orientation: "landscape",
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    margins: {
      left: 0.25,
      right: 0.25,
      top: 0.35,
      bottom: 0.35,
      header: 0.15,
      footer: 0.15,
    },

  };


  /* CARGAR LOGOTIPOS */

  const logo1 =
    await cargarImagen("/logos/1.png");

  const logo2 =
    await cargarImagen("/logos/2.png");

  const logo3 =
    await cargarImagen("/logos/3.png");


  /* REGISTRAR LOGOTIPOS */

  const idLogo1 = libro.addImage({

    buffer: logo1,
    extension: "png",

  });

  const idLogo2 = libro.addImage({

    buffer: logo2,
    extension: "png",

  });

  const idLogo3 = libro.addImage({

    buffer: logo3,
    extension: "png",

  });


  /* INSERTAR LOGOTIPOS */

  hoja.addImage(

    idLogo1,

    {

      tl: {

        col: 0.10,
        row: 0.10,

      },

      ext: {

        width: 205,
        height: 60,

      },

    }

  );

  hoja.addImage(

    idLogo2,

    {

      tl: {

        col: 1.10,
        row: 0.10,

      },

      ext: {

        width: 180,
        height: 60,

      },

    }

  );

  hoja.addImage(

    idLogo3,

    {

      tl: {

        col: 3.15,
        row: 0.05,

      },

      ext: {

        width: 95,
        height: 60,

      },

    }

  );


  /* COMBINAR CELDAS
     Se reservan para el título y el subtítulo. */

  hoja.mergeCells(`A5:${ultimaColumna}5`);

  hoja.mergeCells(`A6:${ultimaColumna}6`);


  /* CONFIGURAR ALTURA DE FILAS */

  hoja.getRow(5).height = 28;
  hoja.getRow(6).height = 22;


  /* TÍTULO PRINCIPAL */

  hoja.getCell("A5").value =
    "GESTIÓN DE EQUIPOS";

  hoja.getCell("A5").font = {

    bold: true,
    size: 20,
    color: {

      argb: "8A2036",

    },

  };

  hoja.getCell("A5").alignment = {

    horizontal: "center",
    vertical: "middle",

  };


  /* SUBTÍTULO */

  hoja.getCell("A6").value =
    "Inventario de Activos Informáticos";

  hoja.getCell("A6").font = {

    size: 12,
    color: {

      argb: "666666",

    },

  };

  hoja.getCell("A6").alignment = {

    horizontal: "center",
    vertical: "middle",

  };


  /* TOTAL DE REGISTROS
     Muestra la cantidad total de equipos incluidos
     en el reporte. */

  hoja.getCell("A8").value = "TOTAL:";
  hoja.getCell("B8").value = impresoras.length;

  /* Etiqueta */

  hoja.getCell("A8").font = {

    bold: true,
    size: 11,
    color: {

      argb: "8A2036",

    },

  };

  /* Valor */

  hoja.getCell("B8").font = {

    bold: true,
    size: 11,
    color: {

      argb: "666666",

    },

  };


  /* ENCABEZADO DE LA TABLA
     Configura el estilo de las columnas del reporte. */

  const filaEncabezado = hoja.getRow(10);

  encabezados.forEach((titulo, index) => {

    /* Obtener celda */

    const celda =
      filaEncabezado.getCell(index + 1);

    /* Asignar título */

    celda.value = titulo;

    /* Fuente */

    celda.font = {

      bold: true,
      color: {

        argb: "FFFFFF",

      },

    };

    /* Fondo */

    celda.fill = {

      type: "pattern",
      pattern: "solid",
      fgColor: {

        argb: "8A2036",

      },

    };

    /* Alineación */

    celda.alignment = {

      horizontal: "center",
      vertical: "middle",

    };

    /* Bordes */

    celda.border = {

      top: {

        style: "thin",

      },

      bottom: {

        style: "thin",

      },

      left: {

        style: "thin",

      },

      right: {

        style: "thin",

      },

    };

  });

  /* Altura del encabezado */

  filaEncabezado.height = 24;


  /* AGREGAR REGISTROS
     Inserta cada equipo en la hoja de cálculo y
     aplica el formato correspondiente. */

  impresoras.forEach((imp, indice) => {

    /* Agregar fila */

    const fila = hoja.addRow(

      encabezados.map(
        (campo) => imp[campo] ?? ""
      )

    );

    /* Altura de la fila */

    fila.height = 21;

    /* Aplicar formato a cada celda */

    fila.eachCell((celda) => {

      /* Alineación */

      celda.alignment = {

        vertical: "middle",

      };

      /* Bordes */

      celda.border = {

        top: {

          style: "thin",
          color: {

            argb: "D9D9D9",

          },

        },

        bottom: {

          style: "thin",
          color: {

            argb: "D9D9D9",

          },

        },

        left: {

          style: "thin",
          color: {

            argb: "D9D9D9",

          },

        },

        right: {

          style: "thin",
          color: {

            argb: "D9D9D9",

          },

        },

      };

    });

    /* FILAS ALTERNADAS
       Aplica un color de fondo para facilitar
       la lectura del reporte. */

    if (indice % 2 === 0) {

      fila.eachCell((celda) => {

        celda.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {

            argb: "F7F7F7",

          },

        };

      });

    }

  });


  /* FILTROS
     Habilita los filtros automáticos sobre los
     encabezados de la tabla. */

  hoja.autoFilter = {

    from: {

      row: 10,
      column: 1,

    },

    to: {

      row: 10,
      column: encabezados.length,

    },

  };


  /* ANCHO DE COLUMNAS
     Define el ancho de las columnas del reporte. */

  hoja.columns = [

    { width: 34 },
    { width: 10 },
    { width: 18 },
    { width: 34 },
    { width: 36 },
    { width: 15 },
    { width: 18 },
    { width: 18 },
    { width: 12 },

  ];


  /* CONFIGURAR IMPRESIÓN
     Establece el formato para la impresión del
     reporte. */

  /* Repetir encabezado en cada página */

  hoja.pageSetup.printTitlesRow = "10:10";

  /* Centrar horizontalmente */

  hoja.pageSetup.horizontalCentered = true;

  /* No centrar verticalmente */

  hoja.pageSetup.verticalCentered = false;

  /* Pie de página (páginas impares) */

  hoja.headerFooter.oddFooter =
    "&LDepartamento de Informática&CControl Equipos de Cómputo&RPágina &P de &N";

  /* Pie de página (páginas pares) */

  hoja.headerFooter.evenFooter =
    "&LDepartamento de Informática&CControl Equipos de Cómputo&RPágina &P de &N";


  /* GENERAR ARCHIVO
     Convierte el libro de Excel en un archivo
     descargable. */

  /* Generar el contenido del archivo */

  const buffer = await libro.xlsx.writeBuffer();

  /* Crear el archivo Blob */

  const archivo = new Blob(

    [buffer],

    {

      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    }

  );


  /* NOMBRE DEL ARCHIVO
     Genera automáticamente el nombre del archivo
     utilizando la fecha actual. */

  const nombreArchivo =

    `Gestion_Equipos_${fecha
      .toLocaleDateString("es-MX")
      .replace(/\//g, "-")}.xlsx`;


  /* DESCARGAR ARCHIVO
     Inicia la descarga del reporte en formato
     Microsoft Excel. */

  saveAs(

    archivo,
    nombreArchivo

  );

}