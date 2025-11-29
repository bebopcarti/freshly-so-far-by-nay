import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports ~
import Header from './header/Header.js';
import Header2 from './header/Header2.js';
import Footer from './footer/Footer.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import About from './pages/About.js';
import Home from './pages/Home.js';
import Store from './pages/Store.js';
import Cart from './pages/Cart.js';
import Transaction from './pages/Transaction.js';
import Progress from './pages/Progress.js';
import Admin from './pages/Admin.js';
import AdminHeader from './header/AdminHeader.js';
// ------------ ~

import './App.css'; // Main CSS (bisa override CSS page)


function App() {
  return (
    <Router>
      <div className="App">
        {/*
        <Routes>
          <Route path="/login" element={<><Header2/><Login /></>} />
          <Route path="/register" element={<><Header2/><Register /></>} />
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/store" element={<><Header /><Store /><Footer /></>} />
          <Route path="/about" element={<><Header /><About /><Footer /></>} />
          <Route path="/cart" element={<><Header /><Cart /><Footer /></>} />
          <Route path="/progress" element={<><Header /><Progress /><Footer /></>} />
          <Route path="/transaction" element={<><Header /><Transaction /></>} />
        </Routes>
        */}
        <Admin />
      </div>
    </Router>
  );
}

export default App;
