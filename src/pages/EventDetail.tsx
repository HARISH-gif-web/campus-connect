import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, User, Tag, Clock } from 'lucide-react';

export default function EventDetail({ user }: { user: any }) {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`/api/events/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEvent(data);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(`/api/events/${id}/rsvp`, {
        method: 'POST',
      });
      
      if (res.ok) {
        setRsvpStatus('success');
        fetchEvent(); // Refresh to update status if needed
      } else {
        setRsvpStatus('error');
      }
    } catch (error) {
      setRsvpStatus('error');
    }
  };

  if (loading) return <div className="text-center mt-12">Loading...</div>;
  if (!event) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <img 
        src={event.image_url || '/images/default-event.png'} 
        alt={event.title} 
        className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
        onError={(e) => {
          e.currentTarget.src = '/images/default-event.png';
        }}
      />
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wide">
              {event.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
          
          <div className="prose max-w-none text-gray-700 mb-8">
            <p className="whitespace-pre-wrap">{event.description}</p>
          </div>
        </div>

        <div className="w-full md:w-80 shrink-0">
          <div className="border border-gray-200 rounded-lg p-6 sticky top-8">
            <h3 className="font-bold text-lg mb-4">Event Details</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Date</div>
                  <div className="text-sm text-gray-600">
                    {new Date(event.datetime).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Time</div>
                  <div className="text-sm text-gray-600">
                    {new Date(event.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-gray-600">{event.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Organizer</div>
                  <div className="text-sm text-gray-600">{event.organizer}</div>
                </div>
              </div>
            </div>

            {event.hasRSVPed ? (
              <button disabled className="w-full bg-green-600 text-white py-3 rounded font-medium cursor-default">
                You are attending!
              </button>
            ) : (
              <button 
                onClick={handleRSVP}
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition font-medium"
              >
                RSVP Now
              </button>
            )}
            
            {rsvpStatus === 'error' && (
              <p className="text-red-500 text-sm mt-2 text-center">Failed to RSVP. Try again.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
