import './Progress.css';
import _2 from '../assets/box-white.png';
import _3 from '../assets/cargo-truck-white.png';
import _1 from '../assets/shopping-cart-white.png';
import _4 from '../assets/check-white.png';

function Progress() {
    return (
        <div class="progress-body">
            <div class="progress-banner">
                <h1>Order Tracking Page</h1>
                <p>Your order has been placed.</p>
                <p>Please wait and track your order progress from here.</p>
            </div>
            <div class="order-details-wrapper progress-sections">
                <div class="order-details">
                    <h1>Order Placed</h1>
                    <p>- Date - </p>
                </div>
                <div class="order-details">
                    <h1>Total</h1>
                    <p>- Total - </p>
                </div>
                <div class="order-details">
                    <h1>Order ID</h1>
                    <p>- ID - </p>
                </div>
            </div>
            <div class="order-status-wrapper progress-sections">
                <h1>Order Status: <span class="status green">Status</span></h1>
                <h2>Estimated Delivery Date: <span class="est-date green">Date</span></h2>
            </div>
            <div class="progress-wrapper progress-sections">
                <div class="progress-sub-wrapper">
                    <div class="progress-container">
                        <div class="progress-line"></div>
                        <div class="progress-step">
                            <div class="img-border">
                                <img src={_1}></img>
                            </div>
                        </div>
                        <div class="progress-step">
                            <div class="img-border">
                                <img src={_2}></img>
                            </div>
                        </div>
                        <div class="progress-step">
                            <div class="img-border">
                                <img src={_3}></img>
                            </div>
                        </div>
                        <div class="progress-step">
                            <div class="img-border">
                                <img src={_4}></img>
                            </div>
                        </div>
                    </div>
                    <div class="details-container">
                        <h1>Order Placed</h1>
                        <h1>Packaged</h1>
                        <h1>On the Way</h1>
                        <h1>Delivered</h1>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Progress