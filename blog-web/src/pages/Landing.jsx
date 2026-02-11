import { Link, useNavigate } from "react-router-dom";
import "../styles/Landing.scss";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* NAVBAR */}
      <nav className="nav">
        <h2 className="logo">Blogify Ai</h2>
        <div className="nav-links">
          <Link to="/our-story">Our story</Link>
          <button className="signin" onClick={() => navigate("/login")}>
            Sign in
          </button>
          <button className="get-started" onClick={() => navigate("/login")}>
            Get started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Human stories & ideas</h1>
        <p>A place to read, write, and deepen your understanding.</p>
        <button onClick={() => navigate("/login")}>
          Start reading
        </button>
      </section>
    </div>
  );
}
