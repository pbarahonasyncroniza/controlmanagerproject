import { Types, Error} from "mongoose"
const {ObjectId} = Types
import { ProgressModel } from "../models/progress.models.js";



export function getAllProgress(req, res) {
    ProgressModel.find({})
        .then((data) => {
            res.json({data});
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });

}
export function getOneProgress(req, res) {
    let id = req.params.id;
    if (!ObjectId.isValid(id))
        return res.status(400).json({ message: "id doesn't match the expected format" });
    ProgressModel.findOne({ _id: id })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}
export function createProgress(req, res) {
    let data = req.body;
    console.log(data);
    ProgressModel.create(data)
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

















