import 'package:flutter/material.dart';
import '../services/api_service.dart';

class CreateBlogScreen extends StatefulWidget {
  const CreateBlogScreen({super.key});

  @override
  State<CreateBlogScreen> createState() => _CreateBlogScreenState();
}

class _CreateBlogScreenState extends State<CreateBlogScreen> {
  final TextEditingController promptController = TextEditingController();
  String aiPreview = "";
  bool loading = false;

  // =====================
  // GENERATE AI PREVIEW
  // =====================
  Future<void> generatePreview() async {
    if (promptController.text.trim().isEmpty) return;

    setState(() => loading = true);

    try {
      final preview =
          await ApiService.generatePreview(promptController.text.trim());

      setState(() {
        aiPreview = preview;
      });
    } catch (_) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("❌ AI Preview failed")),
      );
    } finally {
      setState(() => loading = false);
    }
  }

  // =====================
  // PUBLISH BLOG
  // =====================
  Future<void> publishBlog() async {
    if (aiPreview.isEmpty) return;

    setState(() => loading = true);

    try {
      final success = await ApiService.publishBlog(
        promptController.text.trim(),
        aiPreview,
      );

      if (success) {
        Navigator.pop(context, true); // 👈 return success
      } else {
        throw Exception();
      }
    } catch (_) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("❌ Publish failed")),
      );
    } finally {
      setState(() => loading = false);
    }
  }

  // =====================
  // UI
  // =====================
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Create Blog")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: promptController,
              maxLines: 2,
              decoration: const InputDecoration(
                labelText: "Blog Prompt",
                border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 12),

            ElevatedButton(
              onPressed: loading ? null : generatePreview,
              child: const Text("✨ Generate AI Preview"),
            ),

            if (loading)
              const Padding(
                padding: EdgeInsets.all(12),
                child: CircularProgressIndicator(),
              ),

            if (aiPreview.isNotEmpty)
              Expanded(
                child: SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 12),
                    child: Text(aiPreview),
                  ),
                ),
              ),

            const SizedBox(height: 12),

            ElevatedButton(
              onPressed: loading ? null : publishBlog,
              child: const Text("🚀 Publish Blog"),
            ),
          ],
        ),
      ),
    );
  }
}
