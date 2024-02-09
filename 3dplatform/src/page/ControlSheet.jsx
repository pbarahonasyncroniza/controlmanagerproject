import Sidebardb from "../component/dashboard/Sidebardb";
import ControlSheet from "../component/sheetcontrol/ControlSheet";
import FormBudget from "../component/sheetcontrol/FormBudget";
import BudgetAvailable from "../component/project/BudgetAvailable";
import ProjectInformation from "../component/project/ProjectInformation";
import DataControlSheet from "../component/sheetcontrol/DataControlSheet";
import KpiByFamily from "../component/project/KpiByFamily";

const ControlSheetMain = () => {
  return (
    <div className="flex ">
      <div className="flex">
        <Sidebardb />
      </div>
      <div>
        <ControlSheet />
        <ProjectInformation />
        <BudgetAvailable />
        <KpiByFamily />
        <div className="mt-4 ml-2">
          <FormBudget />
        </div>
      </div>
      <DataControlSheet />
    </div>
  );
};

export default ControlSheetMain;
