import './Store.css';

function Store() {
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

                <h4>Ingredient Type</h4>
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

                    <div className="product-card">
                        <img 
                            src="https://bf1af2.akinoncloudcdn.com/products/2025/02/08/146390/13a6f360-af4f-4410-804a-4048dda8d6f8_size3840_cropCenter.jpg"
                            className="product-img"
                            alt="Fresh Apples"
                        />
                        <h3 className="product-title">Fresh Apples (1kg)</h3>
                        <div className="price-box">IDR 25,000</div>
                        <button className="add-cart-btn">Add to Cart</button>
                    </div>

                    <div className="product-card">
                        <img 
                            src="https://images-cdn.ubuy.co.in/634e2c65a0e13a0eb35bdb1a-fresh-organic-bananas-bundle-3-lbs.jpg"
                            className="product-img"
                            alt="Bananas"
                        />
                        <h3 className="product-title">Bananas (1kg)</h3>
                        <div className="price-box">IDR 18,000</div>
                        <button className="add-cart-btn">Add to Cart</button>
                    </div>

                    <div className="product-card">
                        <img 
                            src="https://www.thespruceeats.com/thmb/vbc6MqkqHlkSOx_X5Clyo5qv0kk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/loaf-of-bread-182835505-58a7008c5f9b58a3c91c9a14.jpg"
                            className="product-img"
                            alt="Bread Loaf"
                        />
                        <h3 className="product-title">Whole Wheat Bread</h3>
                        <div className="price-box">IDR 28,000</div>
                        <button className="add-cart-btn">Add to Cart</button>
                    </div>

                    <div className="product-card">
                        <img 
                            src="http://d2j6dbq0eux0bg.cloudfront.net/images/7794225/515325263.jpg"
                            className="product-img"
                            alt="Chicken"
                        />
                        <h3 className="product-title">Chicken Breast (500g)</h3>
                        <div className="price-box">IDR 38,000</div>
                        <button className="add-cart-btn">Add to Cart</button>
                    </div>

                    <div className="product-card">
                        <img 
                            src="https://www.sharbatlyfruit.com/Home/fruits-vegetable/1668/image-thumb__1668__commonThumbnail/Broccoli%20green_5.acdd3ceb.jpg"
                            className="product-img"
                            alt="Broccoli"
                        />
                        <h3 className="product-title">Fresh Broccoli (1pc)</h3>
                        <div className="price-box">IDR 12,000</div>
                        <button className="add-cart-btn">Add to Cart</button>
                    </div>

                    <div className="product-card">
                        <img 
                            src="https://image.astronauts.cloud/product-images/2024/6/GreenfieldsFreshMilkFullCream189L_11419cd5-86ee-4b27-8511-eb4e2c4ff5e5_900x900.jpg"
                            className="product-img"
                            alt="Milk"
                        />
                        <h3 className="product-title">Fresh Milk (1L)</h3>
                        <div className="price-box">IDR 19,000</div>
                        <button className="add-cart-btn">Add to Cart</button>
                    </div>

                    <div className="product-card">
                        <img 
                            src="https://smmarkets.ph/media/catalog/product/2/0/20490207.png"
                            className="product-img"
                            alt="Eggs"
                        />
                        <h3 className="product-title">Eggs (12pcs)</h3>
                        <div className="price-box">IDR 22,000</div>
                        <button className="add-cart-btn">Add to Cart</button>
                    </div>

                    <div className="product-card">
                        <img 
                            src="https://www.bigalaskaseafood.com/cdn/shop/files/fresh_king_fillet_BAS_24.jpg?v=1721857450"
                            className="product-img"
                            alt="Salmon"
                        />
                        <h3 className="product-title">Fresh Salmon (300g)</h3>
                        <div className="price-box">IDR 85,000</div>
                        <button className="add-cart-btn">Add to Cart</button>
                    </div>

                </div>
            </main>
        </div>

        </div>
        </>
    );
}

export default Store;
