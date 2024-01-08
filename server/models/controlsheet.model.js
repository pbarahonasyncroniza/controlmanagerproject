import mongoose from "mongoose";

const ControlsheetSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
    },
    date: {
      type: Date,
    },
    family: {
      type: String,
      required: [true, "family requiere"],
    },
    cod: {
      type: String,
      required: [true, "ID requiere"],
    },
    description: {
      type: String,
      required: [true, "must have name"],
    },
    qty: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
    },
    unitPrice: {
      type: Number,
      default: null,
    },
    subcontractorOffers: {
      type: String,
      default: null,
    },
    total: {
      type: Number,
      default: null,
    },
    proposal1: {
      type: String,
      default: null,
    },
    proposal2: {
      type: String,
      default: null,
    },
    proposal3: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const ControlSheetModel = mongoose.model(
  "ControlSheet",
  ControlsheetSchema
);
