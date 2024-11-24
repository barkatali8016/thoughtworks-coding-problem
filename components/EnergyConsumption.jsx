import React, { useEffect, useState } from "react";
import { renderChart } from "../utils/chart.js";
import { groupByDay, sortByTime } from "../utils/reading";
import TotalEnergyCard from "./TotalEnergyCard.jsx";

const COST_PER_KWH = 0.138;
const FOOTPRINT = 0.0002532;

export const EnergyConsumption = ({ readings }) => {
  const containerId = "usageChart";
  const [metrics, SetMetrics] = useState([]);
  const [filterOption, SetFilterOption] = useState("LAST_30_DAYS");

  const getChartData = (filterOption) => {
    if (filterOption === "LAST_24_HOURS") {
      return sortByTime(readings).slice(-24);
    } else if (filterOption === "LAST_30_DAYS") {
      return sortByTime(groupByDay(readings)).slice(-30);
    }
  };
  useEffect(() => {
    const chartData = getChartData(filterOption);

    console.log(chartData, "chartData");
    const totalConsumption = chartData.reduce((total, data) => {
      return (total += data.value);
    }, 0);
    const totalCost = totalConsumption * COST_PER_KWH;
    const totalFootprint = totalConsumption * FOOTPRINT;

    SetMetrics([
      {
        title: "Cost",
        metric: Math.round(totalCost),
        unit: "$",
      },
      {
        title: "Consumption",
        metric: Math.round(totalConsumption),
        unit: "kWh",
      },
      { title: "Footprint", metric: totalFootprint.toFixed(4), unit: "tonnes" },
    ]);
    renderChart(containerId, chartData);
  }, [filterOption]);

  const handleFilter = (filterOption) => {
    SetFilterOption(filterOption);
  };

  return (
    <>
      <h1 className="regular darkgray line-height-1 mb3">Energy consumption</h1>
      <section className="mb3">
        <button
          onClick={() => handleFilter("LAST_30_DAYS")}
          className="
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
              border-grey
              bg-blue
              white
              bold
            "
        >
          Last 30 days
        </button>
        <button
          onClick={() => handleFilter("LAST_24_HOURS")}
          className="
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
              border-grey
              bg-blue
              white
              bold
            "
        >
          Last 24 hours
        </button>
      </section>
      <section className="chartHeight mb3">
        <canvas id={containerId} />
      </section>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
        }}
      >
        {metrics.map((metric) => (
          <TotalEnergyCard key={metric.title} {...metric} />
        ))}
      </section>
    </>
  );
};
