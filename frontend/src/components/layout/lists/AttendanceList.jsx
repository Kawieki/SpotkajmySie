import React from "react";
import { getStatusBadge } from "../../../utils/BadgesHelper.js";

const AttendanceList = ({ registrations, totalAttendance }) => {
  return (
    <div className="card mt-lg">
      <div className="card-header">
        <h2 className="card-title">
          Uczestnictwo w wydarzeniach ({totalAttendance})
        </h2>
      </div>
      <div className="card-body">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Wydarzenie</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id}>
                  <td>{reg.title}</td>
                  <td>{reg.startDate}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(reg.status)}`}>
                      {reg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
