import './Header.css';

function Header() {
    return (
      <header>
        <div class="nav-container">
          <nav class="main-links">
            <ul class="nav-list">
              <li>Admin Dashboard</li>
              <li><a href="/store">Product</a></li>
              <li><a href="/store">Transaction History</a></li>
            </ul>
          </nav>

          <div class="account-info">
            <a class="login-button" href="/login">Logout</a>
          </div>
          
        </div>
      </header>
    );
}

export default Header
