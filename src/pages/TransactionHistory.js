import { useState, useEffect } from 'react';
import './TransactionHistory.css';

function TransactionHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/transaction-history') 
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
    }, []);

    const testHistory = [
        {
            paymentId: 701,
            orderId: 5001,
            method: 'Card',
            paymentStatus: 'COMPLETED', 
            paymentDate: '2025-11-20 10:45:00'
        },
        {
            paymentId: 702,
            orderId: 5002,
            method: 'QRIS',
            paymentStatus: 'COMPLETED', 
            paymentDate: '2025-11-20 10:45:00'
        },
        {
            paymentId: 703,
            orderId: 5003,
            method: 'COD',
            paymentStatus: 'COMPLETED', 
            paymentDate: '2025-11-20 10:45:00'
        }
    ]

    return (
        <div className="transact-body"> 
            <div className="transact-wrapper">
                <h1>Your Transaction History</h1>
                
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Method</th>
                            <th>Date</th>
                            <th>Status</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4">Loading history...</td></tr>
                        ) : (
                            testHistory.map((item) => (
                                <tr key={item.paymentId}>
                                    <td>{item.paymentId}</td>
                                    <td>{item.orderId}</td>
                                    <td>{item.method}</td>
                                    <td>{new Date(item.paymentDate).toLocaleDateString()}</td>
                                    <td>{item.paymentStatus}</td>
                                </tr>
                            ))
                        )}
                        
                        {!loading && testHistory.length === 0 && (
                            <tr><td colSpan="5">No transactions found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionHistory 