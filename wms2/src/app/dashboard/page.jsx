import React from 'react'
import { Dashboard } from '@/components/Dashboard'
import styles from "../page.module.css";
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

export default function page() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Navbar />
                <Header />
                <Dashboard />
            </main>
        </div>
    )
}