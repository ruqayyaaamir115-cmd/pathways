import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Example Job Data (Mocked for now, but served via API for "real" behavior)
  const jobs = [
    {
      id: "1",
      title: "Junior Creative Designer",
      company: "Studio Bloom",
      type: "Internship",
      location: "London (Remote Friendly)",
      description: "A 3-month internship for aspiring visual storytellers. We focus on mentorship and real-world projects.",
      tags: ["Design", "Adobe CC", "Social Media"],
      posted: "2 days ago",
    },
    {
      id: "2",
      title: "Entry-Level Frontend Developer",
      company: "TechBridge",
      type: "Junior Role",
      location: "Manchester",
      description: "Join our agile team building sustainable software solutions. Perfect for fresh graduates or bootcamp alum.",
      tags: ["React", "TypeScript", "Tailwind"],
      posted: "5 days ago",
    },
    {
      id: "3",
      title: "Marketing Coordinator (Sustainability)",
      company: "Echo Green",
      type: "Part-time",
      location: "Bristol",
      description: "Help us spread the word about circular economy. Passion for environment is a must.",
      tags: ["Marketing", "Copywriting", "Ethical"],
      posted: "1 hour ago",
    },
    {
      id: "4",
      title: "UX Research Assistant",
      company: "UserFirst Labs",
      type: "Internship",
      location: "London",
      description: "Learn how to conduct user interviews and synthesize data for global products.",
      tags: ["Research", "Psychology", "Figma"],
      posted: "3 days ago",
    },
  ];

  app.get("/api/jobs", (req, res) => {
    // Filter by query if needed
    const { q } = req.query;
    if (q && typeof q === 'string') {
      const filtered = jobs.filter(j => 
        j.title.toLowerCase().includes(q.toLowerCase()) || 
        j.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
      );
      return res.json(filtered);
    }
    res.json(jobs);
  });

  // Gemini Proxy for career advice
  app.post("/api/career-advice", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
      }

      const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemPrompt = `You are an empathetic, soft-spoken career mentor for people aged 16+ starting their career. 
      Provide concise, encouraging, and actionable advice. Keep the tone minimal and supportive. 
      Avoid corporate jargon. Response should be under 150 words.`;

      const result = await model.generateContent([systemPrompt, prompt]);
      const response = await result.response;
      res.json({ advice: response.text() });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate advice" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
