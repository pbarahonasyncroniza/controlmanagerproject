import xlsx from "xlsx";

// const convertExcelToJson = (buffer) => {
//   const workbook = xlsx.read(buffer, { type: "buffer" });
//   const sheetNameList = workbook.SheetNames;
//   const json = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
  
//   return json;
// };

// export default convertExcelToJson;

export function convertExcelToJson(buffer) {
  // Leer el archivo Excel desde el buffer
  const workbook = xlsx.read(buffer, { type: "buffer" });

  // Obtener la primera hoja del archivo Excel
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convertir la hoja del archivo Excel a JSON
  const jsonData = xlsx.utils.sheet_to_json(sheet, { raw: true });

  // Convertir manualmente las fechas de cadena de texto a objetos Date
  const formattedData = jsonData.map((item) => {
    console.log("Item antes de la conversión:", item);
    if (typeof item.dateStart === 'number' && typeof item.finishdate === 'number') {
      item.dateStart = convertToDate(item.dateStart);
      item.finishdate = convertToDate(item.finishdate);
    }
    console.log("Item después de la conversión:", item);
    return item;
  });

  console.log("Datos formateados:", formattedData);

  return formattedData;
}

function convertToDate(excelDate) {
  const seconds = (excelDate - (25567 + 1)) * 86400;
  const date = new Date(seconds * 1000);
  return date;
}
export default convertExcelToJson;