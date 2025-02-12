"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import styles from "../page.module.css";
import Header from "@/components/Header";
import { allMetaData } from "@/utils/allMetaData";
import AddProduct from "@/components/product-master/AddProduct";
import { productMasterData } from "@/utils/productMasterData";

const MainPage = () => {
    const params = useParams();
    console.log("slug = ", params.slug);
    const value = useState("Goods");
    let masterData = useSelector((state) => state.addProduct);
    const productDetails = useSelector((state) => state.productDetail);
    const token = useSelector((state) => state.auth.token);

    let slugs = params.slug;

    const isEditProduct =
        slugs.length === 3 &&
        slugs[0] === "product-master" &&
        slugs[1] === "edit-product" &&
        /^\d+$/.test(slugs[2]);

    useEffect(() => {
        console.log("updated master data = ", masterData);
        console.log("product details = ", productDetails);
    }, [masterData, productDetails, slugs]);

    return (
        <div className={styles.mainDiv}>
            <Navbar />
            <Header />
            {allMetaData[params.slug.join("/")]?.component ? allMetaData[params.slug.join("/")]?.component() : null}
            {params.slug.join("/") === "product-master/add-product"
                && (
                    <AddProduct
                        masterData={masterData}
                        productMasterData={productMasterData}
                        productDetails={productDetails}
                        title={"Add Product"}
                        token = {token}
                    />
                )}
            {isEditProduct && (
                <AddProduct
                    masterData={masterData}
                    productMasterData={productMasterData}
                    productDetails={productDetails}
                    title={"Edit Product"}
                    product_id={slugs[2]}
                    token = {token}
                />
            )}
        </div>
    );
};
export default MainPage;
