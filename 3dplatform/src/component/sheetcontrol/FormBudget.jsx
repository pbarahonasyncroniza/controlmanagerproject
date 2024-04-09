import { useContext, useEffect } from "react";
import Modal from "../Modal";
import axios from "axios";
import { ViewerContext } from "../Context";


const FormBudget = () => {
  const {
    isModalOpenBudget,
    setIsModalOpenBudget,
    projectId,
    setProjectId,
    date,
    setDate,
    isEditMode,
    currentSheetId,
    family,
    setFamily,
    cod,
    setCod,
    description,
    setDescription,
    unit,
    setUnit,
    subcontractorOffers,
    setSubcontractorsOffers,
    qty,
    setQty,
    unitPrice,
    setUnitPrice,
    total,
    setTotal,
    subfamily,
    setSubfamily,
  } = useContext(ViewerContext);


  const handleSubmitSheet = async (e) => {
    e.preventDefault();

    const sheetData = {
      projectId: projectId,
      date: date,
      family: family,
      cod: cod,
      description: description,
      qty: qty,
      unit: unit,
      unitPrice: unitPrice,
      subcontractorOffers: subcontractorOffers,
      total: total,
      subfamily: subfamily,
    };

    try {
      
      if (isEditMode) {
        resetForm();
        await axios.patch(
          `http://localhost:8000/sheet/${currentSheetId}`,
          sheetData
        );
      } else {
         await axios.post("http://localhost:8000/sheet/", sheetData);
      }

      closeModelBudget(); // Cierra el modal y limpia el formulario después de una operación exitosa
    } catch (err) {
      console.error("Error submitting sheet:", err);
    }
  };

  // limpia formulario
  const resetForm = () => {
    setProjectId("");
    setDate("");
    setFamily("");
    setCod("");
    setDescription("");
    setUnit("");
    setSubcontractorsOffers("");
    setQty(1);
    setUnitPrice(0);
    setTotal(0);
    setSubfamily("");
  };

  const closeModelBudget = () => {
    setIsModalOpenBudget(false);
    if (isEditMode) {
      resetForm();
    }
  };

  useEffect(() => {
    const numQuantity = Number(qty);
    const numUnitPrice = Number(unitPrice);

    if (!isNaN(numQuantity) && numUnitPrice) {
      setTotal(qty * unitPrice);
    }
  }, [qty, unitPrice,setTotal]);

  return (
    <div className=" ">
      <Modal className="" isOpen={isModalOpenBudget}>
        <h1 className="text-2xl font-blod mb-2 text-white">
          {isEditMode ? "Modo Editar" : "Modo Crear"}
        </h1>
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
                  Fecha
                </label>
                <input
                  className="  bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                  placeholder="Fecha"
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
                  Familia
                </label>
                <select
                  className="text-lg  font-bolt   bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                  name="family"
                  value={family}
                  onChange={(e) => setFamily(e.target.value)}>
                  <option value="">Selecionar una Familia</option>
                  <option value="Subcontrato">Subcontrato</option>
                  <option value="Material">Material</option>
                  <option value="Arriendos">Arriendos</option>
                  <option value="Mano_Obra">Mano_Obra</option>
                  <option value="Otros">Otros</option>
                  <option value="GG">GG</option>
                </select>
              </div>
              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">OC</label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex  mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
                  placeholder="OC"
                  type="text"
                  name="cod"
                  value={cod}
                  onChange={(e) => setCod(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-lg text-white font-bolt mb-2 ">
                Descripcion
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
                    Cantidad
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
                      Unidad
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
                  Precio unitario
                </label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2  text-white border-solid border-4 border-gray-500 p-2"
                  placeholder="Unit Price"
                  type="number"
                  name="unitprice "
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>

              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  Subcontrato/Proveedor
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
                  Hoja de Control
                </label>
                <select
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
                  type="text"
                  name="SubcontractorOffers "
                  value={subfamily}
                  onChange={(e) => setSubfamily(e.target.value)}>
                  <option value="">Selecionar una HC</option>
                  <option value="Aridos_cemento_Morteros_Afinado _andamios ">
                    Aridos_cemento_Morteros_Afinado _andamios
                  </option>
                  <option value="Cerrajeria">Cerrajeria</option>
                  <option value="Desbaste_yeso_Cornizas">
                    Desbaste_yeso_Cornizas
                  </option>
                  <option value="Fierro">Fierro</option>
                  <option value="Hormigones">Hormigones</option>
                  <option value="Inst_faena">Inst_faena</option>
                  <option value="Inst_Sanitarias ">Inst_Sanitarias</option>
                  <option value="Instalacion_Moldaje">
                    Instalacion_Moldaje{" "}
                  </option>
                  <option value="Instalacion_Tabiques">
                    Instalacion_Tabiques
                  </option>
                  <option value="Instalaciones_Electricas">
                    {" "}
                    Instalaciones_Electricas
                  </option>
                  <option value="Madera_Fijaciones_varios ">
                    Madera_Fijaciones_varios
                  </option>
                  <option value="Moldaje">Moldaje</option>
                  <option value="Arriendo_Moldaje">Arriendo_Moldaje</option>
                  <option value="Mano_Obra">Mano_Obra</option>
                  <option value="Movimiento_Tierra">Movimiento_Tierra</option>
                  <option value="Muebles">Muebles</option>
                  <option value="Otros">Otros</option>
                  <option value="Papel_mural_revestimiento">
                    Papel_mural_revestimiento
                  </option>
                  <option value="Pavimentos-Ceramicas">
                    Pavimentos-Ceramicas
                  </option>
                  <option value="Pintura">Pintura</option>
                  <option value="puertas_cerraduras">puertas_cerraduras</option>
                  <option
                    value="Socalzado
                  ">
                    Socalzado
                  </option>
                  <option
                    value="Tabiqueria
                  ">
                    Tabiqueria
                  </option>
                  <option
                    value="Terminaciones
                  ">
                    Terminaciones
                  </option>
                  <option
                    value="Ventanas
                  ">
                    Ventanas
                  </option>
                  <option
                    value="Subcontrato_Fierro

                  ">
                    Subcontrato_Fierro
                  </option>
                </select>
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
            </div>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-green-500 font-semibold rounded-xl text-white p-3 mt-2  mb-2"
              type="submit">
              Submit Tasks
            </button>
            <button
              onClick={closeModelBudget}
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
