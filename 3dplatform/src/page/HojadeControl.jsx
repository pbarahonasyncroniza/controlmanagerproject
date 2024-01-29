import Sidebardb from "../component/dashboard/Sidebardb";
import MaterialSheetsControl from "../component/tables/MaterialSheetsControl";

const HojadeControl = () => {
  return (
    <div className="flex bg-gradient-to-r from-cyan-700 py-4">
      <Sidebardb />
      <MaterialSheetsControl />
    </div>
  );
};

export default HojadeControl;
