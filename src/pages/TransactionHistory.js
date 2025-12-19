import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './TransactionHistory.css';

function TransactionHistory() {
    const [history, setHistory] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showOrders, setBool] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const isAdmin = user && user.role === 'admin';

    const handleDetails = (orderId) => {
        { user ? 
            navigate(`/progress/${user.userId}/${orderId}`)
            : 
            navigate(`/login`);
        }
    }
    
    useEffect(() => {
        if (!user) {return navigate('/');}
        const apiUrl = `http://localhost:3001/transaction-history/${user.userId}`
        fetch(apiUrl) 
            .then(response => response.json())
            .then(data => {
                setHistory(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [user, isAdmin, navigate]);

    const getOrders = (orderId) => {
        fetch(`http://localhost:3001/transaction-history/${user.userId}/${orderId}`)
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setBool(true);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
            })
        };
        return (
            <div className="transact-body"> 
                <div className="transact-wrapper">
                    <h1>{isAdmin ? 'Admin: All Transaction History' : 'Your Transaction History'}</h1>
                    
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                {isAdmin && <th>User ID</th>}
                                <th>Order ID</th>
                                <th>Method</th>
                                <th>Date</th>
                                <th>Status</th>
                                {!isAdmin && <th>Details</th>}
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7">Loading history...</td></tr>
                            ) : (
                                history.map((item) => (
                                // testHistory.map((item) => ( // DEBUG
                                    <tr key={item.paymentId}>
                                        <td>{item.paymentId}</td>
                                        {isAdmin && <td>{item.userId}</td>}
                                        <td>{item.orderId}</td>
                                        <td>{item.method}</td>
                                        <td>{new Date(item.paymentDate).toLocaleDateString()}</td>
                                        <td>{item.paymentStatus}</td>
                                        {!isAdmin && (
                                            <td><button onClick={() => handleDetails(item.orderId)} class="details-button">Track Progress</button></td>
                                        )}
                                        <td><button onClick={() => getOrders(item.orderId)} class="details-button">See Items</button></td>
                                    </tr>
                                ))
                            )}
                            
                            {/* {!loading && testHistory.length === 0 && ( // DEBUG */}
                            {!loading && history.length === 0 && ( 
                                <tr><td colSpan="7">No transactions found.</td></tr>
                            )}
                        </tbody>
                    </table>

                    {showOrders && (
                        <div className="order-popup">
                            <div className="order-content">
                                <table class="orders-table">
                                    <thead>
                                        <tr>
                                            <th>Amount</th>
                                            <th>Product</th>
                                            <th>Subtotal</th>
                                        </tr>                                    
                                    </thead>
                                    <tbody>
                                        {orders.map((item) => (
                                            <tr key={item.produkId}>
                                                <td>{item.quantity}x</td>
                                                <td>{item.nama}</td>
                                                <td>{item.subtotal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button className="details-button" onClick={() => setBool(false)}>Close</button>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default TransactionHistory 