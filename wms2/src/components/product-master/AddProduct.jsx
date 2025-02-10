"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/styles/Dashboard.module.scss";
import { CommonForm } from "./CommonForm";
import { setProductDetails, updateData, updateData2 } from "@/features/productDetails/productDetailSlice";
import styles from "../../styles/AddProduct.module.scss";
import { setSelected } from "@/features/productDetails/productDetailSlice";
import { fetchManu, setManufacturers, setManufacturerText } from "@/features/addProduct/addProductSlice";

export const AddProduct = ({ masterData, productMasterData, handleDropdownChange, value, productDetails, title, token }) => {
    console.log("master data = ", masterData);
    console.log("value = ", value);
    const dispatch = useDispatch();

    const handleSearch = (e, field) => {
        if(field?.key === "manufacturer")
        dispatch(setManufacturerText(e));
        dispatch(fetchManu({ token, text: e }));
    }

    const handleChange = (e, field) => {
        const value = e.target.value;
        const keys = field?.valueMap.split(".");
        console.log("handling input change ", e, field);
        if (field.key === "product_type")
            dispatch(setProductDetails(e.target.value));
        else
            dispatch(updateData2({ name: field.valueMap, value: e.target.value }));
    }

    const handleSelection = (ind) => {
        dispatch(setSelected(ind));
    }

    const handleSave = (e) => {
        e.preventDefault();
    }

    useEffect(() => {

    }, [dispatch]);

    return (
        <div className={styles.mainDiv}>
            <h1>{title}</h1>
            <form>
                <div className={styles.mainForm}>
                    {
                        productMasterData[productDetails?.product_type]?.mainForm.map((field, ind) => {
                            console.log("field key = ", masterData[field?.key]);
                            return (
                                <div className={styles.field}>
                                    <div className={styles.labelDiv}><label className={styles.label}>{field.display}</label></div>
                                    <CommonForm
                                        field={field}
                                        masterData={masterData}
                                        handleChange={handleChange}
                                        productDetails={productDetails}
                                        handleSearch={handleSearch}
                                        token={token}
                                    />
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
                                    <CommonForm
                                        field={field}
                                        masterData={masterData}
                                        handleChange={handleChange}
                                        productDetails={productDetails}
                                        handleSearch={handleSearch}
                                        token = {token}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
                <div>
                    <div className={styles.saveBtnDiv}><button className={styles.saveBtn} onClick={(e) => handleSave(e)}>SAVE</button></div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
