import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Login} from './pages/LoginPage';
import Home from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

