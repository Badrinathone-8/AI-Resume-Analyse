// backend/models/resumeModel.js
import mongoose from "mongoose";

// const AnalysisSchema = new mongoose.Schema({
//   score: Number,
//   strengths: [String],
//   weaknesses: [String],
//   suggestions: [String],
//   matchedKeywords: [String],
//   missingKeywords: [String],
// });

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  resumeName:{
    type:String,
    required:true
  },
  fileUrl:{
    type:String,
  },
  jobDescription:{
    type:String,
    required:true,
  },
  score:{
    type:String,
  },
  feedback:{
    type:String,
  }
},{timestamps:true});
const Resume=mongoose.model("Resume",ResumeSchema);

export default Resume;
