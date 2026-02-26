import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';
import MyEvents from './pages/MyEvents';
import { useState, useEffect } from 'react';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not authenticated');
      })
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white text-black font-sans">
        <Navbar user={user} setUser={setUser} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/create-event" element={<CreateEvent user={user} />} />
            <Route path="/events/:id" element={<EventDetail user={user} />} />
            <Route path="/my-events" element={<MyEvents user={user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
