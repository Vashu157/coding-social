import { Routes, Route,useLocation  } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Form from './pages/Form';

import Dashboard from './pages/Dashboard';
import About from './pages/About.jsx';


export default function App() {
  const location = useLocation();
  const hideSidebarOnRoutes = ['/']; 
  const showSidebar = !hideSidebarOnRoutes.includes(location.pathname);
  const showNavbar = !hideSidebarOnRoutes.includes(location.pathname);
  return (
    <>
      {showNavbar && <Navbar />}
      <div style={{ display: 'flex' }}>
        {showSidebar && <Sidebar />}
        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/form" element={<Form />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
