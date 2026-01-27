import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Project from './pages/Project';
import Chat from './pages/Chat';
import Info from './pages/Info'; // Import the new Features page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/project" element={<Project />} />
        <Route path="/info" element={<Info />} /> 
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;