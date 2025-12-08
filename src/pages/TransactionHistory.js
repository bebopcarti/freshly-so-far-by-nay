import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './TransactionHistory.css';

function TransactionHistory() {
    const [history, setHistory] = useState([]);
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
                if (data && Array.isArray(data.data)) {
                    setHistory(data.data);
                } else if (data && Array.isArray(data.records)) {
                    setHistory(data.records);
                } else {
                    setHistory([]); 
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [user, isAdmin, navigate]);

    // DEBUG
    // const testHistory = [
    //     {
    //         paymentId: 701,
    //         orderId: 5001,
    //         method: "Credit Card",
    //         paymentStatus: "Completed",
    //         paymentDate: "2025-11-20T10:00:00Z",
    //         userId: 101
    //     },
    //     {
    //         paymentId: 702,
    //         orderId: 5002,
    //         method: "QRIS",
    //         paymentStatus: "Pending",
    //         paymentDate: "2025-11-25T14:30:00Z",
    //         userId: 102
    //     },
    //     {
    //         paymentId: 703,
    //         orderId: 5003,
    //         method: "QRIS",
    //         paymentStatus: "Failed",
    //         paymentDate: "2025-11-28T09:15:00Z",
    //         userId: 101
    //     },
    //     {
    //         paymentId: 704,
    //         orderId: 5004,
    //         method: "Cash on Delivery",
    //         paymentStatus: "Processing",
    //         paymentDate: "2025-12-05T16:45:00Z",
    //         userId: 103
    //     },
    // ];
    // ---

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
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6">Loading history...</td></tr>
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
                                    </tr>
                                ))
                            )}
                            
                            {/* {!loading && testHistory.length === 0 && ( // DEBUG */}
                            {!loading && history.length === 0 && ( 
                                <tr><td colSpan="6">No transactions found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
}

export default TransactionHistory 