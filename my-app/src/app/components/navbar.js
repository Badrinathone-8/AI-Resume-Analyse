import React from 'react'
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.Navbar}>
        <nav className={styles.navDiv}>
<Link href="/" className={styles.logo}>
  Enhanser
</Link>
            <div className={styles.uploadsDiv}>
                <h4>Resume</h4>
                <h4>CoverLetter</h4>
                <h4>Blog</h4>
                <h4>pricing</h4>
                <h4>organization</h4>
            </div>
           
            <div className={styles.authDiv}>
                <button>SignUp</button>
                <button>GetStarted</button>
            </div>
        </nav>
    </div>
  )
}
