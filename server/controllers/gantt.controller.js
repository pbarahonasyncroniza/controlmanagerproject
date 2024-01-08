import { Types, Error} from "mongoose"
const {ObjectId} = Types
import { GanttModel } from "../models/gantt.models.js";



export function getAllTask(req, res) {
    GanttModel.find({})
        .then((data) => {
            res.json({data});
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });

}
export function getOneTask(req, res) {
    let id = req.params.id;
    if (!ObjectId.isValid(id))
        return res.status(400).json({ message: "id doesn't match the expected format" });
    GanttModel.findOne({ _id: id })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}
export function createTask(req, res) {
    let data = req.body;
    console.log(data);
    GanttModel.create(data)
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
export function deleteTask(req, res) {
    let id = req.params.id;
    if (!ObjectId.isValid(id))
        return res.status(400).json({ message: "Id  do not match" });
    GanttModel.deleteOne({ _id: id })
        .then(() => {
            res.json({ success: true });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}
export function editTask(req, res) {
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
    GanttModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
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

















