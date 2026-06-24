import { useState, useEffect } from 'react';
import './Store.css';

function Store() {
    const [produk, setProduk] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 9999999999 });

    const user = JSON.parse(localStorage.getItem("user") || "null");

    // 🛠️ OBATNYA DI SINI: SATU USE-EFFECT UNTUK SEMUA FILTER!
    // Ini menghilangkan Infinite Loop dan bentrokan API
    useEffect(() => {
        fetch("http://localhost:3001/produk/filter/all", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                categories: selectedCategories,
                min: priceRange.min,
                max: priceRange.max
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("ISI DATA DARI BACKEND:", data);
            setProduk(data); // 8 produkmu akan langsung masuk ke sini dengan aman!
        })
        .catch(err => console.error("Gagal mengambil produk:", err));
    }, [selectedCategories, priceRange]); // Hanya dijalankan saat kategori atau harga diubah

    const toggleCategory = (kategori) => {
        setSelectedCategories((prev) => {
            if (prev.includes(kategori)) {
                return prev.filter((item) => item !== kategori);
            } else {
                return [...prev, kategori];
            }
        });
    };

    const handlePriceChange = (min, max) => {
        setPriceRange({ min, max });
    };

    // 🛠️ PERBAIKAN: Tombol "All Ingredients" sekarang me-reset semua filter
    const getSemuaProduk = () => {
        setSelectedCategories([]);
        setPriceRange({ min: 0, max: 9999999999 });
        
        // Uncheck semua radio button harga di UI (Opsional tapi bagus untuk UX)
        const radios = document.querySelectorAll('input[type=radio]');
        radios.forEach(radio => radio.checked = false);
    };

    const addToCart = async (produkId) => {
        if (!user) {
            alert("You must be logged in first to add to cart.");
            return;
        }
        
        const resCart = await fetch("http://localhost:3001/cart/getOrCreate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.userId })
        });
        
        const cartData = await resCart.json();
        const cartId = cartData.cartId;

        const resAdd = await fetch("http://localhost:3001/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cartId: cartId,
                produkId: produkId
            })
        });
    
        const addData = await resAdd.json();
        console.log(addData);
        alert("Product added to cart!");
    };
    
    return (
        <div className="store-page">
            <div className="store-container">
                
                {/* Sidebar */}
                <aside className="sidebar">
                    <h3>Search & Filter</h3>

                    <h4>Price Range</h4>
                    <ul>
                        <li><input type="radio" name="price" onChange={() => handlePriceChange(0, 45000)}/> Under IDR 45.000</li>
                        <li><input type="radio" name="price" onChange={() => handlePriceChange(0, 95000)}/> Under IDR 95.000</li>
                        <li><input type="radio" name="price" onChange={() => handlePriceChange(0, 135000)}/> Under IDR 135.000</li>
                        <li><input type="radio" name="price" onChange={() => handlePriceChange(0, 180000)}/> Under IDR 180.000</li>
                        <li><input type="radio" name="price" onChange={() => handlePriceChange(0, 9999999999)}/> Any Price</li>
                    </ul>

                    <h4>Category</h4>
                    <ul>
                        <li><input type="checkbox" checked={selectedCategories.includes("Vegetables")} onChange={() => toggleCategory("Vegetables")} /> Vegetables</li>
                        <li><input type="checkbox" checked={selectedCategories.includes("Fruits")} onChange={() => toggleCategory("Fruits")} /> Fruits</li>
                        <li><input type="checkbox" checked={selectedCategories.includes("Meat")} onChange={() => toggleCategory("Meat")} /> Meat</li>
                        <li><input type="checkbox" checked={selectedCategories.includes("Seafood")} onChange={() => toggleCategory("Seafood")} /> Seafood</li>
                        <li><input type="checkbox" checked={selectedCategories.includes("Dairy")} onChange={() => toggleCategory("Dairy")}/> Dairy</li>
                        <li><input type="checkbox" checked={selectedCategories.includes("Bakery")} onChange={() => toggleCategory("Bakery")}/> Bakery</li>
                    </ul>

                    {/* Mengubah menjadi tombol agar fungsinya jelas me-reset filter */}
                    <button onClick={getSemuaProduk} style={{marginTop: '15px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#386641', color: 'white', border: 'none', borderRadius: '5px'}}>
                        Clear Filters (Show All)
                    </button>
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
                                <button className="add-cart-btn" onClick={() => addToCart(p.produkId)}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Store;