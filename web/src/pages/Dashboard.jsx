import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 8000 },
  { month: "Apr", revenue: 18000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 17000 },
  { month: "Jul", revenue: 25000 },
  { month: "Aug", revenue: 20000 },
  { month: "Sep", revenue: 23000 },
  { month: "Oct", revenue: 27000 },
  { month: "Nov", revenue: 30000 },
  { month: "Dec", revenue: 35000 },
];

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Doanh thu hàng tháng</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
