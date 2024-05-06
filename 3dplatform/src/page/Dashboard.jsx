import Sidebardb from "../component/dashboard/Sidebardb";
import FormAreaChart from "../component/sheetcontrol/FormAreaChart";

const Dashboard = () => {
  return (
    <div className=" flex ">
      <Sidebardb />

      <FormAreaChart />
    </div>
  );
};

export default Dashboard;
