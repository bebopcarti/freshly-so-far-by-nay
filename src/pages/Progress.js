import './Progress.css';
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
    // const { userId } = useParams(); 
    // const [orders, setOrders] = useState([]);
    
    const testOrders = [
        {
            "orderId": 5003,
            "createdAt": "2025-12-05T07:00:00.000Z",
            "totalAmount": 125000.00,
            "orderStatus": "COMPLETED",
            "deliveryDate": "2025-12-05T08:00:00.000Z",
            "deliveryStatus": 3,
            "paymentStatus": "COMPLETED"
        },
        {
            "orderId": 5001,
            "createdAt": "2025-11-20T08:00:00.000Z",
            "totalAmount": 450000.00,
            "orderStatus": "COMPLETED",
            "deliveryDate": "2025-11-20T14:30:00.000Z",
            "deliveryStatus": 1,
            "paymentStatus": "COMPLETED"
        }
    ]

    const latestOrder = testOrders.length > 0 ? testOrders[0] : null;
    const deliveryProgressWidth = latestOrder ? getProgressWidth(latestOrder.deliveryStatus) : 0;
    
    // useEffect(() => {
    //     if (!userId) {
    //         setError("User ID is missing from the URL.");
    //         setLoading(false);
    //         return;
    //     }

    //     const apiUrl = `http://localhost:3001/progress/${userId}`;
        
    //     fetch(apiUrl)
    //     .then(data => {
    //             setOrders(Array.isArray(data) ? data : []);
    //             setLoading(false);
    //         })
    //         .catch(err => {
    //             console.error("Fetch error:", err);
    //             setError(`Failed to load data: ${err.message}. Check Node.js console.`);
    //             setLoading(false);
    //         });
    // }, [userId]);
    
    const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
    const formatAmount = (amount) => amount ? `Rp${amount.toLocaleString('id')}` : 'N/A';
    
    return (
        <div class="progress-body">
            <div class="progress-banner">
                <h1>Order Tracking Page</h1>
                <p>Your order ({latestOrder.orderId}) has been placed.</p>
                <p>Please wait and track your order progress from here.</p>
            </div>
            <div class="order-details-wrapper progress-sections">
                <div class="order-details">
                    <h1>Order Placed</h1>
                    <p>{formatDate(latestOrder.createdAt)}</p>
                </div>
                <div class="order-details">
                    <h1>Total</h1>
                    <p>{formatAmount(latestOrder.totalAmount)}</p>
                </div>
                <div class="order-details">
                    <h1>Order ID</h1>
                    <p>{latestOrder.orderId}</p>
                </div>
            </div>
            <div class="order-status-wrapper progress-sections">
                <h1>Order Status: <span class="status green">{latestOrder.orderStatus}</span></h1>
                <h2>Estimated Delivery Date: <span class="est-date green">{latestOrder.deliveryDate ? formatDate(latestOrder.deliveryDate) : 'TBD'}</span></h2>
            </div>
            <div class="progress-wrapper progress-sections">
                <div class="progress-sub-wrapper">
                    <div class="progress-container">
                        <div class="progress-line prog-gray"></div>
                        <div class="progress-line prog-green" style={{width: `${deliveryProgressWidth}%`}}></div>
                        <div class="progress-step">
                            <div className={`img-border ${latestOrder.deliveryStatus >= 0 ? 'active' : 'inactive'}`}>
                                <img src={_1}></img>
                            </div>
                        </div>
                        <div class="progress-step">
                            <div className={`img-border ${latestOrder.deliveryStatus >= 1 ? 'active' : 'inactive'}`}>
                                <img src={_2}></img>
                            </div>
                        </div>
                        <div class="progress-step">
                            <div className={`img-border ${latestOrder.deliveryStatus >= 2 ? 'active' : 'inactive'}`}>
                                <img src={_3}></img>
                            </div>
                        </div>
                        <div class="progress-step">
                            <div className={`img-border ${latestOrder.deliveryStatus >= 3 ? 'active' : 'inactive'}`}>
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