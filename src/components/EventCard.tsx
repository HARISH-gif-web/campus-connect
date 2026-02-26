import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag, User } from 'lucide-react';

export default function EventCard({ event }: { event: any }) {
  return (
    <Link to={`/events/${event.id}`} className="block group">
      <div className="border border-gray-200 hover:border-black transition-colors rounded-lg overflow-hidden h-full flex flex-col">
        <img 
          src={event.image_url || '/images/default-event.png'} 
          alt={event.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/default-event.png';
          }}
        />
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{event.category}</span>
            <span className="text-xs text-gray-400">{new Date(event.datetime).toLocaleDateString()}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:underline">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
          
          <div className="mt-auto flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {event.location}
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {event.organizer}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}


