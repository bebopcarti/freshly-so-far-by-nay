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
        if (user) {
            // Disesuaikan dengan struktur user_id baru
            navigate(`/progress/${user.user_id}/${orderId}`);
        } else {
            navigate(`/login`);
        }
    };

    // 🛠️ FUNGSI BARU: Modal Review (Target Minggu 4)
    const showReviewModal = (orderId) => {
        // Untuk sekarang kita gunakan alert. 
        // Nanti kamu bisa menggantinya dengan state untuk memunculkan pop-up form bintang!
        alert(`Membuka form ulasan untuk Order ID: ${orderId} \nTerima kasih sudah berbelanja!`);
    };
    
    useEffect(() => {
        if (!user) { return navigate('/'); }
        
        // Memastikan menggunakan user_id sesuai database baru
        const apiUrl = `http://localhost:3001/transaction-history/${user.user_id}`;
        
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
        fetch(`http://localhost:3001/transaction-history/${user.user_id}/${orderId}`)
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setBool(true);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
            });
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
                                // Menggunakan item.order_id sesuai primary key di DB
                                <tr key={item.order_id || item.orderId}>
                                    <td>{item.order_id || item.orderId}</td>
                                    {isAdmin && <td>{item.user_id}</td>}
                                    <td>{item.order_id || item.orderId}</td>
                                    <td>{item.method || 'Card'}</td>
                                    <td>{new Date(item.created_at || item.paymentDate).toLocaleDateString()}</td>
                                    
                                    {/* Kolom Status */}
                                    <td>
                                        {isAdmin ? (
                                            <select className="prog-details-button" defaultValue={item.status}>
                                                <option value="Placed">Placed</option>
                                                <option value="Packaged">Packaged</option>
                                                <option value="On The Way">On The Way</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        ) : (
                                            <span style={{fontWeight: 'bold', color: item.status === 'Delivered' ? '#386641' : '#f2aa4c'}}>
                                                {item.status}
                                            </span>
                                        )}
                                    </td>

                                    {!isAdmin && (
                                        <td>
                                            <button onClick={() => handleDetails(item.order_id || item.orderId)} className="details-button">
                                                Track Progress
                                            </button>
                                            
                                            {/* 🛠️ TARGET MINGGU 4: LOGIKA TOMBOL REVIEW */}
                                            {item.status === 'Delivered' && (
                                                <button 
                                                    onClick={() => showReviewModal(item.order_id || item.orderId)} 
                                                    className="details-button" 
                                                    style={{marginLeft: '8px', backgroundColor: '#f4a261', color: 'white', border: 'none'}}
                                                >
                                                    Beri Ulasan ⭐
                                                </button>
                                            )}
                                        </td>
                                    )}
                                    
                                    <td>
                                        <button onClick={() => getOrders(item.order_id || item.orderId)} className="details-button">
                                            See Items
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        
                        {!loading && history.length === 0 && ( 
                            <tr><td colSpan={isAdmin ? 8 : 7}>No transactions found.</td></tr>
                        )}
                    </tbody>
                </table>

                {showOrders && (
                    <div className="order-popup">
                        <div className="order-content">
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Product</th>
                                        <th>Subtotal</th>
                                    </tr>                                    
                                </thead>
                                <tbody>
                                    {orders.map((item, index) => (
                                        <tr key={item.product_id || index}>
                                            <td>{item.quantity}x</td>
                                            {/* 🛠️ Ubah item.nama jadi item.name sesuai DB baru */}
                                            <td>{item.nama}</td> 
                                            <td>IDR {item.subtotal ? item.subtotal.toLocaleString() : 0}</td>
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

export default TransactionHistory;