import { Link } from "react-router-dom";
import './Cart.css';

function Cart() {

    const item = {
        name: "Fresh Apples (1kg)",
        price: 25000,
        img: "https://bf1af2.akinoncloudcdn.com/products/2025/02/08/146390/13a6f360-af4f-4410-804a-4048dda8d6f8_size3840_cropCenter.jpg"
    };

    return (
        <div className="cart-body">

            <h1 className="cart-title">Your Cart</h1>

            <div className="cart-container">

                {/* ITEM */}
                <div className="cart-items">

                    <div className="cart-item">
                        <img 
                            src={item.img}
                            alt={item.name}
                            className="cart-item-img"
                        />

                        <div className="cart-item-details">
                            <h2>{item.name}</h2>
                            <p className="cart-price">Rp {item.price.toLocaleString()}</p>

                            <div className="cart-qty">
                                <button>-</button>
                                <span>1</span>
                                <button>+</button>
                            </div>

                            <button className="cart-remove">Remove</button>
                        </div>
                    </div>

                    <Link to="/store">
                        <button className="continue-shopping-btn">
                            Continue Shopping
                        </button>
                    </Link>
                </div>

                {/* SUBTOTAL */}
                <div className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>Rp {item.price.toLocaleString()}</span>
                    </div>

                    <div className="summary-row">
                        <span>Delivery Fee</span>
                        <span>Rp 10,000</span>
                    </div>

                    <div className="summary-total">
                        <span>Total</span>
                        <span>Rp {(item.price + 10000).toLocaleString()}</span>
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
