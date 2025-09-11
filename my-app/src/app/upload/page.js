// app/upload/page.js  (client component)
"use client";
import React, { useState } from "react";
import styles from "./UploadPage.module.css";
import Image from "next/image";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF resume first.");

    setLoading(true);
    const fd = new FormData();
    fd.append("resume", file);
    fd.append("jobDescription", description);

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server error ${res.status}: ${txt}`);
      }

      const data = await res.json();
      console.log("Backend response (raw):", data);

      // pick the feedback regardless of whether backend returns feedback or analysis.feedback
      const feedback = data.feedback || data.analysis?.feedback || "";

      // store full feedback in sessionStorage (safe for medium-sized text)
      sessionStorage.setItem("aiFeedback", feedback);

      // redirect to analysis page without putting large text into URL
      window.location.href = "/analysis";
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.heroDiv}>
      <div className={styles.main}>
        <h1>Is your resume good enough?</h1>
        <h4>
          A free and fast AI resume checker doing 16 crucial checks to ensure
          your resume is ready to perform and get you interview callbacks.
        </h4>

        <div className={styles.formDiv}>
          <p>
            Drop your resume here or choose a file. <br />
            <small>PDF & DOCX only. Max 2MB file size.</small>
          </p>

          <form className={styles.form} onSubmit={handleUpload}>
            <input
              className={styles.input}
              type="file"
              accept=".pdf,.docx"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            <textarea
              placeholder="Paste job description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
            <p>
              <em>Privacy guaranteed</em>
            </p>
          </form>
        </div>
      </div>

      <div className={styles.side}>
        <Image
          src="/resume2.jpg"
          alt="Resume check illustration"
          width={450}
          height={450}
          className={styles.heroImage}
        />
      </div>
    </div>
  );
}
