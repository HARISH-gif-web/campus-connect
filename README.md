# Campus Connect

A Community Event Discovery Platform for a hackathon.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, SQLite (better-sqlite3)
- **Language:** TypeScript

> **Note:** The original request asked for Python/Flask. Due to the specific constraints of this execution environment (Node.js container), the application has been implemented using a robust Node.js/Express stack that mirrors the requested functionality and architecture.

## Features

1.  **User Authentication:** Register, Login, Logout (Secure password hashing with bcrypt).
2.  **Event Creation:** Users can create events with details and cover images.
3.  **Public Events Page:** View all upcoming events in a modern card layout.
4.  **Search & Filter:** Dynamic search by name/description and filter by category.
5.  **Event Detail Page:** Full event info, organizer details, and RSVP functionality.
6.  **My Events Dashboard:** Manage and delete your own events.
7.  **Responsive Design:** Modern black and white UI that works on mobile and desktop.

## Setup Instructions

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Application:**
    ```bash
    npm run dev
    ```
    This starts the Express server (which serves the API) and the Vite middleware (which serves the frontend) on port 3000.

3.  **Build for Production:**
    ```bash
    npm run build
    npm start
    ```

## Project Structure

-   `server.ts`: Main application entry point (Express API & Server).
-   `database.ts`: Database connection and schema initialization.
-   `src/`: Frontend source code.
    -   `pages/`: React page components.
    -   `components/`: Reusable UI components.
    -   `App.tsx`: Main router setup.
-   `database.db`: SQLite database file (created automatically).

## API Endpoints

-   `POST /api/auth/register`
-   `POST /api/auth/login`
-   `GET /api/events`
-   `POST /api/events`
-   `GET /api/events/:id`
-   `POST /api/events/:id/rsvp`
