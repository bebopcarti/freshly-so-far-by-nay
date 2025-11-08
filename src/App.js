import './App.css';
import Header from './header/Header.js';
import About from './pages/About.js';
import Footer from './footer/Footer.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">

        <Header />
        
        <Routes>
          {/* <Route path="/" element={<Home />}/>
          <Route path="/store" element={<Store />}/> */}
          <Route path="/about" element={<About />}/>
        </Routes>

        <Footer />
      
      </div>
    </Router>
  );
}

export default App;
