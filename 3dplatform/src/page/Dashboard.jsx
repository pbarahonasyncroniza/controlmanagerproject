import Navigation from "../component/dashboard/Navigation";
import Sidebardb from "../component/dashboard/Sidebardb";
import FormAreaChart from "../component/dashboard/FormAreaChart";



const Dashboard = () => {
  return (
    <div className=" flex ">
      <Sidebardb />
      <Navigation />
      <FormAreaChart/>
    </div>
  );
};

export default Dashboard;
