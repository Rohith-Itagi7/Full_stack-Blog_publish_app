import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = "http://10.97.228.4:5000/api";

  // ================= TOKEN =================
  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString("token");
  }

  static Map<String, String> _authHeaders(String token) {
    return {
      "Content-Type": "application/json",
      "Authorization": "Bearer $token",
    };
  }

  // ================= LOGIN =================
  static Future<bool> login(String email, String password) async {
    final response = await http.post(
      Uri.parse("$baseUrl/auth/login"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "email": email,
        "password": password,
      }),
    );

    if (response.statusCode != 200) return false;

    final data = jsonDecode(response.body);
    final prefs = await SharedPreferences.getInstance();

    await prefs.setString("token", data["token"]);
    await prefs.setString("userId", data["user"]["_id"]);

    return true;
  }

  // ================= AI PREVIEW =================
  static Future<String> generatePreview(String prompt) async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final response = await http.post(
      Uri.parse("$baseUrl/ai/preview"),
      headers: _authHeaders(token),
      body: jsonEncode({"prompt": prompt}),
    );

    if (response.statusCode != 200) {
      throw Exception("AI preview failed");
    }

    final data = jsonDecode(response.body);
    return data["preview"] ?? "";
  }

  static Future<String> generateAIPreview(String prompt) async {
    return generatePreview(prompt);
  }

  // ================= CREATE BLOG =================
  static Future<bool> publishBlog(String title, String content) async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final response = await http.post(
      Uri.parse("$baseUrl/blogs"),
      headers: _authHeaders(token),
      body: jsonEncode({
        "title": title,
        "content": content,
      }),
    );

    return response.statusCode == 201;
  }

  // ================= FETCH BLOGS =================
  static Future<List> fetchBlogs() async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final response = await http.get(
      Uri.parse("$baseUrl/blogs"),
      headers: {
        "Authorization": "Bearer $token",
      },
    );

    if (response.statusCode != 200) {
      throw Exception("Failed to fetch blogs");
    }

    final data = jsonDecode(response.body);
    return data["blogs"] ?? [];
  }

  // ================= FETCH SINGLE BLOG (DETAIL PAGE) =================
  static Future<Map<String, dynamic>> fetchBlogById(String blogId) async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final response = await http.get(
      Uri.parse("$baseUrl/blogs/$blogId"),
      headers: _authHeaders(token),
    );

    if (response.statusCode != 200) {
      throw Exception("Failed to fetch blog");
  }

  return jsonDecode(response.body);
}


  // ================= DELETE BLOG =================
  static Future<bool> deleteBlog(String blogId) async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final response = await http.delete(
      Uri.parse("$baseUrl/blogs/$blogId"),
      headers: {
        "Authorization": "Bearer $token",
      },
    );

    return response.statusCode == 200;
  }

  // ================= UPDATE BLOG =================
  static Future<bool> updateBlog(
    String blogId,
    String title,
    String content,
  ) async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final response = await http.put(
      Uri.parse("$baseUrl/blogs/$blogId"),
      headers: _authHeaders(token),
      body: jsonEncode({
        "title": title,
        "content": content,
      }),
    );

    return response.statusCode == 200;
  }

  // ================= ❤️ LIKE / UNLIKE (FIXED) =================
  static Future<Map<String, dynamic>> toggleLike(String blogId) async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final response = await http.put(
      Uri.parse("$baseUrl/blogs/$blogId/like"),
      headers: {
        "Authorization": "Bearer $token",
        "Content-Type": "application/json",
      },
    );

    if (response.statusCode != 200) {
      throw Exception("Failed to like/unlike blog");
    }

    return jsonDecode(response.body);
  }

  // ================= COMMENTS =================
  static Future<List> addComment(String blogId, String text) async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final response = await http.post(
      Uri.parse("$baseUrl/blogs/$blogId/comment"),
      headers: _authHeaders(token),
      body: jsonEncode({"text": text}),
    );

    if (response.statusCode != 200 && response.statusCode != 201) {
      throw Exception("Failed to add comment");
    }

    final data = jsonDecode(response.body);
    return data["comments"] ?? [];
  }

  static Future<bool> deleteComment(
    String blogId,
    String commentId,
  ) async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final response = await http.delete(
      Uri.parse("$baseUrl/blogs/$blogId/comment/$commentId"),
      headers: {
        "Authorization": "Bearer $token",
      },
    );

    return response.statusCode == 200;
  }

  // ================= SEARCH BLOGS =================
  static Future<List<dynamic>> searchBlogs(String query) async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final res = await http.get(
      Uri.parse("$baseUrl/blogs/search?query=$query"),
      headers: {
        "Authorization": "Bearer $token",
      },
    );

    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    } else {
      throw Exception("Search failed");
    }
  }

  // ================= BOOKMARK =================
  static Future<List> toggleBookmark(String blogId) async {
    final token = await getToken();
    if (token == null) throw Exception("No token found");

    final res = await http.put(
      Uri.parse("$baseUrl/blogs/$blogId/bookmark"),
      headers: {
        "Authorization": "Bearer $token",
      },
    );

    if (res.statusCode == 200) {
      return jsonDecode(res.body)["bookmarks"] ?? [];
    } else {
      throw Exception("Bookmark failed");
    }
  }

  static Future<Map<String, dynamic>> getUserProfile(String userId) async {
    final token = await getToken();

    final res = await http.get(
      Uri.parse("$baseUrl/profile/$userId"),
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer $token",
    },
    );

    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    } else {
      throw Exception("Failed to load profile");
    }
  }
  // 👤 GET PROFILE
  static Future<Map<String, dynamic>> fetchProfile(String userId) async {
    final token = await getToken();

    final res = await http.get(
      Uri.parse("$baseUrl/profile/$userId"),
      headers: _authHeaders(token!),
    );

    return json.decode(res.body);
  }

// ✏️ UPDATE PROFILE
  static Future<Map<String, dynamic>> updateProfile(
    String name,
    String bio,
    String profilePic,
  ) async {
    final token = await getToken();

    final res = await http.put(
      Uri.parse("$baseUrl/profile"),
      headers: _authHeaders(token!),
      body: json.encode({
        "name": name,
        "bio": bio,
        "profilePic": profilePic,
      }),
    );

    return json.decode(res.body);
  }
}