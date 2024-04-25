


import { Types, Error } from "mongoose";
const { ObjectId } = Types;
import { ProjectModel } from "../models/project.models.js";
import { ControlSheetModel } from "../models/controlsheet.model.js";

export function getAllProject(req, res) {
  // Encuentra todos los proyectos
  ProjectModel.find({})
    .then(async (projects) => {
      // Prepara un array para recopilar todos los proyectos con sus hojas de control
      const projectsWithSheets = await Promise.all(
        projects.map(async (project) => {
          // Encuentra las hojas de control asociadas a cada proyecto
          const sheets = await ControlSheetModel.find({
            projectId: project.projectId,
          });
          return { ...project.toJSON(), sheets }; // Combina la información del proyecto con sus hojas
        })
      );

      // Devuelve los proyectos con sus hojas de control
      res.json({ data: projectsWithSheets });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}

export function getOneProject(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ message: "id doesn't match the expected format" });
  GanttModel.findOne({ _id: id })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function createProject(req, res) {
  let data = req.body;
  console.log(data);
  ProjectModel.create(data)
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
export function deleteProject(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id  do not match" });
  ProjectModel.findByIdAndDelete({ _id: id })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}

export function editProject(req, res) {
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
  ProjectModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
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
