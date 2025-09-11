import multer from "multer";
import path from "path";
import Resume from "../models/resumeModel.js"
// import pdfParse from "pdf-parse";
import fs from "fs";
// const pdfParse =require("pdf-parse");
import { CohereClient } from "cohere-ai";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
const cohere=new CohereClient({
    token:"WMct3fNkKQeC1jyJoBHUGyobnHXq2cmzuHRYcgd0"
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>cb(null,Date.now()+path.extname(file.originalname))
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==="application/pdf") cb(null,true);
    else cb(new Error("only pdf allowes"),false)
}
 export const upload=multer({storage,fileFilter})

export const addResume = async (req, res) => {
  try {
    const { jobDescription, userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    // Read PDF
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);

    // Prompt for Cohere
    const prompt = `You are a resume screening assistant. Compare the following resume text with the provided job description and give a match score (0-100). Also suggest improvements,give me atleast 60-100 lines of result , suggest in what areas user has to improve to match job requirnment.
    Resume: ${pdfData.text}
    Job Description: ${jobDescription}
    Return format:
    Score: ...
    Improvements: ...
    Methods: ...`;

    // Call Cohere
    const response = await cohere.generate({
      model: "command",
      prompt,
      max_tokens: 200,
      temperature: 0.7,
    });

    // Extract text safely
    let result = response.generations?.[0]?.text || response.output_text || "No feedback generated";

    // Save to MongoDB
    const newResume = await Resume.create({
      userId,
      jobDescription,
      resumeName: req.file.originalname,
      feedback: result,
    });

    // ✅ Now send response
    res.status(201).json({
      message: "Resume uploaded successfully",
      feedback: result,
    });

  } catch (err) {
    console.error("Error in addResume:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
