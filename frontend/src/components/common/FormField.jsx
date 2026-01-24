import React from "react";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder = "",
  helpText = "",
  className = "",
  children,
  ...props
}) => {
  const baseClass = error ? "error" : "";
  const inputClasses = {
    input: `form-input ${baseClass} ${className}`,
    textarea: `form-textarea ${baseClass} ${className}`,
    select: `form-select ${baseClass} ${className}`,
  };

  return (
    <div className="form-group">
      <label
        htmlFor={name}
        className={`form-label ${required ? "required" : ""}`}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={inputClasses.textarea}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          className={inputClasses.select}
          value={value}
          onChange={onChange}
          {...props}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className={inputClasses.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
      {error && <span className="form-error">{error}</span>}
      {helpText && <span className="form-help">{helpText}</span>}
    </div>
  );
};

export default FormField;
