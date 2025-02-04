"use client";
import { fetchProducts } from "@/features/products/productSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListing from "@/components/product-master/ProductListing";
import Navbar from "@/components/Navbar";
import styles from "../page.module.css";

const submodulePage = () => {
    let params = useParams();
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [currentModule, setCurrentModule] = useState("");

    console.log("params = ", params);
    params = Object.values(params);
    console.log("new params = ", params);
    params = params[0].split("-");
    let [submodule, module] = params;

    useEffect(() => {
        if (token && module === "master" && submodule === "products") {
            dispatch(fetchProducts(token));
            setCurrentModule("ProductListing");
        }
    }, [token, dispatch]);

    return (
        <div className={styles.mainDiv}>
            <Navbar />
            {currentModule === "ProductListing" ? (
                <ProductListing />
            ) : (
                <h1>Anything</h1>
            )}
        </div>
    );
};
export default submodulePage;
