const express = require("express");
const app = express();
const db = require("./db"); // 🛠️ PASTIKAN FILE INI TERKONEKSI KE DATABASE 'proyekuas'
const cors = require("cors");
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Backend Freshly (New Architecture) Berjalan!");
});

// ==========================================
// 1. AUTHENTICATION
// ==========================================
app.post("/register", (req, res) => {
    const { email, username, password } = req.body;
    const sql = "INSERT INTO Users (email, name, password, role) VALUES (?, ?, ?, 'buyer')";
    db.query(sql, [email, username, password], (err, result) => {
      if (err) return res.status(500).json({ message: "Gagal register", error: err });
      res.json({ message: "Register berhasil" });
    });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM Users WHERE email = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal login" });
    if (results.length > 0) res.json({ message: "Login berhasil", user: results[0] });
    else res.status(401).json({ message: "Username atau password salah" });
  });
});

// ==========================================
// 2. STORE & FILTER
// ==========================================
app.post("/produk/filter/all", (req, res) => {
    const { categories, min, max } = req.body;
    let sql = `
        SELECT p.product_id, p.name, p.price, p.image, c.name as category_name 
        FROM Products p
        LEFT JOIN Categories c ON p.category_id = c.category_id
        WHERE p.price >= ? AND p.price <= ?
    `;
    let params = [min || 0, max || 9999999999];

    if (categories && categories.length > 0) {
        const placeholders = categories.map(() => "?").join(",");
        sql += ` AND c.name IN (${placeholders})`;
        params.push(...categories);
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("ERROR DB FILTER:", err);
            return res.json([]); 
        }
        res.json(result);
    });
});

