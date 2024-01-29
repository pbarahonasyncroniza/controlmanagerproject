import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
  {
    family: {
      type: String,
    },
    subfamily: {
      type: String,
    },
    Glosa: {
      type: String,
    },
    Descripcion: {
      type: String,
    },
    Proyectado: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const ContractModel = mongoose.model(
  "Contractobservations",
  ContractSchema
);
