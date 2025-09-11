"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AnalysisPage() {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("aiFeedback");
    if (stored) {
      setFeedback(stored);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const q = params.get("feedback");
    if (q) {
      try {
        setFeedback(decodeURIComponent(q));
      } catch {
        setFeedback(q);
      }
    }
  }, []);

  // helper: check if a line is a heading
  const isHeading = (line) => {
    const headings = [
      "Score:",
      "Improvements:",
      "Portfolio Project Suggestions:",
      "Emphasis on Front-end Technologies:",
      "Speak to Scalability and Performance:",
      "Methods:",
    ];
    return headings.some((h) => line.startsWith(h));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>AI Resume Analysis</h1>

      {feedback ? (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: 8,
            maxHeight: 500,
            overflowY: "auto",
            background: "#fafafa",
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
          }}
        >
          {feedback.split("\n").map((line, i) => {
            if (!line.trim()) return null;

            if (isHeading(line)) {
              return (
                <h3
                  key={i}
                  style={{
                    fontSize:"1rem",
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    color: "#0b8f1fff", // 🔵 nice blue
                  }}
                >
                  {line}
                </h3>
              );
            }

            return (
              <p key={i} style={{ margin: "0.3rem 0", paddingLeft: "1rem" }}>
                {line}
              </p>
            );
          })}
        </div>
      ) : (
        <p>No analysis found. Please upload your resume first.</p>
      )}

      <div style={{ marginTop: 16 }}>
        <Link href="/upload" style={{ color: "#08875d" }}>
          ⬅ Back to Upload
        </Link>
      </div>
    </div>
  );
}
