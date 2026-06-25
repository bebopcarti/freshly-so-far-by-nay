import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Store.css'; 

function Wishlist() {
    const { user } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        if (!user) return;
        
        // 🔐 INI DIA KUNCINYA: Memastikan ID dibaca dengan benar (lama maupun baru)
        const currentUserId = user.user_id || user.userId;
        
        // Mengambil data dengan ID yang pasti valid, bukan 'undefined'
        fetch(`http://localhost:3001/wishlist/${currentUserId}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setWishlistItems(data);
                } else {
                    setWishlistItems([]);
                }
            })
            .catch(err => console.error("Error fetching wishlist:", err));
    }, [user]);

    const removeFromWishlist = (wishlistId) => {
        // 🛠️ PERBAIKAN: Menghapus menggunakan Primary Key 'wishlist_id'
        fetch(`http://localhost:3001/wishlist/${wishlistId}`, { method: 'DELETE' })
            .then(() => {
                setWishlistItems(prev => prev.filter(item => item.wishlist_id !== wishlistId));
            })
            .catch(err => console.error("Error deleting item:", err));
    };

    if (!user) return <div className="store-page"><h2 style={{textAlign: 'center', marginTop: '50px'}}>Please login to view Wishlist.</h2></div>;

    return (
        <div className="store-page" style={{ minHeight: '80vh' }}>
            <div className="main-content" style={{ padding: '40px 20px' }}>
                <h2 style={{ color: '#386641', marginBottom: '30px', textAlign: 'center' }}>Your Favorite Items ❤️</h2>
                
                {wishlistItems.length === 0 ? (
                    <div style={{ textAlign: 'center', fontSize: '18px' }}>
                        Your Wishlist Is Empty. <Link to="/store" style={{ color: '#e63946', fontWeight: 'bold' }}>Go Shopping!</Link>
                    </div>
                ) : (
                    <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                        {wishlistItems.map((item) => (
                            <div className="product-card" key={item.wishlist_id} style={{ width: '250px' }}>
                                <img 
                                    src={`http://localhost:3001/uploads/${item.image || 'default.png'}`} 
                                    className="product-img" 
                                    alt={item.name} 
                                />
                                <h3 className="product-title">{item.name}</h3>
                                
                                {/* Sabuk pengaman kalkulasi harga */}
                                <div className="price-box">IDR {item.price ? Number(item.price).toLocaleString() : 0}</div>
                                
                                <button 
                                    className="add-cart-btn" 
                                    onClick={() => removeFromWishlist(item.wishlist_id)} 
                                    style={{
                                        backgroundColor: '#bc4749', 
                                        width: '100%', 
                                        marginTop: '10px'
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;