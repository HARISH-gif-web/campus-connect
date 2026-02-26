import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent({ user }: { user: any }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    datetime: '',
    location: '',
    category: 'Tech',
    image_url: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create an event.');
      return;
    }

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate('/');
      } else {
        setError('Failed to create event.');
      }
    } catch (err) {
      setError('An error occurred.');
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-12">
        <p className="text-xl mb-4">Please login to create an event.</p>
        <button onClick={() => navigate('/login')} className="bg-black text-white px-6 py-2 rounded">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
      
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description (Max 500 chars)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none"
            required
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.description.length}/500
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Date and Time</label>
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none bg-white"
            >
              <option value="Tech">Tech</option>
              <option value="Arts">Arts</option>
              <option value="Sports">Sports</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover Image URL (Optional)</label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
