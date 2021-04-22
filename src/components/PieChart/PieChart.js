import React, { Component } from "react";

import { PieChart } from "react-minimal-pie-chart";

class ChartPie extends Component {
  state = {
    data: [],
  };

  componentWillMount() {
    // cia perkelem i renderi, nes cia uzkrauna tik tada viena karta
  }

  render() {
    let data1 = this.props.infoChart
      .filter((item) => item.status === "Apmokėta")
      .reduce((a, item) => a + item.total, 0);

    let data2 = this.props.infoChart
      .filter((item) => item.status === "Neapmokėta")
      .reduce((a, item) => a + item.total, 0);

    let data = [
      { title: "Apmokėta", value: data1, color: "rgb(153, 230, 153)" },
      { title: "Neapmokėta", value: data2, color: "rgb(255, 77, 77)" },
    ];

    return (
      <div
        style={{
          width: "60%",
          height: "290px",
          border: "4px solid #D8D8D8",
          padding: "10px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <PieChart
          data={data}
          label={({ dataEntry }) => {
            return `${Math.round(dataEntry.value)} EUR`;
          }}
          animate={true}
          animationDuration={5000}
          lineWidth={40}
          labelStyle={(index) => ({
            fontSize: "5px",
            fontFamily: "sans-serif",
          })}
          labelPosition={80}
        />
      </div>
    );
  }
}

export default ChartPie;
