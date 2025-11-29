import { useState } from 'react';
import { useEffect } from 'react';
import './Store.css';

function Store() {
    const [produk, setProduk] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 9999999999});

    const user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:3001/cart/getOrCreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.userId })
    })
    .then(res => res.json())
    .then(data => console.log("Cart ID:", data.cartId));

    useEffect(() => {
        if (selectedCategories.length === 0) {
          fetch("http://localhost:3001/produk")
            .then(res => res.json())
            .then(data => setProduk(data));
        } else {
          fetch("http://localhost:3001/produk/filter", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(selectedCategories)
          })
          .then(res => res.json())
          .then(data => setProduk(data));
        }
    }, [selectedCategories]);

    const toggleCategory = (kategori) => {
        setSelectedCategories((prev) => {
          if (prev.includes(kategori)) {
            return prev.filter((item) => item !== kategori);
          } else {
            return [...prev, kategori];
          }
        });
      };

    const getSemuaProduk = () => {
        fetch("http://localhost:3001/produk")
          .then(res => res.json())
          .then(data => {
            setProduk(data);
        });
    };

    useEffect(() => {
        fetch("http://localhost:3001/produk/price", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(priceRange)
        })
        .then(res => res.json())
        .then(data => setProduk(data));
    }, [priceRange]);

    const handlePriceChange = (min, max) => {
        setPriceRange({ min, max });
    };

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
        .then(data => setProduk(data));
    }, [selectedCategories, priceRange]);

    return (
        <>
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
                    <li><input type="checkbox" onChange={() => toggleCategory("Vegetables")} /> Vegetables</li>
                    <li><input type="checkbox" onChange={() => toggleCategory("Fruits")} /> Fruits</li>
                    <li><input type="checkbox" onChange={() => toggleCategory("Meat")} /> Meat</li>
                    <li><input type="checkbox" onChange={() => toggleCategory("Seafood")} /> Seafood</li>
                    <li><input type="checkbox" onChange={() => toggleCategory("Dairy")}/> Dairy</li>
                    <li><input type="checkbox" onChange={() => toggleCategory("Bakery")}/> Bakery</li>
                </ul>

                <li><input type="checkbox" onClick={getSemuaProduk} /> All Ingredients</li>
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
