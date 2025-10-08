# 🚀 ScreenMonitor App

This is **my personal project** located in the `screenmonitor` app folder.

A real-time system monitoring dashboard built with React, Socket.IO, and Node.js.
Displays CPU, memory, disk, network, active windows, battery, and top processes in a clean, modern UI with live charts and history tracking.

---

## Table of Contents

- [Features](#features)
- [Fake vs Real Data](#️-fake-vs-real-data)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [How It Works](#how-it-works)
- [Docker & DevOps Ready](#docker--devops-ready)
- [Notes][def]
- [Switching from Fake to Real Data](#switching-from-fake-to-real-data)
- [Screenshots](#screenshots-optional)
- [License](#license)

---

## Features

- **CPU Usage:** Current load and per-core usage
- **Memory Usage:** RAM used vs total, swap info
- **Disk Usage:** Used vs total space per drive
- **Network:** Upload/Download speeds per interface
- **Active Window History:** Real-time window title tracking
- **Top Processes:** Top 5 CPU-intensive processes
- **Battery & Temperature:** Battery % and CPU temperature (if supported)
- **System Info:** OS, CPU cores, total memory
- **History Charts:** Last 20 seconds of CPU, memory, network, and active windows
- **Live Updates:** Data updates every second using Socket.IO
- **Modern UI:** Tailwind CSS-based dashboard with tooltips for info

---

## ⚠️ Fake vs Real Data

By default, the dashboard may use fake or placeholder data (CPU %, memory, network, active windows) especially on non-supported OS or if required system packages are missing.

To enable real system data:

- Install `systeminformation` and necessary OS-specific tools.
- For macOS, AppleScript is needed to get the active window.
- Linux/Windows mostly works with `systeminformation` for CPU, memory, disk, and network stats.

---

## Backend Setup

**Requirements**

- Node.js >= 18
- npm

**Installation**
```bash
cd backend
npm install express socket.io systeminformation
```

**macOS Only (Active Window)**
```bash
npm install applescript
```

**Run Backend**
```bash
node server.js
```
Runs on [http://localhost:5001](http://localhost:5001)  
Sends live stats every second via Socket.IO

---

## Frontend Setup

**Installation**
```bash
cd frontend
npm install
```
Ensure `socket.io-client`, `react-chartjs-2`, `chart.js`, `tippy.js`, and `tailwindcss` are installed.

**Run Frontend**
```bash
npm run dev
```
Connects to backend at [http://localhost:5001](http://localhost:5001)  
Displays live charts, tables, and system info

---

## How It Works

```
      ┌─────────────┐
      │   System    │
      │ (CPU, RAM,  │
      │  Disk, etc) │
      └─────┬───────┘
            │
   (systeminformation / AppleScript)
            │
      ┌─────▼───────┐
      │   Backend    │
      │ Express +    │
      │ Socket.IO    │
      └─────┬───────┘
            │
       Real-time events
            │
      ┌─────▼───────┐
      │   Frontend   │
      │ React +      │
      │ TailwindCSS  │
      └─────────────┘
```

---

## Docker & DevOps Ready

- Backend and frontend can be dockerized separately
- Kubernetes manifests can be written for deployment
- CI/CD pipelines (Jenkins/GitHub Actions) can be configured to automatically build and deploy containers

---

## Notes

- macOS may request Accessibility/Automation permissions for active window detection
- CPU temperature, battery, and network stats may vary by system model
- On unsupported OS, the dashboard will fallback to placeholder/fake data

---

## Switching from Fake to Real Data

1. Install dependencies (`systeminformation`, `applescript` on Mac).
2. Make sure your backend code calls actual system info functions instead of random placeholders.
3. For Mac, Active Window detection:
    ```js
    import applescript from "applescript";
    const script = `tell application "System Events" to get name of first application process whose frontmost is true`;
    applescript.execString(script, (err, result) => console.log(result));
    ```
4. Restart backend; frontend will now show live, real system stats.

---

## Screenshots (Optional)

- CPU & Memory Charts
- Disk Usage & Network Info
- Active Window History
- Top Processes Table

---

## License

MIT License

---

## Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

[def]: #notes# screenmonitor
