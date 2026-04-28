import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ProductionChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Line type="monotone" dataKey="production" stroke="#1677ff" />
        <Line type="monotone" dataKey="revenue" stroke="#52c41a" />
        <Line type="monotone" dataKey="profit" stroke="#faad14" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProductionChart;