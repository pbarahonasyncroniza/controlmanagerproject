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
    },
    cod: {
      type: String,
    },
    description: {
      type: String,
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
    },
    subcontractorOffers: {
      type: String,
    },
    total: {
      type: Number,
    },
    subfamily: {
      type: String,
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
  "ControlSheetbudget",
  ControlsheetSchema
);
