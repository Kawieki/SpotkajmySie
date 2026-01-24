import React from "react";

const FormErrors = ({ backendErrors }) => {
  if (!backendErrors) return null;

  const errorsObj = backendErrors?.errors ?? backendErrors?.validationErrors;

  let messages = [];

  if (errorsObj && typeof errorsObj === "object") {
    messages = Object.values(errorsObj).flat().filter(Boolean);
  } else {
    const m =
      typeof backendErrors === "string"
        ? backendErrors
        : (backendErrors?.detail ?? backendErrors?.message);
    if (m) messages = Array.isArray(m) ? m : [m];
  }

  if (!messages || messages.length === 0) return null;

  return (
    <div className={"form-error-container"}>
      <div className="auth-error" style={{ width: "50%", padding: "1rem" }}>
        <div style={{ marginBottom: "0.5rem", fontWeight: "700" }}>
          Wystąpił błąd
        </div>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{ marginBottom: i === messages.length - 1 ? 0 : "0.5rem" }}
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormErrors;
