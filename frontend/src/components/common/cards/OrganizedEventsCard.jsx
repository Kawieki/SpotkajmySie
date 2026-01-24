import React from "react";
import OrganizedEventItem from "../Items/OrganizedEventItem.jsx";

const OrganizedEventsCard = ({ user }) => {
  const events = user.organizedEvents;
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          Wydarzenia organizowane ({user.organizedEventsCount || "0"})
        </h2>
        <div className="card-body">
          {events &&
            events.map((event) => (
              <OrganizedEventItem event={event} key={event.id} compact />
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizedEventsCard;
