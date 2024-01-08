import mongoose from "mongoose";

const mongoConnect = async () => {
  return mongoose
    .connect(process.env.MONGO_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conectado a MongoDB");
    })
    .catch((error) => {
      console.error("Error conectando a MongoDB:", error);
      // Es importante manejar el rechazo de la promesa aquí
      process.exit(1);
    });
};

const insertGanttData = async () => {
  const myobj = [
    {
      TaskID: 1,
      TaskName: "Parent Task 1",
      StartDate: new Date("02/23/2017"),
      EndDate: new Date("02/27/2017"),
      Progress: "40",
    },
    {
      TaskID: 2,
      TaskName: "Child Task 1",
      StartDate: new Date("02/23/2017"),
      EndDate: new Date("02/27/2017"),
      Progress: "40",
      parentID: 1,
    },
    {
      TaskID: 3,
      TaskName: "Child Task 2",
      StartDate: new Date("02/23/2017"),
      EndDate: new Date("02/27/2017"),
      Progress: "40",
      parentID: 1,
    },
    {
      TaskID: 4,
      TaskName: "Child Task 3",
      StartDate: new Date("02/23/2017"),
      EndDate: new Date("02/27/2017"),
      Duration: 5,
      Progress: "40",
      parentID: 1,
    },
    {
      TaskID: 5,
      TaskName: "Parent Task 2",
      StartDate: new Date("03/14/2017"),
      EndDate: new Date("03/18/2017"),
      Progress: "40",
    },
    {
      TaskID: 6,
      TaskName: "Child Task 1",
      StartDate: new Date("03/02/2017"),
      EndDate: new Date("03/06/2017"),
      Progress: "40",
      parentID: 5,
    },
    {
      TaskID: 7,
      TaskName: "Child Task 2",
      StartDate: new Date("03/02/2017"),
      EndDate: new Date("03/06/2017"),
      Progress: "40",
      parentID: 5,
    },
    {
      TaskID: 8,
      TaskName: "Child Task 3",
      StartDate: new Date("03/02/2017"),
      EndDate: new Date("03/06/2017"),
      Progress: "40",
      parentID: 5,
    },
    {
      TaskID: 9,
      TaskName: "Child Task 4",
      StartDate: new Date("03/02/2017"),
      EndDate: new Date("03/06/2017"),
      Progress: "40",
      parentID: 5,
    },
    {
      TaskID: 10,
      TaskName: "Parent Task 3",
      StartDate: new Date("03/09/2017"),
      EndDate: new Date("03/13/2017"),
      Progress: "40",
    },
    {
      TaskID: 11,
      TaskName: "Child Task 1",
      StartDate: new Date("03/9/2017"),
      EndDate: new Date("03/13/2017"),
      Progress: "40",
      parentID: 10,
    },
    {
      TaskID: 12,
      TaskName: "Child Task 2",
      StartDate: new Date("03/9/2017"),
      EndDate: new Date("03/13/2017"),
      Progress: "40",
      parentID: 10,
    },
    {
      TaskID: 13,
      TaskName: "Child Task 3",
      StartDate: new Date("03/9/2017"),
      EndDate: new Date("03/13/2017"),
      Progress: "40",
      parentID: 10,
    },
    {
      TaskID: 14,
      TaskName: "Child Task 4",
      StartDate: new Date("03/9/2017"),
      EndDate: new Date("03/13/2017"),
      Progress: "40",
      parentID: 10,
    },
    {
      TaskID: 15,
      TaskName: "Child Task 5",
      StartDate: new Date("03/9/2017"),
      EndDate: new Date("03/13/2017"),
      Progress: "40",
      parentID: 10,
    },
    {
      TaskID: 16,
      TaskName: "Parent task",
      StartDate: new Date("03/9/2017"),
      EndDate: new Date("03/13/2017"),
      Progress: "40",
    },
    {
      TaskID: 17,
      TaskName: "child",
      StartDate: new Date("03/9/2017"),
      EndDate: new Date("03/13/2017"),
      Progress: "40",
      parentID: 16,
    },
    {
      TaskID: 18,
      TaskName: "grand child",
      StartDate: new Date("03/9/2017"),
      EndDate: new Date("03/13/2017"),
      Progress: "40",
      parentID: 17,
    },

  ];

  try {
    await GanttModel.insertMany(myobj);
    console.log("Datos añadidos");
  } catch (error) {
    console.error("Error insertando datos:", error);
  }
};

export default mongoConnect;
