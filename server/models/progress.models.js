import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true, "El nombre actual es obligatorio"],
    },
    week: {
      type: String,
      required: [true, "La fecha es obligatoria"],
    },
    dateStart: {
      type: Date,
    },
    finishdate: {
      type: Date,
    },
    planValue: {
      type: Number,
      default: 0,
      // required: [true, "El valor del plan es obligatorio"],
      // min: [0, "El valor del plan no puede ser negativo"],
    },
    earnValue: {
      type: Number,
      default: 0,
    },
    actualCost: {
      type: Number,
      default: 0,
      // required: [true, "El costo actual es obligatorio"],
      // min: [0, "El costo actual no puede ser negativo"],
    },
  },
  {
    timestamps: true,
  }
);

export const ProgressModel = mongoose.model("progress", ProgressSchema);
