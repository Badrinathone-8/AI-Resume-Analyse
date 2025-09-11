









// // backend/controllers/aiController.js
// import dotenv from "dotenv";
// dotenv.config(); // ensure env is loaded in this module

// import fs from "fs";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const pdfParse = require("pdf-parse"); // safe import to avoid pdf-parse test-file bug

// import Groq from "groq-sdk";

// if (!process.env.GROQ_API_KEY) {
//   console.warn("⚠️ GROQ_API_KEY is not set. Set it in backend/.env");
// }

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // This function reads filePath, extracts text and asks Groq to analyze
// export async function analyzeResumeFromFile(filePath) {
//   try {
//     // 1) extract text
//     const dataBuffer = fs.readFileSync(filePath);
//     const pdfData = await pdfParse(dataBuffer);
//     const text = (pdfData && pdfData.text) ? pdfData.text : "";

//     // 2) build prompt that forces JSON only
//     const prompt = `
// You are an expert recruiter and resume reviewer.
// Analyze the resume text below and return ONLY a JSON object (do not include any extra text).
// The JSON must be exactly in this shape:
// {
//   "summary": "short candidate summary",
//   "strengths": ["..."],
//   "weaknesses": ["..."],
//   "skillsMatch": ["..."],
//   "suggestions": ["..."]
// }

// Resume text:
// ${text}
//     `;

//     console.log("Sending prompt to Groq (chars):", prompt.length);

//     // 3) call Groq; ask for json_object response_format (safer)
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [
//         { role: "system", content: "You are a professional resume analyzer." },
//         { role: "user", content: prompt },
//       ],
//       response_format: { type: "json_object" }, // ask Groq for structured JSON
//     });

//     // 4) read returned content
//     const aiContent = completion?.choices?.[0]?.message?.content;
//     console.log("Raw AI content type:", typeof aiContent);

//     // aiContent might already be an object (if sdk parsed), or a string.
//     let parsed;
//     if (typeof aiContent === "object") {
//       parsed = aiContent;
//     } else {
//       // string -> clean and parse safely
//       const cleaned = String(aiContent || "")
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();

//       try {
//         parsed = JSON.parse(cleaned);
//       } catch (e) {
//         console.warn("AI returned non-JSON, falling back. Raw:", cleaned.slice(0, 300));
//         parsed = {
//           summary: cleaned.slice(0, 800),
//           strengths: [],
//           weaknesses: [],
//           skillsMatch: [],
//           suggestions: [],
//         };
//       }
//     }

//     // Attach the extracted text for saving if needed
//     return { _extractedText: text, result: parsed };
//   } catch (err) {
//     console.error("AI analysis error:", err);
//     return { _extractedText: "", result: { summary: "Error analyzing resume", strengths: [], weaknesses: [], skillsMatch: [], suggestions: [] }};
//   }
// }
