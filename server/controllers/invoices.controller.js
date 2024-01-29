import { Types, Error } from "mongoose";
const { ObjectId } = Types;
import { InvoicesModel } from "../models/invoices.model.js";

export function getAllInvoices(req, res) {
  InvoicesModel.find({})
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      console.error("Error al obtener facturas:", error); // Buenas prácticas: registrar el error
      res.status(500).json({ error: "Error interno del servidor" });
    });
}

export function getOneInvoices(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ message: "id doesn't match the expected format" });
  InvoicesModel.findOne({ id: id })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
// export function createInvoices(req, res) {
//   let data = req.body;
//   if (data.id) {
//     delete data.id;
//   }

//   console.log("recived data",data);
//   InvoicesModel.create(data)
//     .then((data) => {
//       res.json({ data: data });
//     })
//     .catch((error) => {
//       // console.log("Error al crear factura:", error);
//       // res.status(500).json({ error: error.message });

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
export function createInvoices(req, res) {
  let data = req.body;

  // Eliminar el id del frontend antes de guardar en MongoDB
  if (data.id) {
    delete data.id;
  }

  console.log("Datos recibidos para crear factura:", data);

  InvoicesModel.create(data)
    .then((createdData) => {
      res.json({ data: createdData });
    })
    .catch((error) => {
      console.log("Error al crear factura:", error);
      res.status(500).json({ error: error.message });
      // No es necesario verificar aquí si es un Error.ValidatorError porque ya estás capturando todos los errores.
    });
}

export function deleteInvoices(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id  do not match" });
  InvoicesModel.deleteOne({ _id: id })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function editInvoices(req, res) {
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
  InvoicesModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
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
