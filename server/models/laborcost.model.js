import mongoose from "mongoose";

const LaborCostSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
    },
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    MonthsProj: {
      type: Number,
    },
    Monthscost: {
      type: Number,
    },

    compensation: {
      type: Number,
    },
    deadline: {
      type: Date,
    },
    total: {
      type: Number,
    },
    realmonthcost: {
      type: Number,
    },
    acumulatedrealcost: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const LaborCostModel = mongoose.model("laborcostcontrol", LaborCostSchema);
