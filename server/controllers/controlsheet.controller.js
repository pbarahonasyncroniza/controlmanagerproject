import { Types, Error } from "mongoose";
const { ObjectId } = Types;
import { ControlSheetModel } from "../models/controlsheet.model.js";

export function getAllSheet(req, res) {
  ControlSheetModel.aggregate([
    {
      // Agrupa los documentos por projectId y suma los totales para cada projectId
      $group: {
        _id: "$projectId", // Agrupa por projectId
        totalSum: { $sum: "$total" }, // Suma los valores de total para cada grupo
      },
    },
    {
      $project: {
        _id: 0,
        projectId: "$_id",
        totalSum: 1,
      },
    },
  ])
    .then((result) => {
      // result será un array de objetos, cada uno con un projectId y el totalSum correspondiente
      res.json({ result });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}

export function getOneSheet(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ message: "id doesn't match the expected format" });
  ControlSheetModel.findOne({ _id: id })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function createSheet(req, res) {
  let data = req.body;
  console.log(data);
  ControlSheetModel.create(data)
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
export function deleteSheet(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id  do not match" });
  ControlSheetModel.deleteOne({ _id: id })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function editSheet(req, res) {
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
  ControlSheetModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
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
