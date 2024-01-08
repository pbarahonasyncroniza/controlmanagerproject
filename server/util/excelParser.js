import xlsx from "xlsx";

const convertExcelToJson = (buffer) => {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetNameList = workbook.SheetNames;
  const json = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
  
  return json;
};

export default convertExcelToJson;
