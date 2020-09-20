import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  const [chartData, setChartData] = useState({});

  // Generating Chart content
  const chart = () => {
    // x-axis labels
    const labels = props.data.map((data) => {
      let date = new Date(data.dateTime);
      return (
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2)
      );
    });

    const dataSet1 = props.data.map((data) => data.category1);
    const dataSet2 = props.data.map((data) => data.category2);
    const dataSet3 = props.data.map((data) => data.category3);
    const dataSet4 = props.data.map((data) => data.category4);

    // stacked dataset for chart
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Category1",
          data: dataSet1,
          backgroundColor: "#FC5810  ",
          hoverBackgroundColor: "#FC5810 ",
        },
        {
          label: "Category2",
          data: dataSet2,
          backgroundColor: "#225A6E ",
          hoverBackgroundColor: "#225A6E ",
        },
        {
          label: "Category3",
          data: dataSet3,
          backgroundColor: "#10BCFC  ",
          hoverBackgroundColor: "#10BCFC ",
        },
        {
          label: "Category4",
          data: dataSet4,
          backgroundColor: "#FC9810 ",
          hoverBackgroundColor: "#FC9810 ",
        },
      ],
    });
  };

  // using side effects
  useEffect(() => {
    chart();
  }, []);

  return (
    <div id="chartContainer">
      <h2>Time Line Details</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          title: { text: "Time Line Details", display: true },
          tooltips: {
            mode: "label",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: true,
                },
                stacked: true,
                scaleLabel: {
                  display: true,
                  labelString: "No. of occurrences",
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                stacked: true,
              },
            ],
          },
          legend: {
            display: true,
          },
        }}
      />
    </div>
  );
};

export default BarChart;
