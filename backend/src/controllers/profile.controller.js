import User from "../models/User.js";

// 👤 GET PROFILE (author or self)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "name profilePic bio"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ UPDATE OWN PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, profilePic } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, profilePic },
      { new: true }
    ).select("name profilePic bio");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
