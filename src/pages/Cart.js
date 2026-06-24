import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './Cart.css';
import { useAuth } from "../context/AuthContext";

function Cart() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [cartId, setCartId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    
    useEffect(() => {
        if (!user) {return navigate('/');}
        // const user = JSON.parse(localStorage.getItem("user"));
            
        fetch("http://localhost:3001/cart/getOrCreate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.userId })
        })
          .then(res => res.json())
          .then(data => {
            setCartId(data.cartId); 
          });
      }, [user, navigate]); // <--- Tambahkan user dan navigate di sini

    useEffect(() => {
        if (!cartId) return;
      
        fetch(`http://localhost:3001/cart/items/${cartId}`)
          .then(res => res.json())
          .then(data => {
            setCartItems(data);
          });
      }, [cartId]);

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
                    ? { ...p, quantity: newQty, subtotal: newQty * p.harga }
                        : p
                )
            );
        });
    };


    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
        setSubtotal(total);
    }, [cartItems]);
    
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
                        ? { ...p, quantity: newQty, subtotal: newQty * p.harga }
                        : p
                )
            );
        });
    };
    
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

                {/* ITEM */}
                <div className="cart-items">

                    {cartItems.map(item => (
                        <div className="cart-item" key={item.cartItemId}>
        
                            <img 
                                src={`http://localhost:3001/uploads/${item.gambar}`}
                                alt={item.nama}
                                className="cart-item-img"
                            />

                            <div className="cart-item-details">
                                <h2>{item.nama}</h2>

                                <p className="cart-price">Rp {item.harga.toLocaleString()}</p>

                                <div className="cart-qty">
                                    <button onClick={() => handleDecrease(item)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrease(item)}>+</button>
                                </div>

                                <button className="cart-remove" onClick={() => handleRemove(item.cartItemId)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    <Link to="/store">
                        <button className="continue-shopping-btn">
                            Continue Shopping
                        </button>
                    </Link>
                </div>

                {/* SUBTOTAL & SINKRONISASI PAJAK */}
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

                    <Link to="/transaction">
                        <button className="checkout-btn">Checkout</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default Cart;
