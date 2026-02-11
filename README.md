🚀 Full-Stack Blog Publishing Platform
🌐 One Backend → Web + Mobile Integration

A cross-platform Blog Publishing System powered by a single Node.js REST API, seamlessly integrated with:

• 🌐 React Web Application \n
• 📱 Flutter Mobile Application

Both clients:
• Consume the same REST API
• Share the same MongoDB database
• Use the same JWT authentication system

🎥 Live Demo Videos Included
• Web App Demo
• Flutter Mobile App Demo

🧠 AI in Blog Content Creation
✍ Manual vs 🤖 AI-Assisted Blogging

The platform supports both traditional writing and AI-enhanced workflows.

✍ Manual Blog Writing

Users can:

• Create blog posts manually
• Add title, content, and tags
• Edit their own posts
• Delete their own posts
• Maintain full creative control

Benefits of Manual Writing:
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

Purpose of AI Integration:
• Enhance productivity
• Support content workflows
• Demonstrate modern AI-powered blogging systems
• Use AI as an assistant — not a replacement

🧪 API Testing & Development
🔹 Thunder Client (VS Code Extension)

Used during backend development for:

• Testing all REST API endpoints
• Validating request & response structures
• Testing JWT authentication flow
• Verifying protected routes
• Testing CRUD operations
• Debugging headers & authorization tokens
• Simulating Web & Mobile API calls

This streamlined backend development directly inside VS Code.

🏗 Architecture Overview
🔹 Single Backend Architecture

• Node.js + Express REST API
• Centralized JWT Authentication
• Shared MongoDB database
• Role-based & ownership-based access control
• Modular controllers & route structure
• Clean separation of Web, Mobile & Backend

🗄 Database

• MongoDB
• Shared data across Web & Mobile
• User & Blog relational handling
• Secure ownership validation

🛠 Tech Stack
🔹 Backend

• Node.js
• Express.js
• JWT Authentication
• MongoDB
• Middleware-based route protection
• RESTful API architecture

🔹 Web Frontend

• React
• Redux Toolkit (State Management)
• React Router
• SCSS Styling
• Responsive Design

🔹 Mobile Application

• Flutter
• GetX (State Management)
• REST API Integration

🔐 Core Features (Web + Mobile Shared)
Authentication

• User Signup
• User Login
• JWT-based session handling
• Protected routes
• Backend token validation
• Same login works across Web & Mobile

📝 Blog Management (CRUD)

• Create blog post (Title, Content, Tags)
• View all blogs (Home Feed)
• View single blog details
• Edit own posts only
• Delete own posts only
• Backend validates ownership before update/delete

👤 Author Profile

• View user profile
• Display bio & personal information
• List of user’s own blog posts
• Accessible from Web & Mobile

⭐ Bonus Features Implemented

• SEO-friendly blog structure
• Like functionality
• Bookmark functionality
• Comment system
• Search blogs by title
• Pagination
• Clean UI enhancements
• Fully responsive design
• Flutter app fully connected to backend

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


Ensure backend is running on correct port.

📱 Flutter App Setup
cd blog_publish_app
flutter pub get
flutter run


Update API base URL inside Flutter project if needed.
**🎥 Demo Videos**

✅ Working Web Application video included - https://youtu.be/w4G6GaVYqhU?si=6_AnwVUP0l062AtJ

✅ Working Flutter Mobile Application video included - https://youtu.be/wQin3YQP5Do?si=usi0e-bm7vxSXov2


