"use client";
import { fetchProducts } from "@/features/products/productSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListing from "@/components/product-master/ProductListing";
import Navbar from "@/components/Navbar";
import styles from "../page.module.css";
import Header from "@/components/Header";
import Image from "next/image";

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
            <Header />
            <div className={styles.belowHeader}>
                <Image
                    alt="home"
                    src="/home.png"
                    width={20}
                    height={20}
                    onClick={() => {
                        router.push("/dashboard");
                    }}
                />
                <Image
                    alt="arrow"
                    src="/arrow.png"
                    width={8}
                    height={10}
                    className={styles.arrow}
                />
                <span className={styles.textSpan}>
                    {String(submodule).charAt(0).toUpperCase() + submodule.slice(1)}
                    {" "}
                    {String(module).charAt(0).toUpperCase() + module.slice(1)}
                </span>
            </div>
            {currentModule === "ProductListing" ? (
                <ProductListing />
            ) : (
                <h1>Anything</h1>
            )}
        </div>
    );
};
export default submodulePage;
