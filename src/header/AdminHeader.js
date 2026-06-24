import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo_no_bg.png';
import './Header.css';

function AdminHeader() { // Mengubah nama fungsi agar sesuai nama file
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <div className="nav-container">
        <nav className="main-links">
          <ul className="nav-list">
            <li><Link to="/"><img className="logo-img" src={logo} alt="Freshly Logo"/></Link></li>
            <li><Link to="/">Admin Dashboard</Link></li>
            {/* 🛠️ PERBAIKAN: Mengarahkan ID transaksi ke ID 2 (ID Admin asli kalian) */}
            <li><Link to="/transaction-history/2">Transaction History</Link></li>
          </ul>
        </nav>

        <div className="account-info">
          <button className="header-button">View Analytics</button>
          <button onClick={handleLogout} className="logout header-button">Logout</button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader; // Pastikan export default-nya sama