import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";
import "../styles/Navbar.scss";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Blogify</h2>

      <div className="nav-actions">
        <Link to="/home" className="icon-btn">
          <FiHome />
        </Link>

        <Link to="/profile" className="icon-btn">
          <FiUser />
        </Link>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </button>
      </div>
    </nav>
  );
}
