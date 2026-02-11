import 'package:flutter/material.dart';
import '../services/api_service.dart';

/// ✅ MATCHES blog_detail.dart EXACTLY
class EditBlogScreen extends StatelessWidget {
  final String id;
  final String title;
  final String content;

  const EditBlogScreen({
    super.key,
    required this.id,
    required this.title,
    required this.content,
  });

  @override
  Widget build(BuildContext context) {
    return EditBlogPage(
      id: id,
      title: title,
      content: content,
    );
  }
}

/// ================= EXISTING PAGE (UNCHANGED) =================

class EditBlogPage extends StatefulWidget {
  final String id;
  final String title;
  final String content;

  const EditBlogPage({
    super.key,
    required this.id,
    required this.title,
    required this.content,
  });

  @override
  State<EditBlogPage> createState() => _EditBlogPageState();
}

class _EditBlogPageState extends State<EditBlogPage> {
  late TextEditingController titleCtrl;
  late TextEditingController contentCtrl;
  bool loading = false;

  @override
  void initState() {
    super.initState();
    titleCtrl = TextEditingController(text: widget.title);
    contentCtrl = TextEditingController(text: widget.content);
  }

  Future<void> updateBlog() async {
    setState(() => loading = true);

    final success = await ApiService.updateBlog(
      widget.id,
      titleCtrl.text.trim(),
      contentCtrl.text.trim(),
    );

    setState(() => loading = false);

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Blog updated successfully")),
      );
      Navigator.pop(context, true);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Update failed")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Edit Blog")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: titleCtrl,
              decoration: const InputDecoration(
                labelText: "Title",
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: TextField(
                controller: contentCtrl,
                maxLines: null,
                expands: true,
                decoration: const InputDecoration(
                  labelText: "Content",
                  border: OutlineInputBorder(),
                ),
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: loading ? null : updateBlog,
                child: loading
                    ? const CircularProgressIndicator()
                    : const Text("Update Blog"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
