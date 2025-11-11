import './Home.css';

function Home() {
    return (
        <>
        <section class="css-slider-wrapper">
            <div class="css-slider">
                <div class="slide">
                    <a href="store.html?game=persona5">
                        <img src="https://images.alphacoders.com/137/thumb-1920-1370594.jpeg" alt="Persona 5 Royal" />
                    </a>
                </div>
                <div class="slide">
                    <a href="store.html?game=persona3">
                        <img src="https://images7.alphacoders.com/134/thumb-1920-1344916.jpeg" alt="Persona 3 Reload" />
                    </a>
                </div>
                <div class="slide">
                    <a href="store.html?game=persona4">
                        <img src="https://c4.wallpaperflare.com/wallpaper/993/425/252/persona-series-manga-persona-4-satonaka-chie-wallpaper-preview.jpg" />
                    </a>
                </div>
            </div>
            <div class="slider-text">AC Store Summer Sale up to 80%</div>
        </section>

        <section class="section">
            <h2>Special Offer</h2>
            <div class="game-grid">
                <div class="game-card">
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/header.jpg" alt="Persona 5 Royal" />
                    <h3>Persona 5 Royal</h3>
                    <p class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 599,000</span></p>
                </div>
                <div class="game-card">
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2161700/header.jpg" alt="Persona 3 Reload" />
                    <h3>Persona 3 Reload</h3>
                    <p class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 649,000</span></p>
                </div>
                <div class="game-card">
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1113000/header.jpg" alt="Persona 4 Golden" />
                    <h3>Persona 4 Golden</h3>
                    <p class="price"><span class="original">IDR 549,000</span> <span class="discounted">IDR 109,999</span></p>
                </div>
                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3061810/header.jpg?t=1748588899" alt="Like a Dragon" />
                    <h3>Like a Dragon: Pirate Yakuza in Hawaii</h3>
                    <p class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 749,000</span></p>
                </div>
                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/834530/header.jpg?t=1741324846" alt="Yakuza Kiwami" />
                    <h3>Yakuza Kiwami</h3>
                    <p class="price"><span class="original">IDR 199,000</span> <span class="discounted">IDR 74,999</span></p>
                </div>
            </div>
        </section>

        <section class="section">
            <h2>Browse by Category</h2>
            <div class="categories">
                <div class="category">
                    <img src="https://store.akamai.steamstatic.com/categories/homepageimage/category/visual_novel?cc=us&l=english&v=2" alt="" />
                    <span>RPG</span>
                </div>
                <div class="category">
                    <img src="https://store.akamai.steamstatic.com/categories/homepageimage/category/action?cc=us&l=english&v=2" alt="" />
                    <span>Action</span>
                </div>
                <div class="category">
                    <img src="https://store.akamai.steamstatic.com/categories/homepageimage/vr?cc=us&l=english&v=2" alt="" />
                    <span>Adventure</span>
                </div>
                <div class="category">
                    <img src="https://store.akamai.steamstatic.com/categories/homepageimage/category/strategy?cc=us&l=english&v=2" alt="" />
                    <span>Strategy</span>
                </div>
                <div class="category">
                    <img src="https://store.akamai.steamstatic.com/categories/homepageimage/category/simulation?cc=us&l=english&v=2" alt="" />
                    <span>Simulation</span>
                </div>
                <div class="category">
                    <img src="https://store.akamai.steamstatic.com/categories/homepageimage/category/science_fiction?cc=us&l=english&v=2" alt="" />
                    <span>JRPG</span>
                </div>
            </div>
        </section>
            
        <section class="section">
            <h2>Featured Games</h2>
            <div class="game-grid">
                <div class="game-card">
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/header.jpg" alt="Persona 5 Royal" />
                    <h3>Persona 5 Royal</h3>
                    <p class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 599,000</span></p>
                </div>
                <div class="game-card">
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2161700/header.jpg" alt="Persona 3 Reload" />
                    <h3>Persona 3 Reload</h3>
                    <p class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 649,000</span></p>
                </div>
                <div class="game-card">
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1113000/header.jpg" alt="Persona 4 Golden" />
                    <h3>Persona 4 Golden</h3>
                    <p class="price"><span class="original">IDR 549,000</span> <span class="discounted">IDR 109,999</span></p>
                </div>
                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3061810/header.jpg?t=1748588899" alt="Like a Dragon" />
                    <h3>Like a Dragon: Pirate Yakuza in Hawaii</h3>
                    <p class="price">IDR 749,000</p>
                </div>
                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/834530/header.jpg?t=1741324846" alt="Yakuza Kiwami 2" />
                    <h3>Yakuza Kiwami 2</h3>
                    <p class="price">IDR 849,000</p>
                </div>
                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1875830/header.jpg?t=1731603822" alt="Shin Megami Tensei V" />
                    <h3>Shin Megami Tensei V: Vengeance</h3>
                    <p class="price">IDR 849,000</p>
                </div>
                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2288350/header.jpg?t=1753812149" alt="RAIDOU" />
                    <h3>RAIDOU Remastered: The Mystery of the Soulless Army</h3>
                    <p class="price">IDR 649,000</p>
                </div>
                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237320/header.jpg?t=1741795892" alt="Sonic Frontiers" />
                    <h3>Sonic Frontiers</h3>
                    <p class="price">IDR 849,000</p>
                </div>
                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1235140/header.jpg?t=1741337797" alt="Yakuza: Like a Dragon" />
                    <h3>Yakuza: Like a Dragon</h3>
                    <p class="price">IDR 849,000</p>
                </div>
                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2679460/header.jpg?t=1749196876" alt="Metaphor" />
                    <h3>Metaphor: ReFantazio</h3>
                    <p class="price">IDR 999,000</p>
                </div>
            </div>
        </section>
        </>
    )
}

export default Home