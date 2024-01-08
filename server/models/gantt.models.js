import mongoose from "mongoose";

const GanttSchema = new mongoose.Schema(
  {
    taskID: {
      type: Number,
      required: [true, "ID requiere"],
    },
    taskname: {
      type: String,
      required: [true, "must have name"],
      min: [1, "must have one leter"],
    },
    stardate: {
      type: String,
      default: 0,
    },
    duration: {
      type: Number,
    },
    predecessor: {
      type: String,
      dafault: null
    },
    progress: {
      type: Number,
      default: 0,
    },
    subtask: {
      type: Number,
      dafault: null
    },
  },
  {
    timestamps: true,
  }
);

export const GanttModel = mongoose.model("Gantt", GanttSchema);
