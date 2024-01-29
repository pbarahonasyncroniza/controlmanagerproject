import { useEffect, useContext } from "react";
import { ViewerContext } from "../Context";
import axios from "axios";
import Exceltransform from "../Exceltransform";

const BudgetAvailable = () => {
  const {
    getDataBudget,
    setGetDataBudget: updateGetDataBudget,
    filters,
    setFilters: updateFilters,
    setTotalBudget,
    filteredProjectId,
    setFilteredProjectId,
  } = useContext(ViewerContext);

  useEffect(() => {
    const getBudgetData = async () => {
      const getDataResponse = await axios.get("http://localhost:8000/budget");
     
      if (
        Array.isArray(getDataResponse.data.data) &&
        getDataResponse.data.data.length > 0
      )
        updateGetDataBudget(getDataResponse.data.data);
      setTotalBudget(getDataResponse.data.aggregateResults);
      // console.log("aggregation", getDataResponse.data.aggregateResults);
    };

    getBudgetData();
  }, [filters]);

  // controla filtro del proyecto
  const handlerFilterChange = (filterName, value) => {
    // console.log("Valor pasado a setFilteredProjectId: ", value.trim());
    if (filterName === "projectId") {
      setFilteredProjectId(value.trim());
    }
    updateFilters({
      ...filters,
      [filterName]: value.trim(),
    });
  };

  const filteredData = getDataBudget.filter((item) => {
    return (
      Object.keys(filters).every((filterName) => {
        const filterValue = filters[filterName]
          ? filters[filterName].toLowerCase()
          : "";
        const itemValue = String(item[filterName]).toLowerCase();
        return itemValue.includes(filterValue);
      }) &&
      (!filteredProjectId || item.projectId === filteredProjectId)
    );
  });
  //  console.log("filteredDataaaaaaaaaaa",filteredData)

  // controla el formato de la moneda
  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="bg-slate-100 ml-4 mr-6 mt-4 shadow-lg  rounded-lg">
      <Exceltransform UrlEndpoint="http://localhost:8000/budget/" />

      {/* <h1 className="text-lg mt-2 ml-2 font-semibold">
        CONTROL SHEETS PLANNED
      </h1> */}
      {/* <div className="flex mb-3"> */}
        {/* <div className="">
          <label className="ml-2 mt-5 text-sm bg-blue-500 text-white px-4 py-1 w-80 rounded-lg">
            Project Id
          </label>
          <input
            className="ml-4 text-sm bg-slate-300 rounded-lg border border-solid p-1"
            type="text"
            value={filters.projectId}
            onChange={(e) =>
              handlerFilterChange("projectId", e.target.value)
            }></input>
        </div> */}
        {/* <div>
          <div>
            <label className="ml-4 mt-5 text-sm bg-blue-500 text-white p-1 w-80 rounded-lg">
              Family
            </label>
            <input
              className="ml-4 text-sm bg-slate-300 rounded-lg border border-solid p-1"
              type="text"
              value={filters.family}
              onChange={(e) =>
                handlerFilterChange("family", e.target.value)
              }></input>
          </div>
        </div> */}
      {/* </div> */}
      <div className="max-h-[300px] overflow-y-auto border-b-4">
        {/* <table className="table-auto mt-4 mb-2 border-collapse border border-slate-500 ml-2">
          <thead className="sticky top-0 bg-cyan-700 text-white">
            <tr className="border border-slate-300 px-4 text-sm ">
              <th className="border border-slate-300 px-4  ">ProjectId</th>
              <th className="border border-slate-300 px-4 text-xs   ">Cod</th>
              <th className="border border-slate-300 px-4 text-xs   ">
                TaskName
              </th>
              <th className="border border-slate-300 px-4 text-xs   ">Unit</th>
              <th className="border border-slate-300 px-4 text-xs   ">Qty</th>
              <th className="border border-slate-300 px-4 text-xs   ">
                Unit Price
              </th>
              <th className="border border-slate-300 px-4 text-xs   ">
                Total Price
              </th>
              <th className="border border-slate-300 px-4 text-xs   ">
                Family
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="border border-slate-300 px-4 text-xs   ">
                  {item.projectId}
                </td>
                <td className="border border-slate-300 px-4 text-xs ">
                  {item.cod}
                </td>

                <td className="border border-slate-300 px-4 text-xs  ">
                  {item.taskName}
                </td>
                <td className="border border-slate-300 px-4 text-xs  ">
                  {item.qty}
                </td>
                <td className="border border-slate-300 px-4 text-xs ">
                  {item.unit}
                </td>
                <td className="border border-slate-300 px-4 text-xs ">
                  {formatCurrency(item.unitPrice)}
                </td>
                <td className="border border-slate-300 px-4 text-xs ">
                  {formatCurrency(item.totalPrice)}
                </td>
                <td className="border border-slate-300 px-4 text-xs  ">
                  {item.family}
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
      {/* ENTREGA EL VALOR DEL TOTAL DEL PROYECTO  */}
    </div>
  );
};

export default BudgetAvailable;
