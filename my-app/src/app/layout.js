import "./globals.css";
import Navbar from "./components/navbar";

export const metadata = {
  title: "AI Resume Checker",
  description: "Check your resume with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {/* Navbar will show on every page */}
        <Navbar />

        {/* Page content */}
        <main >
          {children}
        </main>
      </body>
    </html>
  );
}
