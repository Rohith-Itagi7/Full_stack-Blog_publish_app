import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://10.0.2.2:5000/api";

  static Future<void> testConnection() async {
    final url = Uri.parse("$baseUrl/blogs");
    final response = await http.get(url);

    print("STATUS CODE: ${response.statusCode}");
    print("BODY: ${response.body}");
  }
}
