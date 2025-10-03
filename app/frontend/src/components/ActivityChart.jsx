import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ActivityChart({ latest, label = "Value", color = "#10b981" }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (latest !== undefined) {
      setData((prev) => [...prev.slice(-9), { name: new Date().toLocaleTimeString(), value: latest }]);
    }
  }, [latest]);

  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip labelFormatter={(val) => `Time: ${val}`} />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
