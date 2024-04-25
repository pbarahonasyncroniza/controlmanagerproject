import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
    },
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

export const ContractModel = mongoose.model("Contract", ContractSchema);
