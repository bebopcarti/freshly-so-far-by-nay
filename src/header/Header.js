import logo from '../assets/logo_no_bg.png';
import './Header.css';

function Header() {
    return (
      <header>
        <div class="nav-container">
          <nav class="main-links">
            <ul class="nav-list">
              <li><a href="/"><img class="logo-img" src={logo} alt="Freshly Logo"/></a></li>
              <li><a href="/store">Store</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </nav>

          <div class="search">
            {/* <div class="cart">
              <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Cart"/>
            </div> */}
            <input type="text" class="search-input" placeholder="Search Ingredients..."/>
          </div>

          <div class="account-info">
            <a class="login-button" href="/login">Login</a>
          </div>
          
        </div>
      </header>
    );
}

export default Header
