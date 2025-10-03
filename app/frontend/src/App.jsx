import { useEffect, useState } from "react";
import io from "socket.io-client";
import Dashboard from "./components/Dashboard";

const socket = io("http://localhost:5001");

export default function App() {
  const [stats, setStats] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    socket.on("screen-stats", (data) => {
      if (!paused) setStats(data);
    });
    return () => socket.off("screen-stats");
  }, [paused]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🚀 Professional Screen Monitoring Dashboard</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setPaused(!paused)}
          className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          {paused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={() => setStats(null)}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition"
        >
          Refresh
        </button>
      </div>

      <Dashboard stats={stats} />
    </div>
  );
}
