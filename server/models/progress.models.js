import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, 'La fecha es obligatoria']
  },
  planValue: {
    type: Number,
    required: [true, 'El valor del plan es obligatorio'],
    min: [0, 'El valor del plan no puede ser negativo']
  },
  earnValue: {
    type: Number,
    default: 0
  },
//   actualCost: {
//     type: Number,
//     required: [true, 'El costo actual es obligatorio'],
//     min: [0, 'El costo actual no puede ser negativo']
//   },
//   projectName: {
//     type: String,
//     required: [true, 'El nombre actual es obligatorio'],
   
//   }
}, {
  timestamps: true
});

export const ProgressModel = mongoose.model("Progress", ProgressSchema);
