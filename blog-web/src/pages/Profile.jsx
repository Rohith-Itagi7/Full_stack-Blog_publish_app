
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../features/auth/authSlice";
import "../styles/Profile.scss";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // wait for backend update to succeed
      await dispatch(updateProfile({ name, bio, profilePic })).unwrap();

      // ✅ go back to home after success
      navigate("/home");
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  return (
    <div className="profile-page">
      <h2>Edit Profile</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Your bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          type="text"
          placeholder="Profile picture URL (optional)"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
