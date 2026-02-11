import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../auth/auth_service.dart';
import 'edit_blog.dart';
import '../profile/profile_page.dart';

class BlogDetailPage extends StatefulWidget {
  final String id;
  final String title;
  final String content;
  final String author;
  final String authorId;
  final String createdAt;
  final bool isOwner;
  final bool isLiked;
  final int likesCount;

  const BlogDetailPage({
    super.key,
    required this.id,
    required this.title,
    required this.content,
    required this.author,
    required this.authorId,
    required this.createdAt,
    required this.isOwner,
    required this.isLiked,
    required this.likesCount,
  });

  @override
  State<BlogDetailPage> createState() => _BlogDetailPageState();
}

class _BlogDetailPageState extends State<BlogDetailPage> {
  // ❤️ LIKE
  bool _liked = false;
  int _likesCount = 0;
  bool _liking = false;
  bool _loading = true;

  // 💬 COMMENTS
  final TextEditingController _commentController = TextEditingController();
  List<Map<String, dynamic>> _comments = [];
  String? _userId;
  bool _commentLoading = false;

  @override
  void initState() {
    super.initState();
    _initUser();
    _fetchBlog();
  }

  Future<void> _initUser() async {
    _userId = await AuthService.getUserId();
  }

  Future<void> _fetchBlog() async {
    try {
      final data = await ApiService.fetchBlogById(widget.id);
      setState(() {
        _liked = data["isLiked"] ?? false;
        _likesCount = data["likesCount"] ?? 0;
        _comments = List<Map<String, dynamic>>.from(data["comments"] ?? []);
        _loading = false;
      });
    } catch (_) {
      setState(() => _loading = false);
    }
  }

  // ================= CONFIRM DELETE DIALOG =================
  Future<bool?> _confirmDelete({
    required String title,
    required String content,
  }) {
    return showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: Text(title),
        content: Text(content),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
            ),
            onPressed: () => Navigator.pop(context, true),
            child: const Text("Delete"),
          ),
        ],
      ),
    );
  }

  // ❤️ LIKE
  Future<void> _toggleLike() async {
    if (_liking) return;
    setState(() => _liking = true);

    try {
      final res = await ApiService.toggleLike(widget.id);
      setState(() {
        _liked = res["isLiked"];
        _likesCount = res["likesCount"];
      });
    } finally {
      setState(() => _liking = false);
    }
  }

  // 💬 ADD COMMENT
  Future<void> _addComment() async {
    if (_commentController.text.trim().isEmpty) return;

    setState(() => _commentLoading = true);

    try {
      final response =
          await ApiService.addComment(widget.id, _commentController.text.trim());
      setState(() {
        _comments = List<Map<String, dynamic>>.from(response);
        _commentController.clear();
      });
    } finally {
      setState(() => _commentLoading = false);
    }
  }

  // 🗑 DELETE COMMENT (WITH CONFIRMATION)
  Future<void> _deleteComment(String commentId) async {
    final confirmed = await _confirmDelete(
      title: "Delete Comment",
      content: "Are you sure you want to delete this comment?",
    );

    if (confirmed != true) return;

    await ApiService.deleteComment(widget.id, commentId);
    setState(() {
      _comments.removeWhere((c) => c["_id"] == commentId);
    });
  }

  // 🗑 DELETE BLOG (WITH CONFIRMATION)
  Future<void> _deleteBlog() async {
    final confirmed = await _confirmDelete(
      title: "Delete Blog",
      content: "Are you sure you want to delete this blog?",
    );

    if (confirmed != true) return;

    final success = await ApiService.deleteBlog(widget.id);
    if (success && mounted) {
      Navigator.pop(context, true);
    }
  }

  // ================= UI =================
  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text("Blog Details"),
        actions: [
          IconButton(
            icon: Icon(
              _liked ? Icons.favorite : Icons.favorite_border,
              color: Colors.red,
            ),
            onPressed: _toggleLike,
          ),
          Padding(
            padding: const EdgeInsets.only(right: 8),
            child: Center(
              child: Text(
                _likesCount.toString(),
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.comment),
            onPressed: _openCommentsSheet,
          ),
          if (widget.isOwner)
            IconButton(
              icon: const Icon(Icons.edit),
              onPressed: () async {
                final updated = await Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => EditBlogScreen(
                      id: widget.id,
                      title: widget.title,
                      content: widget.content,
                    ),
                  ),
                );
                if (updated == true && mounted) {
                  _fetchBlog();
                }
              },
            ),
          if (widget.isOwner)
            IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              onPressed: _deleteBlog,
            ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.title,
              style:
                  const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),

            // 👤 AUTHOR (CLICKABLE)
            Row(
              children: [
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) =>
                            ProfilePage(userId: widget.authorId),
                      ),
                    );
                  },
                  child: Text(
                    widget.author,
                    style: const TextStyle(
                      color: Colors.blue,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const Text(" • "),
                Text(widget.createdAt),
              ],
            ),

            const Divider(height: 24),
            Expanded(
              child: SingleChildScrollView(
                child: Text(
                  widget.content,
                  style: const TextStyle(fontSize: 16, height: 1.5),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // 💬 COMMENTS BOTTOM SHEET
  void _openCommentsSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (_) => Padding(
        padding: EdgeInsets.only(
          left: 16,
          right: 16,
          top: 16,
          bottom: MediaQuery.of(context).viewInsets.bottom + 16,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _commentController,
                    decoration:
                        const InputDecoration(hintText: "Write a comment..."),
                  ),
                ),
                IconButton(
                  icon: _commentLoading
                      ? const CircularProgressIndicator()
                      : const Icon(Icons.send),
                  onPressed: _addComment,
                ),
              ],
            ),
            const SizedBox(height: 12),
            Expanded(
              child: ListView.builder(
                itemCount: _comments.length,
                itemBuilder: (_, i) {
                  final c = _comments[i];
                  final isMine = c["user"] == _userId;

                  return ListTile(
                    title: Text(c["text"]),
                    trailing: isMine
                        ? IconButton(
                            icon: const Icon(Icons.delete,
                                color: Colors.red),
                            onPressed: () => _deleteComment(c["_id"]),
                          )
                        : null,
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
