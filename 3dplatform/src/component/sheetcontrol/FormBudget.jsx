import { useState, useContext, useEffect } from "react";
import Modal from "../Modal";
import axios from "axios";
import { ViewerContext } from "../Context";

const FormBudget = () => {
  const { isModalOpenBudget, setIsMoldalOpenBudget, updateisModalOpenBudget } =
    useContext(ViewerContext);

  const [projectId, setProjectId] = useState("");
  const [date, setDate] = useState("");
  const [family, setFamily] = useState("");
  const [cod, setCod] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [subcontractorOffers, setSubcontractorsOffers] = useState("");
  const [qty, setQty] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [proposal1, setProposal1] = useState("");
  const [proposal2, setProposal2] = useState("");
  const [proposal3, setProposal3] = useState("");

  const closeModalBudget = () => updateisModalOpenBudget(false);

  const handleSubmitSheet = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/sheet/", {
      projectId,
      date,
      family,
      cod,
      description,
      qty,
      unit,
      unitPrice,
      subcontractorOffers,
      total,
      proposal1,
      proposal2,
      proposal3,
    });
  };

  useEffect(() => {
    const numQuantity = Number(qty);
    const numUnitPrice = Number(unitPrice);

    if (!isNaN(numQuantity) && numUnitPrice) {
      setTotal(qty * unitPrice);
    }
  }, [qty, unitPrice]);

  return (
    <div className=" ">
      <Modal className="" isOpen={isModalOpenBudget} onClose={closeModalBudget}>
        <h1 className="text-2xl font-blod mb-2 text-white">Purchase Form</h1>
        <form className="" onSubmit={handleSubmitSheet}>
          <div className="bg-slate-900 ">
            <div className="flex gap-2 ">
              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  ProjectId
                </label>
                <input
                  className="  bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500  "
                  placeholder="ProjectId"
                  type="text"
                  name="ProjectId"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                />
              </div>
              <div className="">
                <label className="text-lg text-white font-bolt mb-2  ">
                  Date
                </label>
                <input
                  className="  bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                  placeholder="Date"
                  type="date"
                  name="type"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 ">
              <div className="">
                <label className="text-lg text-white font-bolt mb-2  ">
                  Family Product
                </label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500  w-full"
                  placeholder="Family"
                  type="text"
                  name="type"
                  value={family}
                  onChange={(e) => setFamily(e.target.value)}
                />
              </div>
              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  Cod
                </label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex  mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
                  placeholder="Cod"
                  type="text"
                  name="cod"
                  value={cod}
                  onChange={(e) => setCod(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-lg text-white font-bolt mb-2 ">
                Description
              </label>
              <input
                className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
                placeholder="Description"
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="">
              <div className="flex">
                <div className="">
                  <label className="text-lg text-white font-bolt mb-2 ">
                    Qty
                  </label>
                  <input
                    className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500  w-full"
                    placeholder="Qty"
                    type="text"
                    name="qty"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
                <div className="">
                  <div>
                    <label className="text-lg text-white font-bolt mb-2 ">
                      Unit
                    </label>
                    <input
                      className=" bg-slate-700 rounded-lg mb-2 mt-2 flex  mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full "
                      placeholder="Unit"
                      type="text"
                      name="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  Unit Price
                </label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500 p-2"
                  placeholder="Unit Price"
                  type="number"
                  name="unitprice "
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>

              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  subcontractorOffers
                </label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
                  placeholder="subcontractorOffers"
                  type="text"
                  name="SubcontractorOffers "
                  value={subcontractorOffers}
                  onChange={(e) => setSubcontractorsOffers(e.target.value)}
                />
              </div>
              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  Total
                </label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                  placeholder="Total"
                  type="number"
                  name="total"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                />
              </div>
              {/* <div className="">
                <label className="text-sm font-semibolt ">Proposal 1</label>
                <input
                  className="border border-solid bg-blue-500 rounded-lg mb-2 flex mr-2  text-white w-full"
                  placeholder="proposal1"
                  type="number"
                  name="proposal1"
                  value={proposal1}
                  onChange={(e) => setProposal1(e.target.value)}
                />
              </div>
              <div className="">
                <label className="text-sm font-semibolt ">Proposal 2</label>
                <input
                  className="border border-solid bg-blue-500 rounded-lg mb-2 flex mr-2  text-white w-full"
                  placeholder="proposal2"
                  type="number"
                  name="proposal2"
                  value={proposal2}
                  onChange={(e) => setProposal2(e.target.value)}
                />
              </div>
              <div className="">
                <label className="text-sm font-semibolt ">Proposal 3</label>
                <input
                  className="border border-solid bg-blue-500 rounded-lg mb-2 flex mr-2  text-white w-full"
                  placeholder="proposal3"
                  type="number"
                  name="proposal3"
                  value={proposal3}
                  onChange={(e) => setProposal3(e.target.value)}
                />
              </div> */}
            </div>
          </div>
          <div className="flex justify-between">
            <button className="bg-green-500 font-semibold rounded-xl text-white p-3 mt-2  mb-2">
              Submit Tasks
            </button>
            <button
              onClick={closeModalBudget}
              className="bg-red-500 rounded-xl text-white font-semibold p-3 mt-2  mb-2">
              Close Form
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FormBudget;
