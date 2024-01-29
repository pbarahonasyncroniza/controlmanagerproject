import Sidebardb from "../component/dashboard/Sidebardb";
import CostLaborControlTable from "../component/tables/CostLaborControlTable";
import MonthCostaLaborTable from "../component/tables/MonthCostaLaborTable";

const LaborCostControl = () => {
  return (
    <div>
      <div className="flex">
        <Sidebardb />
        <MonthCostaLaborTable />
        {/* MOnthCostlaborTable depende Costlaborcontroltable ya que tiene el post y get si se borra no renderiza MonthscostLabor ... channn */}
        <CostLaborControlTable />
      </div>
    </div>
  );
};

export default LaborCostControl;
