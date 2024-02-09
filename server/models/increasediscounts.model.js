import mongoose from "mongoose";

const IncreasediscountSchema = new mongoose.Schema(
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
    Detalle: {
      type: String,
    },
    Aumentodisminuciones: {
      type: String,
    },
    Real: {
      type: Number,
    },
    Recuperable: {
      type: Number,
    },
    Observaciones: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const IncreasesDiscountModel = mongoose.model(
  "IncreasesDiscount",
  IncreasediscountSchema
);
