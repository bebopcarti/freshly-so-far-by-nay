import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo_no_bg.png';
import './Header.css';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  console.log(user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
    return (
      <header>
        <div className="nav-container">
          <nav className="main-links">
            <ul className="nav-list">
              <li><a href="/"><img class="logo-img" src={logo} alt="Freshly Logo"/></a></li>
              <li><a href="/">Admin Dashboard</a></li>
              <li><a href="/transaction-history/0">Transaction History</a></li>
            </ul>
          </nav>

          <div className="account-info">
            <button class="header-button">View Analytics</button>
            <button onClick={handleLogout} class="logout header-button">Logout</button>
          </div>
          
        </div>
      </header>
    );
}

export default Header
