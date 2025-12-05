import './Header.css';

function Header() {
    return (
      <header>
        <div className="nav-container">
          <nav className="main-links">
            <ul className="nav-list">
              <li>Admin Dashboard</li>
              <li><a href="/store">Product</a></li>
              <li><a href="/store">Transaction History</a></li>
            </ul>
          </nav>

          <div className="account-info">
            <a className="login-button" href="/login">Logout</a>
          </div>
          
        </div>
      </header>
    );
}

export default Header
