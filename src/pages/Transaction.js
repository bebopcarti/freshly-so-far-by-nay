import React, { useState, useEffect } from "react";
import "./Transaction.css";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import qrisCode from "../assets/qris.jpg";

function Transaction() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [method, setMethod] = useState("card");
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [address, setAddress] = useState("");
    const [showQR, setShowQR] = useState(false);

    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        
        // Antisipasi ID format baru/lama
        const currentUserId = user.user_id || user.userId;

        // 🛠️ LANGSUNG TEMBAK KE API BARU, SAMA SEPERTI CART.JS
        fetch(`http://localhost:3001/cart/${currentUserId}`)
            .then(res => res.json())
            .then(items => {
                if (Array.isArray(items)) {
                    setCartItems(items);
                    const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0);
                    setSubtotal(total);
                } else {
                    setCartItems([]);
                }
            })
            .catch(err => console.error("Error fetching cart for checkout:", err));
    }, [user, navigate]);

    const handleCheckout = () => {
        // 🚨 PENCEGAHAN: Jangan biarkan checkout kalau alamat kosong!
        if (!address.trim()) {
            alert("Please enter your delivery address first!");
            return;
        }

        const currentUserId = user.user_id || user.userId;

        fetch("http://localhost:3001/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: currentUserId,
                address: address
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            if (method === "qris") {
                setShowQR(true);
            } else {
                navigate(`/transaction-history/${currentUserId}`);
            }
        })
        .catch(err => {
            console.error("Checkout failed:", err);
            alert("Something went wrong during checkout.");
        });
    };

    // 🛠️ KALKULASI TOTAL YANG BENAR (SESUAI CART)
    const tax = subtotal * 0.11;
    const deliveryFee = 10000;
    const grandTotal = subtotal + tax + deliveryFee;

    return (
        <div className="transaction-container">
            
            <div className="payment-section">
                <h2 className="section-title">Payment Method</h2>

                <div className="steam-tabs">
                    <div
                        className={`steam-tab ${method === "card" ? "active" : ""}`}
                        onClick={() => setMethod("card")}
                    >
                        Credit / Debit Card
                    </div>
                    <div
                        className={`steam-tab ${method === "qris" ? "active" : ""}`}
                        onClick={() => setMethod("qris")}
                    >
                        QRIS
                    </div>
                    <div
                        className={`steam-tab ${method === "cod" ? "active" : ""}`}
                        onClick={() => setMethod("cod")}
                    >
                        COD
                    </div>
                </div>

                <div className="payment-box">
                    {method === "card" && (
                        <>
                            <label>Cardholder Name</label>
                            <input 
                                type="text" 
                                className="input-field"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                            />

                            <label>Card Number</label>
                            <input 
                                type="text" 
                                className="input-field"
                                maxLength="16"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />

                            <div className="flex-row">
                                <div>
                                    <label>Expiration Date</label>
                                    <input 
                                        type="text" 
                                        placeholder="MM/YY"
                                        className="input-field"
                                        value={expDate}
                                        onChange={(e) => setExpDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>CVV</label>
                                    <input 
                                        type="password"
                                        maxLength="4"
                                        className="input-field"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {method === "qris" && (
                        <p className="info-text">
                            You will receive your QR code after clicking Checkout.
                        </p>
                    )}

                    {method === "cod" && (
                        <p className="info-text">
                            Your order will be paid upon delivery.
                        </p>
                    )}
                </div>
            </div>

            <div className="order-summary">
                <h2 className="section-title">Order Summary</h2>

                {cartItems.map(item => (
                    <div className="order-item" key={item.cartItemId || Math.random()}>
                        <p><strong>{item.nama}</strong></p>
                        <p>Quantity: {item.quantity}</p>
                        {/* 🛠️ Memaksa Number() agar tidak crash */}
                        <p>Price: IDR {item.harga ? Number(item.harga).toLocaleString() : 0}</p>
                        <p>Subtotal: IDR {item.subtotal ? Number(item.subtotal).toLocaleString() : 0}</p>
                    </div>
                ))}

                <div className="summary-box">
                    <p><strong>Subtotal:</strong> IDR {subtotal.toLocaleString()}</p>
                    <p><strong>Tax (11%):</strong> IDR {tax.toLocaleString()}</p>
                    <p><strong>Delivery Fee:</strong> IDR {deliveryFee.toLocaleString()}</p>
                    <p style={{fontSize: '18px', marginTop: '10px', color: '#386641'}}>
                        <strong>Total: IDR {grandTotal.toLocaleString()}</strong>
                    </p>
                </div>

                <h3>Delivery Address</h3>
                <textarea
                    className="input-field address-box"
                    placeholder="Enter full delivery address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button 
                    className="checkout-btn"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            </div>

            {showQR && (
                <div className="qr-popup">
                    <div className="qr-content">
                        <h3>Scan QRIS to Pay</h3>
                        <img src={qrisCode} alt="QRIS Code" className="qr-image" />
                        <button 
                            className="close-btn"
                            onClick={() => {
                                const currentUserId = user.user_id || user.userId;
                                navigate(`/transaction-history/${currentUserId}`);
                            }}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transaction;