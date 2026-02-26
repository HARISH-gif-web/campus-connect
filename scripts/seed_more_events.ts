import Database from 'better-sqlite3';

const db = new Database('database.db');

async function seedMore() {
  console.log('Seeding more events...');

  // Get admin user
  let user = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
  if (!user) {
    console.error('Admin user not found. Please run the initial seed script first.');
    return;
  }

  const events = [
    // Sports & Cricket (8 events)
    {
      title: "Inter-IIIT Cricket Tournament 2026",
      description: "The biggest cricket showdown of the year! Watch IIITDM Kurnool take on other IIITs in a T20 format. Cheer for your home team at the main ground.",
      datetime: "2026-03-20T09:00",
      location: "Main Cricket Ground",
      category: "Sports",
      image_url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Gully Cricket Championship",
      description: "A fun, fast-paced tennis ball cricket tournament for all students. Teams of 6. Register now to show off your street cricket skills!",
      datetime: "2026-03-22T16:00",
      location: "Hostel Ground",
      category: "Sports",
      image_url: "https://images.unsplash.com/photo-1593341646782-e0b495cffd32?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Badminton Doubles League",
      description: "Find a partner and smash your way to victory! Men's and Women's doubles categories available. Prizes worth ₹5000.",
      datetime: "2026-03-25T17:00",
      location: "Indoor Sports Complex",
      category: "Sports",
      image_url: "https://images.unsplash.com/photo-1626224583764-847890e05851?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Annual Football Cup",
      description: "The most awaited football tournament of the semester. 7-a-side matches. League stages followed by knockouts.",
      datetime: "2026-04-05T16:30",
      location: "Football Field",
      category: "Sports",
      image_url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Table Tennis Open",
      description: "Open for all students and faculty. Singles and Doubles. Come witness the lightning-fast rallies!",
      datetime: "2026-04-08T18:00",
      location: "Student Activity Center",
      category: "Sports",
      image_url: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Volleyball Varsity Matches",
      description: "Support our college volleyball team as they play a friendly match against local clubs. High energy guaranteed!",
      datetime: "2026-04-12T17:00",
      location: "Volleyball Court",
      category: "Sports",
      image_url: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Chess & Carrom Meetup",
      description: "A relaxed evening of indoor games. Challenge the grandmasters of the campus. Refreshments provided.",
      datetime: "2026-04-15T19:00",
      location: "Common Room",
      category: "Sports",
      image_url: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Morning Yoga Session",
      description: "Start your day with mindfulness and flexibility. Guided yoga session at the open-air theater.",
      datetime: "2026-04-18T06:30",
      location: "Open Air Theater",
      category: "Sports",
      image_url: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=1000"
    },

    // Tech (4 events)
    {
      title: "HackTheFuture 2026",
      description: "24-hour hackathon focused on AI and Blockchain solutions. Great prizes and networking opportunities.",
      datetime: "2026-05-01T10:00",
      location: "Lab Complex 2",
      category: "Tech",
      image_url: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Robotics Workshop",
      description: "Learn to build your first line-follower robot. Hands-on session with Arduino. Kits provided.",
      datetime: "2026-05-05T14:00",
      location: "Robotics Lab",
      category: "Tech",
      image_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Guest Lecture: Future of Quantum Computing",
      description: "Dr. Sharma from IISc discusses the latest breakthroughs in Quantum Computing.",
      datetime: "2026-05-10T11:00",
      location: "Seminar Hall",
      category: "Tech",
      image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Coding Contest: Algorithmic Arena",
      description: "Test your DSA skills in this competitive programming contest. Rated for campus leaderboard.",
      datetime: "2026-05-15T18:00",
      location: "Computer Center",
      category: "Tech",
      image_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1000"
    },

    // Arts & Cultural (3 events)
    {
      title: "Open Mic Night",
      description: "Poetry, stand-up comedy, singing, or storytelling. The stage is yours!",
      datetime: "2026-05-20T19:00",
      location: "Cafeteria Lawn",
      category: "Arts",
      image_url: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Photography Exhibition: Campus Life",
      description: "Showcasing the best clicks from our photography club members. Theme: 'Monochrome'.",
      datetime: "2026-05-22T10:00",
      location: "Library Foyer",
      category: "Arts",
      image_url: "https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Dance Workshop: Hip Hop Basics",
      description: "Learn the fundamentals of Hip Hop dance with our student instructors. No prior experience needed.",
      datetime: "2026-05-25T17:30",
      location: "Student Activity Center",
      category: "Arts",
      image_url: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&q=80&w=1000"
    },

    // Education & Other (2 events)
    {
      title: "Study Abroad Seminar",
      description: "Expert guidance on applying for Masters programs in US, UK, and Germany. GRE/TOEFL tips included.",
      datetime: "2026-06-01T14:00",
      location: "Lecture Hall 1",
      category: "Education",
      image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Campus Cleanup Drive",
      description: "Join the NSS team in making our campus cleaner and greener. Refreshments for all volunteers.",
      datetime: "2026-06-05T08:00",
      location: "Main Gate",
      category: "Other",
      image_url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  const insertStmt = db.prepare(`
    INSERT INTO events (title, description, datetime, location, category, image_url, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const event of events) {
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

seedMore().catch(console.error);
