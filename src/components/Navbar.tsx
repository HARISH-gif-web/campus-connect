import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, LogOut, PlusCircle } from 'lucide-react';

export default function Navbar({ user, setUser }: { user: any, setUser: any }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="border-b border-black py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="w-8 h-8" />
          Campus Connect
        </Link>
        
        <div className="flex items-center gap-6">
          {/* College Logo */}
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/f/f6/IIITDM_Kurnool_Logo.png" 
              alt="IIITDM Kurnool Logo" 
              className="w-full h-full object-contain filter grayscale brightness-0 opacity-80"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerText = 'IIITDM';
                e.currentTarget.parentElement!.className = 'w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600';
              }}
            />
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hover:underline">Events</Link>
            {user ? (
              <>
                <Link to="/create-event" className="flex items-center gap-1 hover:underline">
                  <PlusCircle className="w-4 h-4" /> Create
                </Link>
                <Link to="/my-events" className="hover:underline">My Events</Link>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{user.username}</span>
                  <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-full">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
