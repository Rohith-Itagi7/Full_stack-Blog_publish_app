import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../screens/create_blog_screen.dart' as create;
import '../services/api_service.dart';
import '../blog/blog_detail.dart' as blogDetail;

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List blogs = [];
  bool loading = true;
  String? currentUserId;

  bool isSearching = false;
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    loadUser();
    loadBlogs();
  }

  Future<void> loadUser() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      currentUserId = prefs.getString("userId");
    });
  }

  Future<void> loadBlogs() async {
    if (!mounted) return;
    setState(() => loading = true);

    try {
      final data = await ApiService.fetchBlogs();
      setState(() => blogs = data);
    } finally {
      if (mounted) setState(() => loading = false);
    }
  }

  Future<void> searchBlogs(String query) async {
    if (query.trim().isEmpty) {
      loadBlogs();
      return;
    }

    setState(() => loading = true);
    try {
      final data = await ApiService.searchBlogs(query);
      setState(() => blogs = data);
    } finally {
      setState(() => loading = false);
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    if (!mounted) return;
    Navigator.pushNamedAndRemoveUntil(context, "/login", (_) => false);
  }

  // 🔖 BOOKMARK HANDLER
  Future<void> toggleBookmark(String blogId, int index) async {
    try {
      final updatedBookmarks = await ApiService.toggleBookmark(blogId);

      setState(() {
        blogs[index]["bookmarks"] = updatedBookmarks;
        blogs[index]["isBookmarked"] =
            updatedBookmarks.contains(currentUserId);
      });
    } catch (_) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("❌ Bookmark failed")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(isSearching ? Icons.close : Icons.search),
          onPressed: () {
            setState(() {
              isSearching = !isSearching;
              _searchController.clear();
            });
            if (!isSearching) loadBlogs();
          },
        ),
        title: isSearching
            ? TextField(
                controller: _searchController,
                autofocus: true,
                decoration: const InputDecoration(
                  hintText: "Search blogs...",
                  border: InputBorder.none,
                ),
                onChanged: searchBlogs,
              )
            : const Text("Blog Home"),
        centerTitle: true,
        actions: [
          IconButton(icon: const Icon(Icons.logout), onPressed: logout),
        ],
      ),
      body: Column(
        children: [
          const SizedBox(height: 12),
          const Text(
            "Welcome 🎉",
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          ElevatedButton.icon(
            icon: const Icon(Icons.add),
            label: const Text("Create Blog"),
            onPressed: () async {
              final created = await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => create.CreateBlogScreen(),
                ),
              );
              if (created == true) loadBlogs();
            },
          ),
          const SizedBox(height: 12),
          Expanded(
            child: loading
                ? const Center(child: CircularProgressIndicator())
                : RefreshIndicator(
                    onRefresh: loadBlogs,
                    child: ListView.builder(
                      itemCount: blogs.length,
                      itemBuilder: (context, index) {
                        final blogData = blogs[index];

                        final authorId = blogData["author"]?["_id"];
                        final isOwner = authorId == currentUserId;
                        final bool isBookmarked =
                            blogData["isBookmarked"] == true;

                        return Card(
                          margin: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 8),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16)),
                          child: ListTile(
                            contentPadding: const EdgeInsets.all(16),
                            title: Text(
                              blogData["title"] ?? "",
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            subtitle: Padding(
                              padding: const EdgeInsets.only(top: 6),
                              child: Text(
                                blogData["content"] != null &&
                                        blogData["content"].length > 100
                                    ? "${blogData["content"].substring(0, 100)}..."
                                    : blogData["content"] ?? "",
                              ),
                            ),
                            trailing: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                IconButton(
                                  icon: Icon(
                                    isBookmarked
                                        ? Icons.bookmark
                                        : Icons.bookmark_border,
                                  ),
                                  onPressed: () => toggleBookmark(
                                    blogData["_id"],
                                    index,
                                  ),
                                ),
                                const Icon(Icons.arrow_forward_ios, size: 16),
                              ],
                            ),
                            onTap: () async {
                              await Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) =>
                                      blogDetail.BlogDetailPage(
                                    id: blogData["_id"],
                                    title: blogData["title"] ?? "",
                                    content: blogData["content"] ?? "",
                                    author: blogData["author"]?["name"] ??
                                        "Unknown",
                                    authorId:
                                        blogData["author"]?["_id"] ?? "",
                                    createdAt:
                                        blogData["createdAt"]?.toString() ??
                                            "",
                                    isOwner: isOwner,
                                    isLiked: blogData["isLiked"] ?? false,
                                    likesCount:
                                        blogData["likesCount"] ?? 0,
                                  ),
                                ),
                              );
                            },
                          ),
                        );
                      },
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}
