import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new Database('database.db');

async function seed() {
  console.log('Seeding database...');

  // 1. Create a default user if not exists
  const passwordHash = await bcrypt.hash('password123', 10);
  let user = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');

  if (!user) {
    console.log('Creating admin user...');
    const info = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)')
      .run('admin', 'admin@iiitdmk.ac.in', passwordHash);
    user = { id: info.lastInsertRowid };
  } else {
    console.log('Admin user already exists.');
  }

  // 2. Define events based on the images
  const events = [
    {
      title: "BBU'26 Aftermovie Screening",
      description: "Join us for the premiere of the BBU'26 Aftermovie! Relive the electrifying moments, the music, and the memories of IIITDM Kurnool's grandest fest. Don't miss this cinematic journey down memory lane.",
      datetime: "2026-03-15T19:00",
      location: "IIITDM Kurnool Auditorium",
      category: "Arts",
      image_url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000" // Concert/Event vibe
    },
    {
      title: "IIITDM Kurnool Recruitment 2026",
      description: "Official Recruitment Drive 2026. Applications are open for Teaching and Non-Teaching posts. Total Vacancies: 26. Eligibility criteria, pay scale, and important dates are available on the website. Application period: 3rd Jan 2026 to 24th Jan 2026.",
      datetime: "2026-01-03T09:00",
      location: "Online / IIITDM Kurnool",
      category: "Other",
      image_url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1000" // Handshake/Business vibe
    },
    {
      title: "Institute Overview & Admissions",
      description: "Discover IIITDM Kurnool. Established in 2014 and funded by the Ministry of Education. Offering B.Tech, M.Tech, and PhD programs. JEE Mains accepted. Average Placement CTC: 8.2 LPA. Top recruiters: Zycus, Moschip, DeltaX, Google.",
      datetime: "2026-04-10T10:00",
      location: "Seminar Hall, IIITDM Kurnool",
      category: "Education",
      image_url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000" // College/Campus vibe
    }
  ];

  // 3. Insert events
  const insertStmt = db.prepare(`
    INSERT INTO events (title, description, datetime, location, category, image_url, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const event of events) {
    // Check if event already exists to avoid duplicates
    const existing = db.prepare('SELECT * FROM events WHERE title = ?').get(event.title);
    if (!existing) {
      insertStmt.run(
        event.title,
        event.description,
        event.datetime,
        event.location,
        event.category,
        event.image_url,
        user.id
      );
      console.log(`Added event: ${event.title}`);
    } else {
      console.log(`Event already exists: ${event.title}`);
    }
  }

  console.log('Seeding completed.');
}

seed().catch(console.error);
