import React from "react";

import data from "./Assignment-data.json";
import "./App.css";
import Table from "./components/Table";
import Chart from "./components/Chart";

function App() {
  const chartData = data.defaultReport.items;
  const tableData = data.defaultReport.aggregated.items;
  return (
    <div className="container">
      <Chart data={chartData} />
      <Table items={tableData} />
    </div>
  );
}

export default App;
