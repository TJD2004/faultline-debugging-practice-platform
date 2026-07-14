# Faultline

Faultline is a full-stack bug-fixing coding platform where users solve programming challenges, earn XP, compete on leaderboards, and track progress.

## Tech Stack

- Frontend: React (Vite), React Router, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas (Mongoose)
- Authentication:
  - JWT Authentication
  - bcrypt Password Hashing
  - Google OAuth

---

# Project Structure

```
faultline/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── data/
│   │   │   ├── challenges.js
│   │   │   ├── achievements.js
│   │   │   ├── contests.js
│   │   │   ├── dailyChallenges.js
│   │   │   └── projects.js
│   │   └── app.js
│   ├── seed.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── layouts/
    │   ├── pages/
    │   ├── routes/
    │   ├── styles/
    │   └── utils/
    └── package.json
```

---

# Features

## Authentication

- Email & Password Login
- JWT Authentication
- Google OAuth Login
- Protected Routes

## Practice Challenges

- Bug fixing challenges
- Multiple difficulty levels
- Language filtering
- Server-side validation
- Solution reveal
- Next challenge navigation

## Daily Challenge

- Auto scheduled daily challenges
- Bonus XP & Coins
- Automatically moves to Practice after expiry

## Contests

- Weekly contests
- Separate contest leaderboard
- Countdown timer
- Previous contest history

## Leaderboards

- Global XP leaderboard
- Contest leaderboard

## Achievements

- XP milestones
- Solve milestones
- Language milestones
- Streak achievements
- Coins achievements

## Project Mode

- Multi-file debugging projects
- Cross-file validation
- Server-side checking

## Profile

- XP
- Coins
- Streak
- Solved challenges
- Language statistics
- Recent submissions
- Achievement progress

## Bookmarks

- Save favourite challenges
- Dedicated bookmarks page

## Settings

- Light/Dark/System theme
- Editor font customization
- Auto-save drafts
- Reduce animations

---

# Database Setup

Create a MongoDB Atlas cluster.

Copy your connection string into:

```
backend/.env
```

Example:

```
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

---

# Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

# Google OAuth

Create OAuth credentials in Google Cloud Console.

Authorized Redirect URI:

```
http://localhost:5000/api/auth/google/callback
```

Add the credentials to `backend/.env`.

---

# API Overview

| Method | Endpoint | Auth |
|---------|----------|------|
| POST | /api/auth/signup | ❌ |
| POST | /api/auth/login | ❌ |
| GET | /api/auth/google | ❌ |
| GET | /api/auth/me | ✅ |
| GET | /api/challenges | ❌ |
| GET | /api/challenges/:slug | ❌ |
| POST | /api/challenges/:slug/run | ✅ |
| POST | /api/challenges/:slug/submit | ✅ |
| GET | /api/challenges/:slug/solution | ✅ |
| GET | /api/submissions | ✅ |
| GET | /api/leaderboard | ❌ |

---

# Seed Data

Running

```bash
npm run seed
```

loads:

- Challenges
- Daily Challenges
- Contests
- Achievements
- Projects

---

# Adding New Challenges

Add a new challenge inside:

```
backend/src/data/challenges.js
```

Then run:

```bash
npm run seed
```

No backend code changes are required.

---

# Notes

- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- MongoDB is managed with Mongoose.
- Challenge validation is performed entirely on the server.


---

# Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

Please follow the existing project structure and coding style.

---

# License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

# Author

Developed by **Your Name**.

GitHub: https://github.com/your-username

---

# Acknowledgements

Built with:

- React
- Vite
- Express.js
- MongoDB
- Mongoose
- Tailwind CSS
- React Router
- JWT
- bcrypt
- Google OAuth