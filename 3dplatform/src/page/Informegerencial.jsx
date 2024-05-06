import Sidebardb from "../component/dashboard/Sidebardb";
import AreaChart from "../component/charts/AreaChart";
import CarsInformationGeneralProgress from "../component/tables/CarsInformationGeneralProgress";

function Informegerencial() {
  return (
    <div className="flex ">
      <Sidebardb />
      <div className=" ">
      <CarsInformationGeneralProgress />
        <AreaChart />
      
      </div>
      <div className=" "></div>
    </div>
  );
}

export default Informegerencial;
