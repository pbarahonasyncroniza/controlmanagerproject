import Sidebardb from "../component/dashboard/Sidebardb";
import ControlSheet from "../component/sheetcontrol/ControlSheet";
import FormBudget from "../component/sheetcontrol/FormBudget";
import ProjectData from "../component/project/ProjectData";
import BudgetAvailable from "../component/project/BudgetAvailable";
import ProjectInformation from "../component/project/ProjectInformation";
import KpiProjects from "../component/project/KpiProjects";
import DataControlSheet from "../component/sheetcontrol/DataControlSheet";
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
       
        <div className="mt-4 ml-2">
          <FormBudget />
          <ProjectData />
        </div>
      </div>
      <KpiProjects />
      <DataControlSheet />
    </div>
  );
};

export default ControlSheetMain;
