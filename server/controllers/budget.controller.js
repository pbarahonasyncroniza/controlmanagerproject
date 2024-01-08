import { Types, Error} from "mongoose"
const {ObjectId} = Types
import convertExcelToJson from "../util/excelParser.js";
import { fileURLToPath } from 'url';
import path from 'path';
import { BudgetModel } from "../models/budget.moldel.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export function getAllBudget(req, res) {
  // Realizar ambas operaciones: find y aggregate
  Promise.all([
    BudgetModel.find({}),
    BudgetModel.aggregate([
      { $match: { projectId: { $ne: null } } },
      {
        $group: {
          _id: "$projectId", // Agrupa por projectId
          totalBudget: { $sum: "$totalPrice" }, // Calcula la suma de total para cada projectId
        },
      },
      {
        $project: { // Renombrar _id a projectId para mantener consistencia
          _id: 0, // No incluir el campo _id original
          projectId: "$_id", // Asignar el valor de _id (que es el projectId) al nuevo campo projectId
          totalBudget: 1 
        }
      }

    ]),
  ])
    .then(([data, aggregateResults]) => {
      
      res.json({ data, aggregateResults });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}


export function getOneBudget(req, res) {
    let id = req.params.id;
    if (!ObjectId.isValid(id))
        return res.status(400).json({ message: "id doesn't match the expected format" });
    BudgetModel.findOne({ _id: id })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

export function handleCreateBudgetError(res, error) {
  console.error(error);
  res.status(500).json({ error: 'Error al procesar la solicitud.' });
}
export function createBudget(req, res) {
  
  let data = req.body;
  const file= req.file
  // console.log('Data:', data);
  // console.log('File:', file);

  // Verificar si se proporciona un archivo Excel en la solicitud
  if (file) {
    try {
      // Leer el archivo Excel y convertirlo a JSON
      const jsonData = convertExcelToJson(file.buffer);

      console.log('Ruta del archivo:', file.buffer);

      // Crear el presupuesto utilizando los datos del archivo JSON
      BudgetModel.create(jsonData)
        .then((createdData) => {
          res.json({ data: createdData, message: 'Datos creados exitosamente desde Excel.' });
        })
        .catch((error) => {
          handleCreateBudgetError(res, error);
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al leer el archivo Excel.' });
    }
  } else {
    // Crear el presupuesto utilizando los datos de la solicitud
    BudgetModel.create(data)
      .then((createdData) => {
        res.json({ data: createdData, message: 'Datos creados exitosamente.' });
      })
      .catch((error) => {
        handleCreateBudgetError(res, error);
      });
  }
}
  
export function deleteBudget(req, res) {
    let id = req.params.id;
    if (!ObjectId.isValid(id))
        return res.status(400).json({ message: "Id  do not match" });
    BudgetModel.deleteOne({ _id: id })
        .then(() => {
            res.json({ success: true });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}
export function editBudget(req, res) {
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
    BudgetModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
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

















