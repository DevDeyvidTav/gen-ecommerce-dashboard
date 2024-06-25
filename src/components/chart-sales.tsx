import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  { date: "10/12", revenue: 1200 },
  { date: "11/12", revenue: 800 },
  { date: "12/12", revenue: 900 },
  { date: "13/12", revenue: 400 },
  { date: "14/12", revenue: 2300 },
  { date: "15/12", revenue: 800 },
  { date: "16/12", revenue: 640 },
];
export function ChartSales() {
  return (
    <ResponsiveContainer width="80%" height={240}>
      <LineChart data={data} style={{ fontSize: 12 }}>
        <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
        <YAxis
          stroke="#888"
          axisLine={false}
          tickLine={false}
          width={80}
          tickFormatter={(value: number) =>
            value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }
        />
        <CartesianGrid vertical={false} className="stroke-muted" />
        <Line
          stroke={"#E72F2B"}
          type="linear"
          strokeWidth={2}
          dataKey="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
