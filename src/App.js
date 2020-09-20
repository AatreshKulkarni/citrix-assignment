import React from "react";

import data from "./Assignment-data.json";
import "./App.css";
import Table from "./components/Table";
import Chart from "./components/Chart";

function App() {
  // Data for Chart component
  const chartData = data.defaultReport.items;
  // Data for Table component
  const tableData = data.defaultReport.aggregated.items;
  return (
    <div className="container">
      {/* Passing "chartData" as prop to Chart Component */}
      <Chart data={chartData} />
      {/* Passing "tableData" as prop to Table Component */}
      <Table items={tableData} />
    </div>
  );
}

export default App;
