import logo from '../acpowered.png';
import './Header.css';

function Header() {
    return (
      <header>
        <div class="nav-container">
          <div class="logo">
            <img src={logo} alt="ACPowered Logo"/>
          </div>
          <nav class="nav-links">
            <a href="index.html">Home</a>
            <a href="store.html">Store</a>
            <a href="about.html">About</a>
          </nav>
          <div class="right-header">
            <div class="cart">
              <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Cart"/>
            </div>
            <input type="text" class="search-pc" placeholder="Search games..."/>
          </div>
          <div class="hamburger" onclick="document.querySelector('.mobile-query').classList.toggle('active')">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="mobile-query">
          <a href="index.html">Home</a>
          <a href="store.html">Store</a>
          <a href="about.html">About</a>
          <input type="text" placeholder="Search games..."/>
        </div>
      </header>
    );
}

export default Header