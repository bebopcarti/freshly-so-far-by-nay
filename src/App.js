import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports ~
import Header from './header/Header.js';
import Footer from './footer/Footer.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import About from './pages/About.js';
import Home from './pages/Home.js';
import Store from './pages/Store.js';
// ------------ ~

import './App.css'; // Main CSS (bisa override CSS page)


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/store" element={<><Header /><Store /><Footer /></>} />
          <Route path="/about" element={<><Header /><About /><Footer /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
