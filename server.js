require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== STATIC FILES =====
app.use(express.static(path.join(__dirname, "public")));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "passenger-login.html"));
});

// ================= REGISTER =================

app.post("/api/register/passenger", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, phone, password, role) VALUES ($1,$2,$3,'passenger') RETURNING id,name,phone,role",
      [name, phone, hashedPassword]
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// ================= LOGIN =================

app.post("/api/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE phone = $1",
      [phone]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "İstifadəçi tapılmadı" });
    }

    const user = userResult.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Şifrə yanlışdır" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= AUTH =================

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id,name,phone,role,rating,total_rides FROM users WHERE id = $1",
      [req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işləyir`);
});
