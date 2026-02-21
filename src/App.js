// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Import Login page
import Main from './pages/Main';
import Project from './pages/Project';
import Chat from './pages/Chat';
import Info from './pages/Info';
import Jira from './pages/Jira';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login as home page */}
        <Route path="/main" element={<Main />} /> {/* Renamed main route */}
        <Route path="/project" element={<Project />} />
        <Route path="/info" element={<Info />} /> 
        <Route path="/chat" element={<Chat />} />
        <Route path="/jira/:projectKey" element={<Jira />} />
      </Routes>
    </Router>
  );
}

export default App;