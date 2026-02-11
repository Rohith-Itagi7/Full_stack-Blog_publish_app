import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_service.dart';

class ProfilePage extends StatefulWidget {
  final String userId;

  const ProfilePage({super.key, required this.userId});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  Map profile = {};
  bool loading = true;
  bool isOwner = false;

  final _nameCtrl = TextEditingController();
  final _bioCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    loadProfile();
  }

  Future<void> loadProfile() async {
    final prefs = await SharedPreferences.getInstance();
    final currentUserId = prefs.getString("userId");

    final data = await ApiService.fetchProfile(widget.userId);

    setState(() {
      profile = data;
      isOwner = widget.userId == currentUserId;
      _nameCtrl.text = data["name"] ?? "";
      _bioCtrl.text = data["bio"] ?? "";
      loading = false;
    });
  }

  Future<void> saveProfile() async {
    await ApiService.updateProfile(
      _nameCtrl.text,
      _bioCtrl.text,
      profile["profilePic"] ?? "",
    );

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Profile updated")),
    );

    loadProfile();
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text("Profile")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            CircleAvatar(
              radius: 50,
              backgroundImage: profile["profilePic"] != ""
                  ? NetworkImage(profile["profilePic"])
                  : null,
              child: profile["profilePic"] == ""
                  ? const Icon(Icons.person, size: 50)
                  : null,
            ),
            const SizedBox(height: 12),

            // NAME
            isOwner
                ? TextField(
                    controller: _nameCtrl,
                    decoration: const InputDecoration(labelText: "Name"),
                  )
                : Text(
                    profile["name"] ?? "",
                    style: const TextStyle(
                        fontSize: 22, fontWeight: FontWeight.bold),
                  ),

            const SizedBox(height: 12),

            // BIO
            isOwner
                ? TextField(
                    controller: _bioCtrl,
                    decoration: const InputDecoration(labelText: "Bio"),
                  )
                : Text(profile["bio"] ?? "No bio"),

            const SizedBox(height: 20),

            if (isOwner)
              ElevatedButton.icon(
                icon: const Icon(Icons.save),
                label: const Text("Save"),
                onPressed: saveProfile,
              ),
          ],
        ),
      ),
    );
  }
}
