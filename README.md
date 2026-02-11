🚀 Full-Stack Blog Publishing Platform
🌐 One Backend → Web + Mobile Integration

A cross-platform Blog Publishing System powered by a single Node.js REST API, seamlessly integrated with:

• 🌐 React Web Application
• 📱 Flutter Mobile Application

Both clients:
• Consume the same REST API
• Share the same MongoDB database
• Use the same JWT authentication system

🎥 Demo Videos

• ✅ Web Application Demo
https://youtu.be/w4G6GaVYqhU

• ✅ Flutter Mobile Application Demo
https://youtu.be/wQin3YQP5Do

🧠 AI in Blog Content Creation

The platform supports both traditional writing and AI-enhanced workflows.

✍ Manual Blog Writing

Users can:

• Create blog posts manually
• Add title, content, and tags
• Edit their own posts
• Delete their own posts
• Maintain full creative control

Benefits of Manual Writing

• Authenticity
• Personal voice
• Original thinking

🤖 AI-Assisted Blog Writing (Experimental Integration)

AI was integrated responsibly as a productivity assistant.

AI helps with:

• Generating blog ideas
• Creating structured outlines
• Suggesting introduction paragraphs
• Improving grammar & clarity
• Expanding short drafts
• Enhancing SEO-friendly wording

Why AI Integration?

• Demonstrates modern blogging workflow
• Improves productivity
• Assists content creators
• Acts as an assistant — not a replacement

🧪 API Testing & Development
🔹 Thunder Client (VS Code Extension)

Used for:

• Testing all REST API endpoints
• Validating request/response structures
• Testing JWT authentication flow
• Verifying protected routes
• Testing CRUD operations
• Debugging authorization headers
• Simulating frontend & mobile API calls

🏗 Architecture Overview

The system follows a clean modular architecture with separation between:

• Backend (API Layer)
• Web Frontend
• Mobile Application

🔹 Backend Architecture

• Node.js + Express REST API
• Centralized JWT Authentication
• Shared MongoDB database
• Role-based & ownership-based access control
• Modular controllers & routes
• Middleware-based protection

🗄 Database

• MongoDB
• Shared across Web & Mobile
• User & Blog relationships
• Secure ownership validation

🛠 Tech Stack
🔹 Backend

• Node.js
• Express.js
• JWT Authentication
• MongoDB
• REST API Architecture

🔹 Web Frontend

• React
• Redux Toolkit
• React Router
• SCSS Styling
• Responsive Design

🔹 Mobile Application

• Flutter
• GetX (State Management)
• REST API Integration

🔐 Core Features
Authentication

• User Signup
• User Login
• JWT-based session handling
• Protected routes
• Token validation on backend
• Same login works across Web & Mobile

📝 Blog CRUD

• Create blog post
• View all blog posts (Home Feed)
• View single blog detail
• Edit own posts only
• Delete own posts only
• Backend validates ownership

👤 Author Profile

• View user profile
• Display user bio
• List user’s blog posts
• Accessible on Web & Mobile

⭐ Bonus Features

• Like functionality
• Bookmark functionality
• Comment system
• Search by blog title
• Pagination
• SEO-friendly blog structure
• Clean UI improvements
• Responsive layout
• Fully connected Flutter app

⚙️ Setup Instructions
🔧 Backend Setup
cd backend
npm install
npm run dev


Create .env file:

PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_secret_key

🌐 Web Frontend Setup
cd blog-web
npm install
npm run dev

📱 Flutter App Setup
cd blog_publish_app
flutter pub get
flutter run


Update API base URL if required.

🤝 Contributions

Feel free to open an issue or pull request if:

• You found a bug
• You want to improve UI
• You want to enhance backend structure
• You want to add new features

Let’s build scalable cross-platform systems together 🚀
