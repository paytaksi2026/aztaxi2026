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
app.use(express.static(path.join(__dirname, "public")));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "passenger.html"));
});

// ================= PASSENGER REGISTER =================

app.post("/api/register/passenger", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    const check = await pool.query(
      "SELECT id FROM users WHERE phone = $1 AND role = 'passenger'",
      [phone]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ error: "Bu nömrə artıq müştəri kimi qeydiyyatdan keçib" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, phone, password, role) VALUES ($1,$2,$3,'passenger') RETURNING id,name,phone,role",
      [name, phone, hashedPassword]
    );

    const token = jwt.sign(
      { id: result.rows[0].id, role: "passenger" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, user: result.rows[0] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DRIVER REGISTER =================

app.post("/api/register/driver", async (req, res) => {
  try {
    const {
      name,
      phone,
      password,
      car_brand,
      car_model,
      car_plate,
      car_color
    } = req.body;

    const check = await pool.query(
      "SELECT id FROM users WHERE phone = $1 AND role = 'driver'",
      [phone]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ error: "Bu nömrə artıq sürücü kimi qeydiyyatdan keçib" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      "INSERT INTO users (name, phone, password, role) VALUES ($1,$2,$3,'driver') RETURNING id,name,phone,role",
      [name, phone, hashedPassword]
    );

    const userId = userResult.rows[0].id;

    await pool.query(
      "INSERT INTO driver_profiles (user_id, car_brand, car_model, car_plate, car_color, is_approved) VALUES ($1,$2,$3,$4,$5,false)",
      [userId, car_brand, car_model, car_plate, car_color]
    );

    res.json({
      success: true,
      message: "Qeydiyyat qəbul edildi. Admin təsdiqi gözlənilir."
    });

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

    if (user.role === "driver") {
      const driver = await pool.query(
        "SELECT is_approved FROM driver_profiles WHERE user_id = $1",
        [user.id]
      );

      if (!driver.rows[0].is_approved) {
        return res.status(403).json({ error: "Admin təsdiqi gözlənilir" });
      }
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
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işləyir`);
});
