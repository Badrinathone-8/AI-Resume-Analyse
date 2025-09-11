"use client"; 
import React from "react";
import { useRouter } from "next/navigation";
import "./home.css"; // custom CSS file

export default function Home() {
  const router = useRouter();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="title">AI Resume Checker</h1>
        <p className="subtitle">
          Get instant insights into your resume with the power of AI.  
          Our application analyzes your skills, projects, and keywords to  
          match job requirements and boost your chances of landing your dream job.
        </p>
        <button className="upload-btn" onClick={() => router.push("/upload")}>
          Upload Your Resume
        </button>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="card">
          <h2>Smart Analysis</h2>
          <p>AI scans your resume and highlights key strengths and weaknesses.</p>
        </div>
        <div className="card">
          <h2>Job Match</h2>
          <p>Understand how well your resume aligns with job descriptions.</p>
        </div>
        <div className="card">
          <h2>Actionable Feedback</h2>
          <p>Get suggestions on skills, projects, and improvements to stand out.</p>
        </div>
      </div>

      {/* Developer Section */}
      <div className="developer">
        <h2>About the Developer</h2>
        <p>
          Hi , I’m <span className="highlight">Badrinath</span>, a passionate
          full-stack developer who loves building intelligent and user-friendly
          applications. This project reflects my interest in combining AI with
          real-world solutions to help job seekers.
        </p>
      </div>
    </div>
  );
}
