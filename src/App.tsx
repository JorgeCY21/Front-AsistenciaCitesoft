import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Login} from './pages/LoginPage';
import Home from './pages/HomePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

