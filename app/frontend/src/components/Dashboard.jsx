import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { AiOutlineQuestionCircle } from "react-icons/ai";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard({ stats }) {
  if (!stats) return <p className="text-center mt-10 text-xl">Waiting for live data...</p>;

  const cpuData = {
    labels: stats.historyTime,
    datasets: [
      {
        label: "CPU Usage (%)",
        data: stats.cpuHistory,
        borderColor: "rgba(34,197,94,1)",
        backgroundColor: "rgba(34,197,94,0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const memoryData = {
    labels: stats.historyTime,
    datasets: [
      {
        label: "Memory Usage (GB)",
        data: stats.memoryHistory,
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard title="CPU Usage" value={`${stats.cpuUsage}%`} tooltip="Real-time CPU usage" chart={<Line data={cpuData} options={{ plugins: { legend: { display: false } }, responsive: true }} />} warning={stats.cpuUsage>80} />

      <MetricCard title="Memory Usage" value={`${stats.memoryUsage.toFixed(2)} GB`} tooltip="Used memory in GB" chart={<Line data={memoryData} options={{ plugins: { legend: { display: false } }, responsive: true }} />} warning={stats.memoryUsage>stats.systemInfo.totalMem*0.8} />

      <MetricCard title="Disk Usage" value={`${stats.disk.used.toFixed(2)} / ${stats.disk.total} GB`} tooltip="Used vs total disk space" />

      <MetricCard title="Network" value={`↑ ${stats.network.upload.toFixed(2)} Mbps / ↓ ${stats.network.download.toFixed(2)} Mbps`} tooltip="Network upload/download speeds" />

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg col-span-full relative">
        <h3 className="font-bold mb-2 flex items-center gap-1">
          Active Window History
          <Tippy content="Last 10 active windows">
            <AiOutlineQuestionCircle className="cursor-pointer text-gray-400 hover:text-gray-200" />
          </Tippy>
        </h3>
        <ul className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600">
          {stats.activeWindowsHistory.map((win, i) => (
            <li key={i} className="bg-gray-700 px-3 py-1 rounded whitespace-nowrap">
              {win}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg col-span-full">
        <h3 className="font-bold mb-2 flex items-center gap-1">
          System Info
          <Tippy content="Basic system information">
            <AiOutlineQuestionCircle className="cursor-pointer text-gray-400 hover:text-gray-200" />
          </Tippy>
        </h3>
        <p>Platform: {stats.systemInfo.platform}</p>
        <p>CPU Cores: {stats.systemInfo.cpus}</p>
        <p>Total Memory: {stats.systemInfo.totalMem} GB</p>
      </div>
    </div>
  );
}

function MetricCard({ title, value, tooltip, chart, warning }) {
  const valueColor = warning ? "text-red-500" : "text-green-400";
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition relative">
      <h3 className="font-bold mb-2 flex items-center gap-2">
        {title}
        <Tippy content={tooltip}>
          <AiOutlineQuestionCircle className="cursor-pointer text-gray-400 hover:text-gray-200" />
        </Tippy>
      </h3>
      <p className={`text-2xl mb-3 font-mono ${valueColor}`}>{value}</p>
      {chart && <div className="h-36">{chart}</div>}
    </div>
  );
}
