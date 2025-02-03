import React from 'react'
import styles from "../../page.module.css"
import Navbar from '@/components/Navbar';
import { ProductMaster } from '@/components/product-master/ProductMaster';

export default function page() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Navbar />
                <ProductMaster />
            </main>
        </div>
    )
}