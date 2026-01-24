import React from "react";
import { Link } from "react-router-dom";

const PageHeader = ({ title, description, action, address, hasPermission }) => {
  return (
    <section className="page-header">
      <div className="container">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
        {hasPermission && (
          <div className="page-actions">
            <Link to={address} className="btn btn-primary">
              {action}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
