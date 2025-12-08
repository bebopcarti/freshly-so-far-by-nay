const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend berjalan!");
});

app.listen(3001, "0.0.0.0", () => {
    console.log("Server berjalan di port 3001");
});

// app.listen(3001, () => {
//   console.log("Server berjalan di port 3001");
// });

//REGISTER - LOGIN
app.post("/register", (req, res) => {
    const { email, username, password } = req.body;
  
    const sql = "INSERT INTO user (email, username, password, createdat) VALUES (?, ?, ?, NOW())";
    const values = [email, username, password];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: "Gagal register" });
      }
      res.json({ message: "Register berhasil" });
    });
  });

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json({ message: "Gagal login" });
    }

    if (results.length > 0) {
      res.json({
        message: "Login berhasil",
        user: results[0]
      });
    } else {
      res.status(401).json({ message: "Username atau password salah" });
    }
  });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: "Gagal login" });
      }
  
      if (results.length > 0) {
        res.json({
          message: "Login berhasil",
          user: results[0]
        });
      } else {
        res.status(401).json({ message: "Username atau password salah" });
      }
    });
});

//ADMIN PAGE (ADD PRODUCT)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // simpan di folder uploads/
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

app.post("/tambah-produk", upload.single("gambar"), (req, res) => {
  const { nama, kategori, harga, stock } = req.body;
  const gambar = req.file ? req.file.filename : null;

  const sql = "INSERT INTO produk (nama, kategori, harga, stock, gambar, createdAt) VALUES (?, ?, ?, ?, ?, NOW())";

  db.query(sql, [nama, kategori, harga, stock, gambar], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Gagal menambah produk" });
    }

    res.json({ message: "Produk berhasil ditambahkan" });
  });
});

app.delete("/produk/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM produk WHERE produkId = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting product", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  });
});

app.post("/edit-produk/:id", (req, res, next) => {
  upload.single("gambar")(req, res, function (err) {
    if (err) return res.status(500).json({ message: "Upload error", error: err });

    const produkId = req.params.id;
    const { nama, kategori, harga, stock } = req.body;

    let updateQuery = "";
    let params = [];

    if (req.file) {
      updateQuery = `
        UPDATE produk
        SET nama = ?, kategori = ?, harga = ?, stock = ?, gambar = ?
        WHERE produkId = ?
      `;
      params = [nama, kategori, harga, stock, req.file.filename, produkId];
    } else {
      updateQuery = `
        UPDATE produk
        SET nama = ?, kategori = ?, harga = ?, stock = ?
        WHERE produkId = ?
      `;
      params = [nama, kategori, harga, stock, produkId];
    }

    db.query(updateQuery, params, (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ message: "Produk berhasil diperbarui" });
    });
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//STORE PAGE
app.get("/produk/kategori/:kategori", (req, res) => {
  const kategori = req.params.kategori;

  const sql = "SELECT * FROM produk WHERE kategori = ?";
  db.query(sql, [kategori], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error", error: err });
    }
    res.json(results);
  });
});

app.post("/produk/filter", (req, res) => {
  const categories = req.body;

  if (!Array.isArray(categories)) {
      return res.status(400).json({ message: "Invalid format" });
  }

  const sql = `SELECT * FROM produk WHERE kategori IN (?) ORDER BY produkId DESC`;

  db.query(sql, [categories], (err, result) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error", error: err });
      }

      res.json(result);
  });
});

app.get("/produk", (req, res) => {
  const sql = "SELECT * FROM produk ORDER BY createdAt ASC";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error mengambil produk", error: err });
    }
    res.json(results);
  });
});

app.post("/produk/price", (req, res) => {
  const { min, max } = req.body;

  let sql = "SELECT * FROM produk WHERE harga >= ? AND harga <= ? ORDER BY produkId DESC";

  db.query(sql, [min, max], (err, result) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error", error: err });
      }
      res.json(result);
  });
});

app.post("/produk/filter/all", (req, res) => {
  const { categories, min, max } = req.body;

  let params = [];
  let sql = "SELECT * FROM produk WHERE harga BETWEEN ? AND ?";

  params.push(min);
  params.push(max);

  if (categories.length > 0) {
      const placeholders = categories.map(() => "?").join(",");
      sql += ` AND kategori IN (${placeholders})`;
      params.push(...categories);
  }

  sql += " ORDER BY produkId DESC";

  db.query(sql, params, (err, result) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error", error: err });
      }
      res.json(result);
  });
});

//CART PAGE
app.post("/cart/getOrCreate", (req, res) => {
  const { userId } = req.body;

  // 1. Cek apakah user sudah punya cart
  db.query(
    "SELECT * FROM keranjang WHERE userId = ? LIMIT 1",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.length > 0) {
        // Sudah ada cart
        return res.json({ cartId: result[0].cartId });
      }

      // 2. Kalau belum ada → buat baru
      db.query(
        "INSERT INTO keranjang (userId, createdAt, updatedAt) VALUES (?, NOW(), NOW())",
        [userId],
        (err2, result2) => {
          if (err2) return res.status(500).json({ error: err2 });

          res.json({ cartId: result2.insertId });
        }
      );
    }
  );
});

// TRANSACTION HISTORY PAGE
app.get('/transaction-history/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId in path" });
  }

  let sql = ``;
  let params = [];

  if (userId === '0') {
    sql = `
        SELECT 
            p.paymentId, 
            p.orderId, 
            p.paymentStatus, 
            p.paymentDate,
            p.method,
            o.userId 
        FROM 
            pembayaran p
        JOIN 
            \`order\` o ON p.orderId = o.orderId
        ORDER BY
            p.paymentDate DESC;
    `;
  } else {
    sql = `
        SELECT 
            p.paymentId, 
            p.orderId, 
            p.paymentStatus, 
            p.paymentDate,
            p.method,
            o.userId 
        FROM 
            pembayaran p
        JOIN 
            \`order\` o ON p.orderId = o.orderId
        WHERE 
            o.userId = ?
        ORDER BY
            p.paymentDate DESC;
    `;
    params = [userId];
  }
  
  db.query(sql, [userId], (err, data) => {
    if (err) {
        console.error("Database query error for transaction history:", err);
        return res.status(500).json({ error: "Database query error" });
    }
    
    return res.json(data);
  });
});

// PROGRESS PAGE
app.get('/progress/:userId/:orderId', (req, res) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId;

    if (!userId || !orderId) {
        return res.status(400).json({ error: "Missing required parameters (userId or orderId)." });
    }

    const sql = `
        SELECT
            o.orderId,
            o.createdAt,
            o.totalAmount,
            o.orderStatus AS orderStatus,
            d.deliveryDate,
            d.deliveryStatus,
            p.paymentStatus
        FROM \`ORDER\` o
        INNER JOIN DELIVERY d ON o.orderId = d.orderId
        INNER JOIN PAYMENT p ON o.orderId = p.orderId
        WHERE 
            o.userId = ? 
            AND o.orderId = ?
    `;
    db.query(sql, [userId, orderId], (err, data) => {
        if (err) {
            console.error("MySQL Tracking Error:", err);
            return res.status(500).json({ 
                error: "Failed to fetch tracking data." 
            });
        }
        return res.json(data);
    });
});
