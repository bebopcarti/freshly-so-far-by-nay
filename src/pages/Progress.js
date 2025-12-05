import './Progress.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import _2 from '../assets/box-white.png';
import _3 from '../assets/cargo-truck-white.png';
import _1 from '../assets/shopping-cart-white.png';
import _4 from '../assets/check-white.png';

const getProgressWidth = (status) => {
    switch (status) {
        case 0:
            return 13; // Order Placed
        case 1:
            return 38; // Packaged
        case 2:
            return 62; // On the Way
        case 3:
            return 100; // Delivered
    }
};

function Progress() {
    const { userId, orderId } = useParams();
    const [ orderData, setOrders ] = useState([]);
    const navigate = useNavigate();

    // DEBUG
    // const test = 1;
    // const testOrders = [
    //     {
    //         "orderId": 5003,
    //         "createdAt": "2025-12-05T07:00:00.000Z",
    //         "totalAmount": 125000.00,
    //         "orderStatus": "COMPLETED",
    //         "deliveryDate": "2025-12-05T08:00:00.000Z",
    //         "deliveryStatus": 3,
    //         "paymentStatus": "COMPLETED"
    //     },
    //     {
    //         "orderId": 5002,
    //         "createdAt": "2025-11-20T08:00:00.000Z",
    //         "totalAmount": 450000.00,
    //         "orderStatus": "COMPLETED",
    //         "deliveryDate": "2025-11-20T14:30:00.000Z",
    //         "deliveryStatus": 1,
    //         "paymentStatus": "COMPLETED"
    //     },
    //     {
    //         "orderId": 5001,
    //         "createdAt": "2025-11-20T08:00:00.000Z",
    //         "totalAmount": 350000.00,
    //         "orderStatus": "COMPLETED",
    //         "deliveryDate": "2025-12-20T14:30:00.000Z",
    //         "deliveryStatus": 2,
    //         "paymentStatus": "COMPLETED"
    //     }
    // ]
    // ---

    const deliveryProgressWidth = orderData ? getProgressWidth(orderData.deliveryStatus) : 0;
    
    useEffect(() => {
        if (!userId) {
            console.error("User ID is missing from the URL.");
            navigate(`/login`)
            return;
        }
        if (!orderId) {
            console.error("Could not find order.");
            navigate(`/transaction-history/${userId}`);
        }

        const apiUrl = `http://localhost:3001/progress/${userId}/${orderId}`;
        
        fetch(apiUrl)
            .then(data => {
                // DEBUG
                // if (test == 1) {
                //     for (const n in testOrders) {
                //          if (testOrders[n].orderId == orderId) {
                //             setOrders(testOrders[n]);
                //             break;
                //          }
                //     }
                // } else
                // ---

                if (data.length > 0) {
                    setOrders(data[0]);
                } else {
                    setOrders(null);
                    navigate(`/transaction-history/${userId}`);
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
            });
    }, [userId, orderId, navigate]);
    
    const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
    const formatAmount = (amount) => amount ? `Rp${amount.toLocaleString('id')}` : 'N/A';
    
    return (
        <div class="progress-body">
            <div class="progress-banner">
                <h1>Order Tracking Page</h1>
                <p>Your order ({orderData.orderId}) has been placed.</p>
                <p>Please wait and track your order progress from here.</p>
            </div>
            <div class="order-details-wrapper progress-sections">
                <div class="order-details">
                    <h1>Order Placed</h1>
                    <p>{formatDate(orderData.createdAt)}</p>
                </div>
                <div class="order-details">
                    <h1>Total</h1>
                    <p>{formatAmount(orderData.totalAmount)}</p>
                </div>
                <div class="order-details">
                    <h1>Order ID</h1>
                    <p>{orderData.orderId}</p>
                </div>
            </div>
            <div class="order-status-wrapper progress-sections">
                <h1>Order Status: <span class="status green">{orderData.orderStatus}</span></h1>
                <h2>Estimated Delivery Date: <span class="est-date green">{orderData.deliveryDate ? formatDate(orderData.deliveryDate) : 'TBD'}</span></h2>
            </div>
            <div class="progress-wrapper progress-sections">
                <div class="progress-sub-wrapper">
                    <div class="progress-container">
                        <div class="progress-line prog-gray"></div>
                        <div class="progress-line prog-green" style={{width: `${deliveryProgressWidth}%`}}></div>
                        <div class="progress-step">
                            <div className={`img-border ${orderData.deliveryStatus >= 0 ? 'active' : 'inactive'}`}>
                                <img src={_1}></img>
                            </div>
                        </div>
                        <div class="progress-step">
                            <div className={`img-border ${orderData.deliveryStatus >= 1 ? 'active' : 'inactive'}`}>
                                <img src={_2}></img>
                            </div>
                        </div>
                        <div class="progress-step">
                            <div className={`img-border ${orderData.deliveryStatus >= 2 ? 'active' : 'inactive'}`}>
                                <img src={_3}></img>
                            </div>
                        </div>
                        <div class="progress-step">
                            <div className={`img-border ${orderData.deliveryStatus >= 3 ? 'active' : 'inactive'}`}>
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