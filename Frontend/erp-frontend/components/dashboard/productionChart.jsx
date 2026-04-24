import { Line } from "@ant-design/charts";
import { data } from "react-router-dom";

const productionChart = ({ stats }) =>{
  // conver recent users into chart data
  const chartData = stats?.recentUsers?.map((user) => ({
    date: new Date(user.createdAt).toLocaleDateString(),
    users: 1
  }))  || [];

  // group by date
  const groupedData = Object.values(
    chartData.reduce((acc, curr) =>{
      if(!acc[curr.date]) {
        acc[curr.date] = { date: curr.date,  users: 0};
      }
      acc[curr.date].users += 1;
      return acc;
    }, {})
  );

  const config = {
    data: groupedData,
    xField: "date",
    yField: "users",
    point: { size: 5 },
    smooth: true,
  };
  return <Line {...config} />
};

export default productionChart;