import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports ~
import Header from './header/Header.js';
import Footer from './footer/Footer.js';
import About from './pages/About.js';
import Home from './pages/Home.js';
import Store from './pages/Store.js';
// ------------ ~

import './App.css'; // Main CSS (bisa override CSS page)


function App() {
  return (
    <Router>
      <div className="App">

        <Header />
        
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/store" element={<Store />}/>
          <Route path="/about" element={<About />}/>
        </Routes>

        <Footer />
      
      </div>
    </Router>
  );
}

export default App;
