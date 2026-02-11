Full-Stack Blog Publishing Platform
🌐 One Backend → Web + Mobile Integration

This project is a cross-platform blog publishing system powered by a single Node.js backend API, integrated seamlessly with:

🌐 React Web Application

📱 Flutter Mobile Application

Both clients consume the same REST API and share the same database and authentication system.

🎥 Working demo videos of both Web App and Flutter Mobile App are included in this repository.

AI in Blog Content Creation (Manual vs AI-generated)

The platform supports manual blog writing, but AI was also explored as a creative enhancement tool.

✍ Manual Blog Posts

Users can:

Write blog posts manually

Add title, content, and tags

Edit and delete their own content

Maintain full creative control

Manual writing ensures:

Authenticity

Personal voice

Original thinking

🤖 AI-Assisted Blog Posts (Experimental Use)

AI was leveraged to:

Generate blog ideas

Suggest structured outlines

Improve grammar and clarity

Provide topic expansion suggestions

Example AI-assisted features:

Suggesting introduction paragraphs

Improving SEO-friendly wording

Expanding short blog drafts

This demonstrates:

Practical integration of AI into content workflows

How modern blogging platforms can enhance productivity

Responsible use of AI as an assistant rather than a replacement

 **API Testing & Development Tools**
🔹 Thunder Client (VS Code Extension)

During backend development, I used Thunder Client (VS Code REST Client extension) for:

Testing all REST API endpoints

Validating request/response structures

Testing JWT authentication flow

Verifying protected routes

Testing CRUD operations (Create, Read, Update, Delete)

Debugging request headers and authorization tokens

Simulating frontend & mobile API calls

Thunder Client helped streamline backend debugging directly inside VS Code without needing external tools.

**Architecture Overview**
🔹 Single Backend Architecture

Node.js + Express REST API

Centralized authentication (JWT-based)

Shared database for both Web & Mobile

Role-based and ownership-based access control

Modular controller and route structure

Database (MongoDB) 

The system follows a modular architecture with proper separation between frontend, backend, and mobile client.

**Tech Stack**
1)Backend

Node.js

Express.js

JWT Authentication

MongoDB

Middleware for route protection

REST API architecture

2)Web Frontend**

React

Redux Toolkit (State Management)

SCSS Styling

React Router

3)Mobile Application

Flutter

GetX (State Management)

REST API integration


**Core Features (Shared Across Web + Mobile)**
🔐 Authentication

User Signup

User Login

JWT-based session handling

Protected routes

Token validation on backend

Same login works on both Web & Mobile

📝 Blog CRUD

Create blog post (title, content, tags, )

View all blog posts (Home feed)

View single blog detail

Edit own posts only

Delete own posts only

Backend validates ownership before update/delete

👤 Author Profile

User profile page

Display user bio and information

List of user's own blog posts

Profile accessible from both Web & Mobile

⭐ Bonus Features Implemented

✔ SEO-friendly blog detail structure
✔ Like functionality
✔ Bookmark functionality
✔ Comment system
✔ Search blogs by title
✔ Pagination
✔ Clean UI improvements
✔ Responsive design
✔ Mobile app fully connected to backend

**⚙️ Setup Instructions**
🔧 Backend Setup
cd backend
npm install
npm run dev


Create a .env file:

PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
GROQ_API_KEY=ypur_secret_key

🌐 Web Frontend Setup
cd blog-web
npm install
npm run dev


Make sure backend is running on the correct port.

📱 Flutter App Setup
cd blog_publish_app
flutter pub get
flutter run


Update API base URL inside the Flutter project if needed.
**🎥 Demo Videos**

✅ Working Web Application video included - https://youtu.be/w4G6GaVYqhU?si=6_AnwVUP0l062AtJ

✅ Working Flutter Mobile Application video included - https://youtu.be/wQin3YQP5Do?si=usi0e-bm7vxSXov2
