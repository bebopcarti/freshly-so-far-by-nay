import { useState } from 'react';
import { useEffect } from 'react';
import './Store.css';

function Store() {
    const [produk, setProduk] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/produk")
          .then(res => res.json())
          .then(data => {
            setProduk(data);
          })
          .catch(err => console.error("Error mengambil produk:", err));
    }, []);

    return (
        <>
        <div className="store-page">

        <div className="store-container">
            
            {/* Sidebar */}
            <aside className="sidebar">
                <h3>Search & Filter</h3>

                <h4>Price Range</h4>
                <ul>
                    <li><input type="radio" name="price" /> Under Rp 45.000</li>
                    <li><input type="radio" name="price" /> Under Rp 95.000</li>
                    <li><input type="radio" name="price" /> Under Rp 135.000</li>
                    <li><input type="radio" name="price" /> Under Rp 180.000</li>
                    <li><input type="radio" name="price" /> Any Price</li>
                </ul>

                <h4>Category</h4>
                <ul>
                    <li><input type="checkbox" /> Vegetables</li>
                    <li><input type="checkbox" /> Fruits</li>
                    <li><input type="checkbox" /> Meat</li>
                    <li><input type="checkbox" /> Seafood</li>
                    <li><input type="checkbox" /> Dairy</li>
                    <li><input type="checkbox" /> Bakery</li>
                </ul>
            </aside>

            {/* Items */}
            <main className="main-content">
                <h2>All Ingredients</h2>

                <div className="product-grid">

                    {produk.map((p) => (
                        <div className="product-card" key={p.produkId}>
                            <img 
                                src={`http://localhost:3001/uploads/${p.gambar}`}
                                className="product-img"
                                alt={p.nama}
                            />
                            <h3 className="product-title">{p.nama}</h3>
                            <div className="price-box">IDR {p.harga.toLocaleString()}</div>
                            <button className="add-cart-btn">Add to Cart</button>
                        </div>
                    ))}

                </div>
            </main>
        </div>

        </div>
        </>
    );
}

export default Store;
