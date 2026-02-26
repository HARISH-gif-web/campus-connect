import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import db from './database';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Session configuration
app.use(session({
  secret: 'campus-connect-secret-key', // In production, use environment variable
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// API Routes

// Register
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
    const info = stmt.run(username, email, hashedPassword);
    req.session.userId = info.lastInsertRowid as number;
    res.json({ message: 'Registered successfully', userId: info.lastInsertRowid });
  } catch (error: any) {
    res.status(400).json({ error: 'Username or email already exists' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const user: any = stmt.get(email);

  if (user && await bcrypt.compare(password, user.password_hash)) {
    req.session.userId = user.id;
    res.json({ message: 'Logged in successfully', user: { id: user.id, username: user.username, email: user.email } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

// Get Current User
app.get('/api/auth/me', (req, res) => {
  if (req.session.userId) {
    const stmt = db.prepare('SELECT id, username, email FROM users WHERE id = ?');
    const user = stmt.get(req.session.userId);
    res.json({ user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Middleware to check authentication
const requireAuth = (req: any, res: any, next: any) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Authentication required' });
  }
};

// Create Event
app.post('/api/events', requireAuth, (req, res) => {
  const { title, description, datetime, location, category, image_url } = req.body;
  const stmt = db.prepare('INSERT INTO events (title, description, datetime, location, category, image_url, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const info = stmt.run(title, description, datetime, location, category, image_url, req.session.userId);
  res.json({ id: info.lastInsertRowid, message: 'Event created' });
});

// Get Events (with search and filter)
app.get('/api/events', (req, res) => {
  const { search, category } = req.query;
  let query = 'SELECT events.*, users.username as organizer FROM events JOIN users ON events.user_id = users.id WHERE 1=1';
  const params: any[] = [];

  if (search) {
    query += ' AND (title LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }

  query += ' ORDER BY datetime ASC';

  const stmt = db.prepare(query);
  const events = stmt.all(...params);
  res.json(events);
});

// Get Event Detail
app.get('/api/events/:id', (req, res) => {
  const stmt = db.prepare('SELECT events.*, users.username as organizer FROM events JOIN users ON events.user_id = users.id WHERE events.id = ?');
  const event = stmt.get(req.params.id);
  
  if (event) {
    // Check if current user has RSVPed
    let hasRSVPed = false;
    if (req.session.userId) {
      const rsvpStmt = db.prepare('SELECT * FROM rsvps WHERE user_id = ? AND event_id = ?');
      const rsvp = rsvpStmt.get(req.session.userId, req.params.id);
      hasRSVPed = !!rsvp;
    }
    res.json({ ...event, hasRSVPed });
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

// Delete Event
app.delete('/api/events/:id', requireAuth, (req, res) => {
  const stmt = db.prepare('DELETE FROM events WHERE id = ? AND user_id = ?');
  const info = stmt.run(req.params.id, req.session.userId);
  if (info.changes > 0) {
    res.json({ message: 'Event deleted' });
  } else {
    res.status(403).json({ error: 'Not authorized or event not found' });
  }
});

// RSVP
app.post('/api/events/:id/rsvp', requireAuth, (req, res) => {
  try {
    const stmt = db.prepare('INSERT INTO rsvps (user_id, event_id) VALUES (?, ?)');
    stmt.run(req.session.userId, req.params.id);
    res.json({ message: 'RSVP successful' });
  } catch (error) {
    res.status(400).json({ error: 'Already RSVPed' });
  }
});

// My Events
app.get('/api/my-events', requireAuth, (req, res) => {
  const stmt = db.prepare('SELECT * FROM events WHERE user_id = ? ORDER BY datetime ASC');
  const events = stmt.all(req.session.userId);
  res.json(events);
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

// Add types for session
declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}
