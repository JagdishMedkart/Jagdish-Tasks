import React from 'react'
import { Auth } from '@/components/Auth'
import styles from "../page.module.css";

export default function page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Auth />
      </main>
    </div>
  )
}