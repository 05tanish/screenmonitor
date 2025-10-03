import express from "express";
import http from "http";
import { Server } from "socket.io";
import os from "os";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

let cpuHistory = [];
let memoryHistory = [];
let networkHistory = [];
let activeWindowsHistory = [];
let historyTime = [];

function getStats() {
  const totalMem = os.totalmem() / 1024 ** 3;
  const freeMem = os.freemem() / 1024 ** 3;
  const usedMem = totalMem - freeMem;

  const cpuUsage = Math.random() * 100;
  const activeWindow = `Window ${Math.floor(Math.random() * 5) + 1}`;

  cpuHistory.push(cpuUsage);
  memoryHistory.push(usedMem);
  historyTime.push(new Date().toLocaleTimeString());
  networkHistory.push({ upload: Math.random() * 10, download: Math.random() * 50 });

  if (cpuHistory.length > 20) cpuHistory.shift();
  if (memoryHistory.length > 20) memoryHistory.shift();
  if (historyTime.length > 20) historyTime.shift();
  if (networkHistory.length > 20) networkHistory.shift();

  activeWindowsHistory.push(activeWindow);
  if (activeWindowsHistory.length > 10) activeWindowsHistory.shift();

  const disk = { total: 512, used: Math.random() * 512 };

  return {
    timestamp: new Date().toLocaleTimeString(),
    cpuUsage: parseFloat(cpuUsage.toFixed(2)),
    memoryUsage: parseFloat(usedMem.toFixed(2)),
    activeWindow,
    activeWindowsHistory: [...activeWindowsHistory],
    network: networkHistory[networkHistory.length - 1],
    disk,
    cpuHistory: [...cpuHistory],
    memoryHistory: [...memoryHistory],
    historyTime: [...historyTime],
    systemInfo: {
      platform: os.platform(),
      cpus: os.cpus().length,
      totalMem: totalMem.toFixed(2),
    },
  };
}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  const interval = setInterval(() => socket.emit("screen-stats", getStats()), 1000);
  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(5001, () => console.log("Backend running at http://localhost:5001"));
