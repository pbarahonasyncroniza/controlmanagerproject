import { Types, Error } from "mongoose";
const { ObjectId } = Types;
import { PayApplicationModel } from "../models/PayApplication.model.js";

export function getAllPayApplication(req, res) {
  PayApplicationModel.find({})
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      console.error("Error al obtener facturas:", error); 
      res.status(500).json({ error: "Error interno del servidor" });
    });
}

export function getOnePayApplication(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ message: "id doesn't match the expected format" });
  PayApplicationModel.findOne({ id: id })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}

export function createPayApplication(req, res) {
  let data = req.body;

  // Eliminar el id del frontend antes de guardar en MongoDB
  if (data.id) {
    delete data.id;
  }

  console.log("Datos recibidos para crear factura:", data);

  PayApplicationModel.create(data)
    .then((createdData) => {
      res.json({ data: createdData });
    })
    .catch((error) => {
      console.log("Error al crear factura:", error);
      res.status(500).json({ error: error.message });
      
    });
}

export function deletePayApplication(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id  do not match" });
  PayApplicationModel.deleteOne({ _id: id })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function editPayApplication(req, res) {
  console.log("Received update request for task ID:", req.params.id); // log the task ID
  console.log("Request body:", req.body);

  let id = req.params.id;
  let data = req.body;

  const updateOptions = {
    new: true,
    runValidators: true, 
  };

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id  do not match" });
  PayApplicationModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
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
