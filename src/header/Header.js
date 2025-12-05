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
        <div class="nav-container">
          <nav class="main-links">
            <ul class="nav-list">
              <li><a href="/"><img class="logo-img" src={logo} alt="Freshly Logo"/></a></li>
              <li><a href="/store">Store</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </nav>

          <div class="account-info">
            { user ? (
              <>
                <Link to="/cart" class="cart header-button">Cart</Link>
                <Link to={`/progress/${user.userId}`} class="progress header-button">Progress</Link>
                <button onClick={handleLogout} class="logout header-button">Logout</button>
              </>
            ) : (
              <Link to="/login" class="login header-button">Login</Link>
            )}
          </div>
          
        </div>
      </header>
    );
}

export default Header
