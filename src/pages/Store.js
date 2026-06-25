import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Store.css';

function Store() {
    const { user } = useAuth(); 
    
    const [produk, setProduk] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 9999999999 });

// 🛠️ PERHATIKAN BARIS METHOD: "POST" DI BAWAH INI
    useEffect(() => {
        fetch("http://localhost:3001/produk/filter/all", {
            method: "POST", // <- INI ADALAH OBAT DARI SEGALA ERROR TERSEBUT
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
            // Sabuk pengaman agar layar tidak pernah putih lagi
            if (Array.isArray(data)) {
                setProduk(data); 
            } else {
                setProduk([]); 
            }
        })
        .catch(err => console.error("Gagal mengambil produk:", err));
    }, [selectedCategories, priceRange]);

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

    const getSemuaProduk = () => {
        setSelectedCategories([]);
        setPriceRange({ min: 0, max: 9999999999 });
        
        const radios = document.querySelectorAll('input[type=radio]');
        radios.forEach(radio => radio.checked = false);
    };

    // 🛠️ FUNGSI WISHLIST (Berdiri sendiri dengan aman)
    const toggleWishlist = async (productId) => {
        if (!user) {
            alert("Kamu harus login dulu untuk menyimpan produk favorit ❤️!");
            return;
        }

        // 🔐 Kunci Ganda: Antisipasi format ID baru dari database
        const currentUserId = user.user_id || user.userId;

        fetch("http://localhost:3001/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                userId: currentUserId, 
                produkId: productId 
            })
        })
        .then(res => res.json())
        .then(data => {
            // Jika backend menolak, tampilkan error
            if (data.error || data.code) {
                console.error("Gagal DB:", data);
                alert("Ups, gagal menyimpan ke wishlist!");
            } else {
                // Jika sukses, munculkan pop-up pemberitahuan!
                alert("Berhasil ditambahkan ke Wishlist ❤️!");
            }
        })
        .catch(err => console.error("Error Fetch Wishlist:", err));
    };

    // 🛠️ FUNGSI ADD TO CART (Berdiri sendiri dengan aman)
    const addToCart = async (productId) => {
        if (!user) {
            alert("You must be logged in first to add to cart.");
            return;
        }
        
        // 🔐 KUNCI GANDA: Antisipasi format user lama maupun baru
        const currentUserId = user.user_id || user.userId;

        const resCart = await fetch("http://localhost:3001/cart/getOrCreate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: currentUserId })
        });
        
        const cartData = await resCart.json();
        const cartId = cartData.cartId;

        const resAdd = await fetch("http://localhost:3001/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cartId: cartId,
                user_id: currentUserId, // KITA PASTIKAN ID-NYA TERKIRIM!
                product_id: productId
            })
        });
    
        const addData = await resAdd.json();
        
        // 🚨 SABUK PENGAMAN ERROR: Cegah "Silent Failure"
        if (addData.error || addData.code) {
            console.error("GAGAL MENYIMPAN KE DB:", addData);
            alert("Gagal memasukkan ke keranjang! Cek terminal backend.");
        } else {
            console.log("SUKSES:", addData);
            alert("Product added to cart!");
        }
    };
    
    return (
        <div className="store-page">
            <div className="store-container">
                
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

                    <button onClick={getSemuaProduk} style={{marginTop: '15px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#386641', color: 'white', border: 'none', borderRadius: '5px'}}>
                        Clear Filters (Show All)
                    </button>
                </aside>

                <main className="main-content">
                    <h2>All Ingredients</h2>
                    <div className="product-grid">
                        {/* Gunakan produk?.map untuk mencegah error jika produk tidak sengaja menjadi null */}
                        {produk?.map((p) => (
                            <div className="product-card" key={p.product_id || Math.random()}>
                                <div 
                                    style={{textAlign: 'right', cursor: 'pointer', fontSize: '20px'}} 
                                    onClick={() => toggleWishlist(p.product_id)}
                                >
                                    ❤️
                                </div>
                                
                                {/* Tambahkan fallback gambar jika nama file kosong */}
                                <img src={`http://localhost:3001/uploads/${p.image || 'default.png'}`} className="product-img" alt={p.name || 'Produk'} />
                                <h3 className="product-title">{p.name || 'Nama Produk'}</h3>
                                
                                {/* 🛠️ PERBAIKAN UTAMA: Paksa price menjadi Number (Angka) sebelum diberi titik ribuan */}
                                <div className="price-box">
                                    IDR {p.price ? Number(p.price).toLocaleString() : 0}
                                </div>
                                
                                <button className="add-cart-btn" onClick={() => addToCart(p.product_id)}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Store;