"use client";
import { fetchProducts } from "@/features/products/productSlice";
import { useParams, useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListing from "@/components/product-master/ProductListing";
import Navbar from "@/components/Navbar";
import styles from "../page.module.css";
import Header from "@/components/Header";
import Image from "next/image";
import { tablePageMeta } from "@/utils/tablePageMeta";
import { allMetaData } from "@/utils/allMetaData";

const MainPage = () => {
    const params = useParams();
    console.log("slug = ", params.slug);

    return (
        <div className={styles.mainDiv}>
            <Navbar />
            <Header />
            {allMetaData[params.slug.join("/")]?.component ? allMetaData[params.slug.join("/")]?.component() : <h2>No such Page</h2>}
        </div>
    );
};
export default MainPage;
