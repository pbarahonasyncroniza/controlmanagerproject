import Draggable from "react-draggable";
import { useState } from "react";

const Modal = ({ isOpen, children }) => {
  const minWidth = 450; // Ancho mínimo
  const minHeight = 600; // Altura mínima
  
  const [width, setWidth] = useState(450); // Ancho inicial
  const [height, setHeight] = useState(900); // Altura inicial

  // Función para manejar el redimensionamiento
  const handleResize = (e) => {
    setWidth((prevWidth) => Math.max(prevWidth + e.movementX, minWidth));
    setHeight((prevHeight) => Math.max(prevHeight + e.movementY, minHeight));
  };

  // Función para iniciar el redimensionamiento
  const startResize = (e) => {
    e.stopPropagation(); // Previene el arrastre cuando se inicia el redimensionamiento
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize, { once: true });
  };

  // Función para detener el redimensionamiento
  const stopResize = () => {
    document.removeEventListener("mousemove", handleResize);
  };

  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <Draggable>
        <div className="relative  shadow-lg rounded-xl bg-slate-900 " >
          <div className="p-5 overflow-auto">
            {children}
          </div>
          <div className="absolute bottom-0 right-0 p-2 cursor-se-resize" onMouseDown={startResize}>
            {/* Icono o área para redimensionar */}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default Modal;
