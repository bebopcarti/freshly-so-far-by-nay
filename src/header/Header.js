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
              {/* Mengubah tag <a> menjadi <Link to="..."> */}
              <li><Link to="/"><img className="logo-img" src={logo} alt="Freshly Logo"/></Link></li>
              <li><Link to="/store">Store</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>

          <div className="account-info">
            { user ? (
              <>
                <button className="cart header-button"><Link to="/cart">Cart</Link></button>
                <button className="cart header-button"><Link to={`/transaction-history/${user.userId}`}>History</Link></button>
                <button onClick={handleLogout} className="logout header-button">Logout</button>
              </>
            ) : (
              <Link to="/login" className="login header-button">Login</Link>
            )}
          </div>
        </div>
      </header>
    );
}

export default Header