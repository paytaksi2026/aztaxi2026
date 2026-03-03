require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
  res.send("AZTaxi backend işləyir 🚖");
});

app.get("/test-register", async (req, res) => {
  try {
    const hashed = await require("bcrypt").hash("123456", 10);

    const result = await pool.query(
      "INSERT INTO users (name, phone, password, role) VALUES ($1,$2,$3,'passenger') RETURNING id,name,phone,role",
      ["TestUser", "0500000000", hashed]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// TEST DB CONNECTION
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post("/api/register/passenger", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ error: "Bütün xanalar doldurulmalıdır" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, phone, password, role) VALUES ($1,$2,$3,'passenger') RETURNING id,name,phone,role",
      [name, phone, hashedPassword]
    );

    app.post("/api/register/driver", async (req, res) => {
  try {
    const {
      name,
      phone,
      password,
      car_brand,
      car_model,
      car_color,
      car_plate
    } = req.body;

    if (!name || !phone || !password || !car_brand || !car_model || !car_color || !car_plate) {
      return res.status(400).json({ error: "Bütün xanalar doldurulmalıdır" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      "INSERT INTO users (name, phone, password, role) VALUES ($1,$2,$3,'driver') RETURNING id,name,phone,role",
      [name, phone, hashedPassword]
    );

    const userId = userResult.rows[0].id;

    await pool.query(
      "INSERT INTO driver_profiles (user_id, car_brand, car_model, car_color, car_plate) VALUES ($1,$2,$3,$4,$5)",
      [userId, car_brand, car_model, car_color, car_plate]
    );

    res.json({ success: true, user: userResult.rows[0] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

    res.json({ success: true, user: result.rows[0] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işləyir`);
});
