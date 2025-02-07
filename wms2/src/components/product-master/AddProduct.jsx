"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/styles/Dashboard.module.scss";
import { CommonForm } from "./CommonForm";
import { setProductDetails, updateData } from "@/features/productDetails/productDetailSlice";
import styles from "../../styles/AddProduct.module.scss";
import { setSelected } from "@/features/productDetails/productDetailSlice";

export const AddProduct = ({ masterData, productMasterData, handleDropdownChange, value, productDetails }) => {
    console.log("master data = ", masterData);
    console.log("value = ", value);
    const dispatch = useDispatch();

    const handleChange = (e, field) => {
        console.log("handling input change ", e, field);
        if (field.key === "product_type")
            dispatch(setProductDetails(e.target.value));
        else
            dispatch(updateData({name: field.key, value: e.target.value}));
    }

    const handleSelection = (ind) => {
        dispatch(setSelected(ind));
    }

    useEffect(() => {

    }, [dispatch]);

    return (
        <div className={styles.mainDiv}>
            <h1>{productMasterData.title}</h1>
            <form>
                <div className={styles.mainForm}>
                    {
                        productMasterData[productDetails?.product_type]?.mainForm.map((field, ind) => {
                            console.log("field key = ", masterData[field?.key]);
                            return (
                                <div className={styles.field}>
                                    <div className={styles.labelDiv}><label className={styles.label}>{field.display}</label></div>
                                    {CommonForm(field, masterData, handleChange, handleDropdownChange, productDetails)}
                                </div>
                            );
                        })
                    }
                </div>
                <div className={styles.tabs}>
                    <ul className={styles.ul}>
                        {
                            productMasterData?.[productDetails?.product_type]?.headers?.map((header, ind) => (
                                <li key={ind} onClick={() => handleSelection(ind)} className={`${styles.li} ${ind === productDetails?.selected ? styles.selected : ""}`}>{header?.title}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className={styles.belowForm}>
                    {
                        productMasterData?.[productDetails?.product_type]?.headers[productDetails?.selected]?.fields.map((field, key) => {
                            console.log("field key = ", masterData[field?.key]);
                            return (
                                <div className={styles.field}>
                                    <div className={styles.labelDiv}><label className={styles.label}>{field.display}</label></div>
                                    {CommonForm(field, masterData, handleChange, handleDropdownChange, productDetails)}
                                </div>
                            );
                        })
                    }
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
