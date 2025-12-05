import React, { useState } from "react";
import "./Transaction.css";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import qrisCode from "../assets/qris.jpg";

function Transaction() {
    const navigate = useNavigate();
    const [method, setMethod] = useState("card");

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvv, setCvv] = useState("");

    const [address, setAddress] = useState("");

    const [showQR, setShowQR] = useState(false);

    const { user } = useAuth();

    const handleCheckout = () => {
        if (method === "qris") {
            setShowQR(true);
            return;
        }
        navigate(`/progress/${user.userId}}`);
    };

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

                <div className="order-item">
                    <p><strong>Fresh Apples (1kg)</strong></p>
                    <p>Quantity: 1</p>
                    <p>Price: IDR 25,000</p>
                </div>

                <div className="summary-box">
                    <p><strong>Total:</strong> IDR 25,000</p>
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
                            onClick={() => navigate("/progress")}
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
