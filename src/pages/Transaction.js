import './Transaction.css';

function Cart() {
    return (
        <div className="cart-body">

            <h1 className="cart-title">Your Cart</h1>

            <div className="cart-container">

                <div className="cart-items">
                    <div className="cart-item">
                        <img 
                            src="https://via.placeholder.com/120" 
                            alt="Product"
                            className="cart-item-img"
                        />

                        <div className="cart-item-details">
                            <h2>Sample Product Name</h2>
                            <p className="cart-price">Rp 25.000</p>

                            <div className="cart-qty">
                                <button>-</button>
                                <span>1</span>
                                <button>+</button>
                            </div>

                            <button className="cart-remove">Remove</button>
                        </div>
                    </div>
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>Rp 25.000</span>
                    </div>

                    <div className="summary-row">
                        <span>Delivery Fee</span>
                        <span>Rp 10.000</span>
                    </div>

                    <div className="summary-total">
                        <span>Total</span>
                        <span>Rp 35.000</span>
                    </div>

                    <button className="checkout-btn">Checkout</button>
                </div>
            </div>

        </div>
    );
}

export default Cart;
