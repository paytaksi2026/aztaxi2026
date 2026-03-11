
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// Serve frontend
app.use("/passenger", express.static(path.join(__dirname, "passenger")));
app.use("/driver", express.static(path.join(__dirname, "driver")));
app.use("/admin", express.static(path.join(__dirname, "admin")));

// Try loading optional modules if they exist
function loadModule(file) {
  try {
    const mod = require("./" + file);
    if (typeof mod === "function") {
      mod(app);
      console.log("Loaded module:", file);
    } else {
      console.log("Module loaded (no init function):", file);
    }
  } catch (e) {
    console.log("Module not loaded:", file);
  }
}

const modules = [
  "server-orders.js",
  "server-drivers.js",
  "server-dispatch.js",
  "server-driver-wallet.js",
  "server-payments.js",
  "server-radius.js",
  "server-live-map.js",
  "server-notify.js",
  "server-alerts.js",
  "server-commission.js",
  "server-driver-queue.js"
];

modules.forEach(loadModule);

// Basic health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "AzTaxi server running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("AzTaxi server started on port", PORT);
});
