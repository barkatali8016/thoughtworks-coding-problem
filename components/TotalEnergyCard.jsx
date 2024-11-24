import React from "react";

import "./TotalEnergyCard.css";

function TotalEnergyCard({ title, metric, unit }) {
  return (
    <div className="total-energy-card shadow-2">
      <p className="title">{title}</p>
      <p className="metric">{metric}</p>
      <p className="unit">{unit}</p>
    </div>
  );
}

export default TotalEnergyCard;
