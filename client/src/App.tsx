import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeadsPage from './pages/LeadsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leads" element={<LeadsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;