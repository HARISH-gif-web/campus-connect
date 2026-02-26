import Database from 'better-sqlite3';

const db = new Database('database.db');

async function updateEvents() {
  console.log('Updating event images...');

  const updates = [
    {
      title: "Gully Cricket Championship",
      image_url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000" // Cricket
    },
    {
      title: "Badminton Doubles League",
      image_url: "https://images.unsplash.com/photo-1626224583764-847890e05851?auto=format&fit=crop&q=80&w=1000" // Badminton
    },
    {
      title: "Morning Yoga Session",
      image_url: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=1000" // Yoga
    },
    {
      title: "HackTheFuture 2026",
      image_url: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&q=80&w=1000" // Tech/Code
    },
    {
      title: "Open Mic Night",
      image_url: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=1000" // Mic
    },
    {
      title: "Photography Exhibition: Campus Life",
      image_url: "https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80&w=1000" // Camera
    },
    {
      title: "Study Abroad Seminar",
      image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000" // Education/University
    }
  ];

  const stmt = db.prepare('UPDATE events SET image_url = ? WHERE title = ?');

  for (const update of updates) {
    const info = stmt.run(update.image_url, update.title);
    if (info.changes > 0) {
      console.log(`Updated image for: ${update.title}`);
    } else {
      console.log(`Event not found (might need to create): ${update.title}`);
      // If not found, we should probably create it, but the previous step should have created them.
      // Let's double check exact titles from previous step.
      // Previous step titles:
      // "Gully Cricket Championship"
      // "Badminton Doubles League"
      // "Morning Yoga Session"
      // "HackTheFuture 2026"
      // "Open Mic Night"
      // "Photography Exhibition: Campus Life"
      // "Study Abroad Seminar"
      // They match exactly.
    }
  }
}

updateEvents().catch(console.error);
