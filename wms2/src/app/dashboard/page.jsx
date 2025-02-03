import React from 'react'
import { Dashboard } from '@/components/Dashboard'
import styles from "../page.module.css";
import Navbar from '@/components/Navbar';

export default function page() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Navbar />
                <Dashboard />
            </main>
        </div>
    )
}