import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Chart } from "react-google-charts";
import SectionTitle from "../../shared/SectionTitle";
import useAxiosSecure from "../../../assets/hook/useAxiosSecure";

export const options = {
  title: "Publisher article Percentage",
};

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: news = [] } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axiosSecure.get("/news");
     
      return res.data;
    },
  });

  const satu = news.filter((item) => item.publisher === "satu");
  const nishad = news.filter((item) => item.publisher === "nishad");
  const shova = news.filter((item) => item.publisher === "shova");
  const jim = news.filter((item) => item.publisher === "jim");
  const sahariar = news.filter((item) => item.publisher === "sahariar alam");
 
//pi-chart
  const data = [
    ["Task", "Hours per Day"],
    ["Satu", satu.length],
    ["Nishad", nishad.length],
    ["Shova", shova.length],
    ["Jim", jim.length],
    ["Sahariar Alam", sahariar.length],
  ];
//bar chart
  const data2 = [
    ["Element", "Article", { role: "style" }],
    ["Satu", satu.length, "#b87333"], // RGB value
    ["Nishad", nishad.length, "red"], // English color name
    ["Shova", shova.length, "gold"],
    ["Jim", jim.length, "blue"], // CSS-style declaration
    ["Sahariar Alam", sahariar.length, "color: #e5e4e2"], // CSS-style declaration
  ];
//geo chart
  const data3 = [
    ["Country", "Popularity"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
  ];
  
  return (
    <div>
      <SectionTitle className="py-10" title={"Chart"}></SectionTitle>
      <div className="flex">
        <div>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"110%"}
            height={"400px"}
          />
        </div>
        <div>
          <Chart
            chartType="ColumnChart"
            width="110%"
            height="400px"
            data={data2}
          />
        </div>
      </div>
      <div>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = data[selection[0].row + 1];
              console.log("Selected : " + region);
            },
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="400px"
        data={data3}
      />
      </div>
    </div>
  );
};

export default Statistics;



