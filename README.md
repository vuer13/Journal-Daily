# The Journal App - MERN

This project allows users to create journal entries daily to write, upload and manager their thoughts and feelings. Features include user authentication, PDF uploads and protected routes. 

## Features
- User registration and login with JWT-based authentication
- Protected routes for logged-in users
- CRUD operations for journal entries
- Upload PDF files along side text entries
- Auto-generated titles and summaries based on the journal entry using Groq

This project utilized React.js, Node.js, Express.js, MongoDB, Groq, and JWT.

## Setup
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/journal-app.git
cd journal-app
npm install
```
Create a .env file for the following:
```bash
PORT=4000 # for the backend
MONG_URI=your_mongo_uri
SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```
Start Development:
- Backend
```bash
cd backend
npm run dev
```
- Frontend
```bash
npm start
```

## Next Steps
To deploy the application, creating analytics for journal habits, and cloud storage for PDF files