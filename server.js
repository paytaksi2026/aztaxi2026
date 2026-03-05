const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection (Render uses DATABASE_URL)
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/aztaxi",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// PUBLIC qovluğunu statik açır
app.use(express.static(path.join(__dirname, "public")));

// Panel routes
app.use("/passenger", express.static(path.join(__dirname, "public/passenger")));
app.use("/driver", express.static(path.join(__dirname, "public/driver")));
app.use("/admin", express.static(path.join(__dirname, "public/admin")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Passenger register
app.post("/api/passenger/register", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    const q =
      "INSERT INTO passengers(name,phone,password) VALUES($1,$2,$3) RETURNING id";
    const r = await pool.query(q, [name, phone, password]);

    res.json({
      success: true,
      id: r.rows[0].id,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Driver register
app.post("/api/driver/register", async (req, res) => {
  try {
    const { name, phone, password, car_model, car_color, car_year, plate } =
      req.body;

    const q = `
      INSERT INTO drivers
      (name,phone,password,car_model,car_color,car_year,plate,status)
      VALUES($1,$2,$3,$4,$5,$6,$7,'pending')
      RETURNING id
    `;

    const r = await pool.query(q, [
      name,
      phone,
      password,
      car_model,
      car_color,
      car_year,
      plate,
    ]);

    res.json({
      success: true,
      id: r.rows[0].id,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("AZTAXI server running on port", port);
});
