import { Types, Error } from "mongoose";
const { ObjectId } = Types;
import convertExcelToJson from "../util/excelParser.js";
import XLSX from "xlsx";
import { LaborCostModel } from "../models/laborcost.model.js";

export function getAllLabor(req, res) {
  LaborCostModel.find({})
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}

// Funcion que toma archivo excel de carga masiva y lo lleva a BD

export function createLaborExcel(req, res) {
  const file = req.file;

  if (file) {
    try {
     
     
        // esta funcion transforma el formato de fecha de excel a ISO ...¡muy importante
      const excelSerialDateToJSDate = (serialDate) => {
        // console.log("fecha original",serialDate)
        const excelEpoch = new Date(1899, 11, 31);
        const excelEpochTime = excelEpoch.getTime();
        const days = serialDate - (serialDate > 60 ? 2 : 1); // Restar 1 porque Excel inicia desde 1, no desde 0
        const jsDate = new Date(excelEpochTime + days * 86400000); // 86400000 es el número de milisegundos en un día
        return jsDate.toISOString();
      };
      // Convertir Excel a JSON y procesar las fechas
      const convertExcelToJson = (buffer) => {
        const workbook = XLSX.read(buffer);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        return data.map(row => {
          if (row.deadline) {
            row.deadline = excelSerialDateToJSDate(row.deadline);
          }
          return row;
        });
      };

      // Leer el archivo Excel y convertirlo a JSON
      const jsonData = convertExcelToJson(file.buffer);

      // Crear registros en la base de datos utilizando los datos del archivo JSON
      LaborCostModel.create(jsonData)
        .then((createdData) => {
          res.json({
            data: createdData,
            message: "Datos creados exitosamente desde Excel.",
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error al guardar los datos." });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al leer el archivo Excel." });
    }
  } else {
    // Si no hay archivo, tratar como una solicitud normal
    LaborCostModel.create(data)
      .then((createdData) => {
        res.json({ data: createdData, message: "Datos creados exitosamente." });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error al guardar los datos." });
      });
  }
}


export function getOneLabor(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ message: "id doesn't match the expected format" });
  LaborCostModel.findOne({ _id: id })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}

export function createLabor(req, res) {
  let data = req.body;
  console.log(data);
  LaborCostModel.create(data)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      // error de validacion de mongoose
      if (error instanceof Error.ValidatorError) {
        let keys = Object.keys(error.errors);
        let error_dict = {};
        keys.map((key) => {
          error_dict[key] = error.errors[key].message;
        });
        res.status(500).json({ error: error_dict });
      } else {
        res.status(500).json({ error: error });
      }
    });
}
export function deleteLabor(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id  do not match" });
  LaborCostModel.deleteOne({ _id: id })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function editLabor(req, res) {
  console.log("Received update request for task ID:", req.params.id); // log the task ID
  console.log("Request body:", req.body);

  let id = req.params.id;
  let data = req.body;

  const updateOptions = {
    new: true,
    runValidators: true, // Enforce validation during update (para hacer correr las validaciones al actualizar)
  };

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id  do not match" });
  LaborCostModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      if (error instanceof Error.ValidatorError) {
        let keys = Object.keys(error.errors);
        let error_dict = {};
        keys.map((key) => {
          error_dict[key] = error.errors[key].message;
        });
        res.status(500).json({ error: error_dict });
      } else {
        res.status(500).json({ error: error });
      }
    });
}
