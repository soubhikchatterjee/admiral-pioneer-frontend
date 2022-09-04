import React from "react";

function Alert({ type = "success", message = "" }) {
  return (
    <div className={`alert alert-${type} mt-5`} role="alert">
      {message}
    </div>
  );
}

export default Alert;
