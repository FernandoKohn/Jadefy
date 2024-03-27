import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Componentes/Pagina/Home';
import Projeto from './Componentes/Pagina/Projeto';




function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Projeto" element={<Projeto/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
