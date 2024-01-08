import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
     
    },
    projectName: {
      type: String,
      required: [true, "must have name"],
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = mongoose.model("Project", ProjectSchema);
