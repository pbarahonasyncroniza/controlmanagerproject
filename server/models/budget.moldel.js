import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
    },
    cod: {
      type: String,
    },
    taskName: {
      type: String,
    },
    unit: {
      type: String,
    },
    qty: {
      type: Number,
    },
    unitPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    family: {
      type: String,
    },
    subfamily: {
      type: String,
    },
    // item: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

export const BudgetModel = mongoose.model("Uploadbudgetcost", BudgetSchema);
