import React from "react";
import { Link } from "react-router-dom";

const DetailItem = ({ label, value, linkTo }) => (
  <div>
    <p className="text-gray mb-sm">{label}</p>

    {linkTo ? (
      <Link to={linkTo}>
        <p>
          <strong>{value}</strong>
        </p>
      </Link>
    ) : (
      <p>
        <strong>{value}</strong>
      </p>
    )}
  </div>
);
export default DetailItem;
