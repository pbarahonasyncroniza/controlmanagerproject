import { Types, Error } from "mongoose";
const { ObjectId } = Types;
import { ProgressModel } from "../models/progress.models.js";
import convertExcelToJson from "../util/excelParser.js";

export function getAllProgress(req, res) {
  ProgressModel.find({})
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function getOneProgress(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ message: "id doesn't match the expected format" });
  ProgressModel.findOne({ _id: id })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}

// __________creacion "normal " de datos a la BD_______________
// export function createProgress(req, res) {
//   let data = req.body;
//   console.log(data);
//   ProgressModel.create(data)
//     .then((data) => {
//       res.json({ data: data });
//     })
//     .catch((error) => {
//       // error de validacion de mongoose
//       if (error instanceof Error.ValidatorError) {
//         let keys = Object.keys(error.errors);
//         let error_dict = {};
//         keys.map((key) => {
//           error_dict[key] = error.errors[key].message;
//         });
//         res.status(500).json({ error: error_dict });
//       } else {
//         res.status(500).json({ error: error });
//       }
//     });
// }

//-----Toma informacion desde Excel para crear Curva S---//

export function handleCreateProgressError(res, error) {
  console.error(error);
  res.status(500).json({ error: "Error al procesar la solicitud." });
}

// Funcion que toma archivo excel de carga masiva y lo lleva a BD
export function createProgress(req, res) {
  let data = req.body;
  const file = req.file;
  
  // Verificar si se proporciona un archivo Excel en la solicitud
  if (file) {
    try {
      // Leer el archivo Excel y convertirlo a JSON
      const jsonData = convertExcelToJson(file.buffer);

      console.log("Ruta del archivo:", file.buffer);

      // Convertir las fechas de cadena de texto a objetos Date
      jsonData.forEach((item) => {
        item.dateStart = new Date(item.dateStart);
        item.finishdate = new Date(item.finishdate);
      });

      // Crear el presupuesto utilizando los datos del archivo JSON
      ProgressModel.create(jsonData)
        .then((createdData) => {
          res.json({
            data: createdData,
            message: "Datos creados exitosamente desde Excel.",
          });
        })
        .catch((error) => {
          handleCreateProgressError(res, error);
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al leer el archivo Excel." });
    }
  } else {
    // Crear el presupuesto utilizando los datos de la solicitud
    ProgressModel.create(data)
      .then((createdData) => {
        res.json({ data: createdData, message: "Datos creados exitosamente." });
      })
      .catch((error) => {
        handleCreateProgressError(res, error);
      });
  }
}

//_________________________ fin ___________________________________

export function deleteProgress(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id  do not match" });
  ProgressModel.deleteOne({ _id: id })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function editProgress(req, res) {
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
  ProgressModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
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
