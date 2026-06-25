import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './Cart.css';
import { useAuth } from "../context/AuthContext";

function Cart() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    
    // 🛠️ PERBAIKAN: Langsung tembak ke Cart berdasarkan User ID (Tanpa dua kali kerja)
    useEffect(() => {
        if (!user) { return navigate('/'); }
        
        // Antisipasi perbedaan nama variabel (userId vs user_id)
        const currentUserId = user.user_id || user.userId;
            
        fetch(`http://localhost:3001/cart/${currentUserId}`)
            .then(res => res.json())
            .then(data => {
                // SABUK PENGAMAN ANTI-LAYAR-MERAH
                if (Array.isArray(data)) {
                    setCartItems(data);
                } else {
                    console.warn("Data keranjang bukan array:", data);
                    setCartItems([]);
                }
            })
            .catch(err => console.error("Gagal mengambil keranjang:", err));
    }, [user, navigate]);

    // Update kuantitas (Tambah)
    const handleIncrease = (item) => {
        const newQty = item.quantity + 1;
    
        fetch("http://localhost:3001/cart/item/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cartItemId: item.cartItemId,
                quantity: newQty
            })
        })
        .then(() => {
            setCartItems(prev =>
                prev.map(p =>
                    p.cartItemId === item.cartItemId
                    ? { ...p, quantity: newQty, subtotal: newQty * Number(p.harga) }
                        : p
                )
            );
        });
    };

    // Kalkulasi Total
    useEffect(() => {
        // Memastikan tipe data subtotal adalah Angka (Number)
        const total = cartItems.reduce((sum, item) => sum + Number(item.subtotal), 0);
        setSubtotal(total);
    }, [cartItems]);
    
    // Update kuantitas (Kurang)
    const handleDecrease = (item) => {
        if (item.quantity <= 1) return;
    
        const newQty = item.quantity - 1;
        
        fetch("http://localhost:3001/cart/item/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cartItemId: item.cartItemId,
                quantity: newQty
            })
        })
        .then(() => {
            setCartItems(prev =>
                prev.map(p =>
                    p.cartItemId === item.cartItemId
                        ? { ...p, quantity: newQty, subtotal: newQty * Number(p.harga) }
                        : p
                )
            );
        });
    };
    
    // Hapus Produk dari Keranjang
    const handleRemove = (cartItemId) => {
        fetch(`http://localhost:3001/cart/item/remove/${cartItemId}`, {
            method: "DELETE"
        })
        .then(() => {
            setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
        });
    };
    
    return (
        <div className="cart-body">
            <h1 className="cart-title">Your Cart</h1>
            <div className="cart-container">

                {/* ITEMS */}
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p style={{textAlign: 'center', padding: '20px'}}>Keranjangmu masih kosong.</p>
                    ) : (
                        cartItems.map(item => (
                            <div className="cart-item" key={item.cartItemId || Math.random()}>
                                <img 
                                    src={`http://localhost:3001/uploads/${item.gambar || 'default.png'}`}
                                    alt={item.nama || "Produk"}
                                    className="cart-item-img"
                                />

                                <div className="cart-item-details">
                                    <h2>{item.nama}</h2>
                                    {/* Memaksa harga menjadi Number agar toLocaleString() tidak crash */}
                                    <p className="cart-price">Rp {item.harga ? Number(item.harga).toLocaleString() : 0}</p>

                                    <div className="cart-qty">
                                        <button onClick={() => handleDecrease(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrease(item)}>+</button>
                                    </div>

                                    <button className="cart-remove" onClick={() => handleRemove(item.cartItemId)}>Remove</button>
                                </div>
                            </div>
                        ))
                    )}

                    <Link to="/store">
                        <button className="continue-shopping-btn">
                            Continue Shopping
                        </button>
                    </Link>
                </div>

                {/* SUMMARY & CHECKOUT */}
                <div className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>Rp {subtotal.toLocaleString()}</span>
                    </div>

                    {/* 🛠️ MENAMPILKAN PAJAK 11% SESUAI TARGET MINGGU 4 */}
                    <div className="summary-row">
                        <span>Tax (11%)</span>
                        <span>Rp {(subtotal * 0.11).toLocaleString()}</span>
                    </div>

                    <div className="summary-row">
                        <span>Delivery Fee</span>
                        <span>Rp 10,000</span>
                    </div>

                    <div className="summary-total">
                        <span>Total</span>
                        {/* Total akhir dihitung akumulatif dengan Pajak + Ongkir */}
                        <span>Rp {(subtotal + (subtotal * 0.11) + 10000).toLocaleString()}</span>
                    </div>

                    {/* Jika keranjang kosong, disable tombol checkout */}
                    <Link to="/transaction" style={{ pointerEvents: cartItems.length === 0 ? 'none' : 'auto' }}>
                        <button className="checkout-btn" style={{ opacity: cartItems.length === 0 ? 0.5 : 1 }}>
                            Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cart;