import React from "react";

function ErrorLabel({ errors, field }) {
  return (
    Array.isArray(errors) &&
    errors
      ?.filter(error => error.path.includes(field))
      ?.map(error => (
        <div key={error.message} className="text-danger">
          {error.message}
        </div>
      ))
  );
}

export default ErrorLabel;
