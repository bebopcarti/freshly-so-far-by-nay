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

          <div class="account-info">
            <a class="cart-button" href="/cart">Cart</a>
            <a class="login-button" href="/login">Login</a>
          </div>
          
        </div>
      </header>
    );
}

export default Header
