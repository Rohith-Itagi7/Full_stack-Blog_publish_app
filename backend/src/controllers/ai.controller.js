import { generateAIContent } from "../services/ai.service.js";

export const aiPreview = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const content = await generateAIContent(prompt);

    res.json({
      success: true,
      preview: content,
    });
  } catch (error) {
    console.error("AI Preview Error:", error.response?.data || error.message);
    res.status(500).json({ message: "AI generation failed" });
  }
};
