import './Store.css';

function Store() {
    return (
        <>
        <section class="section">
            <h2>Featured Games</h2>
            <div class="game-grid">
                <div class="game-card featured">
                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/header.jpg" alt="Persona 5 Royal" class="featured-game-img"/>
                <div class="game-card-text">
                    <h3>Persona 5 Royal</h3>
                    <p class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 599,000</span></p>
                </div>
                </div>
                <div class="game-card featured">
                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2161700/header.jpg" alt="Persona 3 Reload" class="featured-game-img"/>
                <div class="game-card-text">
                    <h3>Persona 3 Reload</h3>
                    <p class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 649,000</span></p>
                </div>
                </div>
                <div class="game-card featured">
                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1113000/header.jpg" alt="Persona 4 Golden" class="featured-game-img"/>
                <div class="game-card-text">
                    <h3>Persona 4 Golden</h3>
                    <p class="price"><span class="original">IDR 549,000</span> <span class="discounted">IDR 109,999</span></p>
                </div>
                </div>
            </div>
            </section>

            <div class="store-container">
            <aside class="sidebar">
                <h3>Search & Filter</h3>
                <input class="search" type="text" placeholder="Search..."/>
                
                <h4>Price Range</h4>
                <ul>
                <li><input type="radio" name="price"/> ≤ 45,000 IDR</li>
                <li><input type="radio" name="price"/> ≤ 75,000 IDR</li>
                <li><input type="radio" name="price"/> ≤ 130,000 IDR</li>
                <li><input type="radio" name="price"/> ≤ 549,000 IDR</li>
                <li><input type="radio" name="price"/> ≤ 849,000 IDR</li>
                <li><input type="radio" name="price"/> ≤ 999,000 IDR</li>
                </ul>
                
                <h4>Genre</h4>
                <ul>
                <li><input type="radio" name="genre"/> RPG</li>
                <li><input type="radio" name="genre"/> Action</li>
                <li><input type="radio" name="genre"/> Adventure</li>
                <li><input type="radio" name="genre"/> Strategy</li>
                <li><input type="radio" name="genre"/> Simulation</li>
                <li><input type="radio" name="genre"/> JRPG</li>
                </ul>
            </aside>

            <main class="main-content">
                <div class="tabs">
                    <div class="tab">New & Trending</div>
                    <div class="tab">Top Sellers</div>
                    <div class="tab">Top Rated</div>
                </div>

                <h2>All Games</h2>
                <div class="game-list">

                <div class="game-card">
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/header.jpg" alt="Persona 5 Royal" class="all-game-img"/>
                    <div class="game-card-review">
                    <h3>Persona 5 Royal</h3>
                    <p>Review: 9.5/10 | Release: 2020</p>
                    </div>
                    <div class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 599,000</span></div>
                </div>

                <div class="game-card">
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2161700/header.jpg" alt="Persona 3 Reload" class="all-game-img"/>
                    <div class="game-card-review">
                    <h3>Persona 3 Reload</h3>
                    <p>Review: 9.2/10 | Release: 2023</p>
                    </div>
                    <div class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 649,000</span></div>
                </div>

                <div class="game-card">
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1113000/header.jpg" alt="Persona 4 Golden" class="all-game-img"/>
                    <div class="game-card-review">
                    <h3>Persona 4 Golden</h3>
                    <p>Review: 9.0/10 | Release: 2012</p>
                    </div>
                    <div class="price"><span class="original">IDR 549,000</span> <span class="discounted">IDR 109,999</span></div>
                </div>

                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3061810/header.jpg?t=1748588899" alt="Like a Dragon" class="all-game-img"/>
                    <div class="game-card-review">
                    <h3>Like a Dragon: Pirate Yakuza in Hawaii</h3>
                    <p>Review: 8.5/10 | Release: 2020</p>
                    </div>
                    <div class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 749,000</span></div>
                </div>

                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/927380/header.jpg?t=1741336670" alt="Yakuza Kiwami" class="all-game-img"/>
                    <div class="game-card-review">
                    <h3>Yakuza Kiwami 2</h3>
                    <p>Review: 8.8/10 | Release: 2016</p>
                    </div>
                    <div class="price"><span class="original">IDR 199,000</span> <span class="discounted">IDR 74,999</span></div>
                </div>

                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1875830/header.jpg?t=1731603822" alt="Shin Megami Tensei V" class="all-game-img"/>
                    <div class="game-card-review">
                    <h3>Shin Megami Tensei V: Vengeance</h3>
                    <p>Review: 9.3/10 | Release: 2021</p>
                    </div>
                    <div class="price"><span class="original">IDR 849,000</span> <span class="discounted">IDR 849,000</span></div>
                </div>

                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2288350/header.jpg?t=1753812149" alt="RAIDOU" class="all-game-img"/>
                    <div class="game-card-review">
                    <h3>RAIDOU Remastered: The Mystery of the Soulless Army</h3>
                    <p>Review: 8.7/10 | Release: 2019</p>
                    </div>
                    <div class="price"><span class="original">IDR 699,000</span> <span class="discounted">IDR 649,000</span></div>
                </div>

                <div class="game-card">
                    <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237320/header.jpg?t=1741795892" alt="Sonic Frontiers" class="all-game-img"/>
                    <div class="game-card-review">
                    <h3>Sonic Frontiers</h3>
                    <p>Review: 8.9/10 | Release: 2022</p>
                    </div>
                    <div class="price"><span class="original">IDR 949,000</span> <span class="discounted">IDR 849,000</span></div>
                </div>

                </div>
            </main>
        </div>
        </>
    )
}

export default Store