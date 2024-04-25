import Sidebardb from "../component/dashboard/Sidebardb";
import MaterialSheetsControl from "../component/tables/MaterialSheetsControl";
import IdentificationHeader from "../component/tables/IdentificationHeader";
import CarsInformationSheets from "../component/tables/CarsInformationSheets";
import Invoices from "../component/tables/Invoices";
import PurchaseOrderTable from "../component/tables/PurchaseOrderTable";
import ContractObservationByForm from "../component/tables/ContractObservationByForm";
import IncreaseAndDiscountByForm from "../component/tables/IncreaseAndDiscountByForm";

const HojadeControl = () => {
  return (
    <div className="flex bg-gradient-to-r from-cyan-700 py-4 w-600 md:w-3/4 xl:w-full">
      <Sidebardb />
      <div>
        <MaterialSheetsControl />
        <IdentificationHeader />
        <CarsInformationSheets />
        <div className="grid grid-cols-2">
          <ContractObservationByForm />
          <IncreaseAndDiscountByForm />
        </div>
        <Invoices />
        <PurchaseOrderTable />
      </div>
    </div>
  );
};

export default HojadeControl;
