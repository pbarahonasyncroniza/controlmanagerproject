const AlertMail = ({ message, showAlert, onClose }) => {
  if (!showAlert) {
    return null;
  }

  return (
    <div className="fixed top-10 center z-50 ">
      <div
        className="bg-green-100 border border-red-400 text-red-700 px-4 py-6  rounded relative mt-2"
        role="alert">
        <strong className="font-bold ">Alert: </strong>
        <span className="">{message}</span>
        <span
          className="absolute top-0 bottom-0 right-0 px-4 py-3 "
          onClick={onClose}>
          <svg
            className="fill-current h-6 w-6 text-red-700  "
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <title>Cerrar</title>
            <path d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.934 2.935a1 1 0 0 1-1.414-1.414l2.935-2.934-2.935-2.934a1 1 0 1 1 1.414-1.414L10 8.586l2.934-2.935a1 1 0 0 1 1.414 1.414L11.414 10l2.934 2.934a1 1 0 0 1 0 1.414z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default AlertMail;