app.get("/store/:produkId", (req, res) => {
  const sql = "SELECT name as nama, price as harga, image as gambar FROM Products WHERE product_id = ?";
  db.query(sql, [req.params.produkId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ==========================================
// 3. CART SYSTEM
// ==========================================
app.post("/cart/getOrCreate", (req, res) => {
    res.json({ cartId: 1 }); // Bypass aman untuk menyesuaikan React-mu yang lama
});

app.post("/cart/add", (req, res) => {
    // Toleransi variabel jika React masih memakai userId atau produkId
    const userId = req.body.user_id || req.body.userId;
    const productId = req.body.product_id || req.body.produkId;
    
    const sql = "INSERT INTO Cart (user_id, product_id, quantity) VALUES (?, ?, 1)";
    db.query(sql, [userId, productId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Added to cart successfully!" });
    });
});

app.get("/cart/:userId", (req, res) => {
    const sql = `
        SELECT c.cart_id as cartItemId, c.quantity, p.product_id as produkId, p.name as nama, p.price as harga, p.image as gambar, (c.quantity * p.price) as subtotal
        FROM Cart c
        JOIN Products p ON c.product_id = p.product_id
        WHERE c.user_id = ?
    `;
    db.query(sql, [req.params.userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.put("/cart/item/update", (req, res) => {
  const sql = "UPDATE Cart SET quantity = ? WHERE cart_id = ?";
  db.query(sql, [req.body.quantity, req.body.cartItemId], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

app.delete("/cart/item/remove/:cartItemId", (req, res) => {
  db.query("DELETE FROM Cart WHERE cart_id = ?", [req.params.cartItemId], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

// ==========================================
// 4. CHECKOUT SYSTEM
// ==========================================
app.post("/checkout", (req, res) => {
    const userId = req.body.userId || req.body.user_id;
    const address = req.body.address; 

    const getCartSql = "SELECT product_id, quantity FROM Cart WHERE user_id = ?";
    db.query(getCartSql, [userId], (err, items) => {
        if (err || items.length === 0) return res.status(400).json({ error: "Keranjang kosong!" });

        // Hitung manual di backend agar aman
        db.query("SELECT product_id, price FROM Products", (errPrice, products) => {
             const priceMap = {};
             products.forEach(p => priceMap[p.product_id] = p.price);

             const subtotal = items.reduce((sum, i) => sum + (i.quantity * priceMap[i.product_id]), 0);
             const totalAmount = subtotal + (subtotal * 0.11) + 10000;

             const insertOrderSql = "INSERT INTO Orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, 'Placed')";
             db.query(insertOrderSql, [userId, totalAmount, address], (err3, orderResult) => {
                 if (err3) return res.status(500).json(err3);
                 
                 const newOrderId = orderResult.insertId;
                 const orderItemsValues = items.map(i => [newOrderId, i.product_id, i.quantity, priceMap[i.product_id], i.quantity * priceMap[i.product_id]]);
                 
                 db.query("INSERT INTO Order_Items (order_id, product_id, quantity, price, subtotal) VALUES ?", [orderItemsValues], (err4) => {
                     if (err4) return res.status(500).json(err4);
                     
                     db.query("DELETE FROM Cart WHERE user_id = ?", [userId], () => {
                         res.json({ message: "Checkout success!", orderId: newOrderId });
                     });
                 });
             });
        });
    });
});

// ==========================================
// 5. HISTORY & PROGRESS
// ==========================================
app.get('/transaction-history/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = "SELECT order_id as orderId, user_id as userId, status, created_at as paymentDate, 'Card' as method FROM Orders ORDER BY created_at DESC";
    let params = [];
    
    // Jika bukan admin, filter berdasarkan ID
    if (userId !== '2' && userId !== 'admin') {
        sql = "SELECT order_id as orderId, user_id as userId, status, created_at as paymentDate, 'Card' as method FROM Orders WHERE user_id = ? ORDER BY created_at DESC";
        params = [userId];
    }
    
    db.query(sql, params, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

app.get('/transaction-history/:userId/:orderId', (req, res) => {
    const sql = `
        SELECT p.name as nama, oi.quantity, oi.price as harga, oi.subtotal
        FROM Order_Items oi
        JOIN Products p ON oi.product_id = p.product_id
        WHERE oi.order_id = ?
    `;
    db.query(sql, [req.params.orderId], (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

app.get('/progress/:userId/:orderId', (req, res) => {
  const sql = "SELECT status as orderStatus, total_amount as totalAmount FROM Orders WHERE order_id = ? LIMIT 1";
  db.query(sql, [req.params.orderId], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
  });
});

// ==========================================
// 6. WISHLIST & REVIEWS (TARGET MINGGU 4)
// ==========================================
app.post('/wishlist', (req, res) => {
    const userId = req.body.userId || req.body.user_id;
    const productId = req.body.produkId || req.body.product_id;
    const sql = "INSERT INTO Wishlist (user_id, product_id) VALUES (?, ?)";
    db.query(sql, [userId, productId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Produk berhasil ditambahkan ke wishlist!" });
    });
});

/////
// AMBIL SEMUA WISHLIST USER (Target Minggu 3)
app.get('/wishlist/:userId', (req, res) => {
    const sql = `
        SELECT w.wishlist_id, p.product_id, p.name, p.price, p.image 
        FROM Wishlist w 
        JOIN Products p ON w.product_id = p.product_id 
        WHERE w.user_id = ?
    `;
    db.query(sql, [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// HAPUS DARI WISHLIST (Target Minggu 3)
app.delete('/wishlist/:wishlistId', (req, res) => {
    const sql = "DELETE FROM Wishlist WHERE wishlist_id = ?";
    db.query(sql, [req.params.wishlistId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Produk dihapus dari wishlist!" });
    });
});

// AMBIL REVIEW PRODUK (Target Minggu 3)
app.get("/review/:productId", (req, res) => {
  const sql = `
    SELECT u.name as reviewer, r.rating, r.comment, r.created_at 
    FROM Reviews r
    JOIN Users u ON r.user_id = u.user_id
    WHERE r.product_id = ?
  `;
  db.query(sql, [req.params.productId], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
});

////

app.post('/reviews', (req, res) => {
    const { userId, produkId, rating, comment } = req.body;
    const sql = "INSERT INTO Reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)";
    db.query(sql, [userId, produkId, rating, comment], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Review berhasil dikirim!" });
    });
});

// ==========================================
// 7. ADMIN ENDPOINTS (TARGET MINGGU 5)
// ==========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "backend/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

app.post("/tambah-produk", upload.single("gambar"), (req, res) => {
  const { nama, harga, stock } = req.body;
  const gambar = req.file ? req.file.filename : null;
  // Menyimpan data produk admin ke struktur tabel bahasa inggris
  const sql = "INSERT INTO Products (name, price, stock, category_id, image) VALUES (?, ?, ?, 1, ?)";
  db.query(sql, [nama, harga, stock, gambar], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal menambah produk" });
    res.json({ message: "Produk berhasil ditambahkan" });
  });
});

app.put('/order-status/:id', (req, res) => {
    const sql = "UPDATE Orders SET status = ? WHERE order_id = ?";
    db.query(sql, [req.body.status, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Status pengiriman berhasil diperbarui!" });
    });
});

app.get('/admin/analytics', (req, res) => {
    const sql = `
        SELECT 
            COUNT(order_id) as totalOrders,
            SUM(total_amount) as totalRevenue,
            (SELECT COUNT(order_id) FROM Orders WHERE status != 'Delivered') as activeOrders
        FROM Orders
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]); 
    });
});

app.listen(3001, () => {
    console.log("Server Freshly (Sistem Baru) berjalan di port 3001");
});