"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/styles/Dashboard.module.scss";
import { CommonForm } from "./CommonForm";
import { setProductDetails, updateData, updateData2 } from "@/features/productDetails/productDetailSlice";
import styles from "../../styles/AddProduct.module.scss";
import { setSelected } from "@/features/productDetails/productDetailSlice";
import { fetchB2C, fetchManu, fetchMolecules, setB2CText, setManufacturers, setManufacturerText, setMoleculesText } from "@/features/addProduct/addProductSlice";
import apiClient from "@/axios";
import { useRouter } from "next/navigation";

export const AddProduct = ({ masterData, productMasterData, handleDropdownChange, value, productDetails, title, token }) => {
    console.log("master data = ", masterData);
    console.log("value = ", value);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSearch = (e, field) => {
        if (field?.key === "manufacturer") {
            dispatch(setManufacturerText(e));
            dispatch(fetchManu({ token, text: e }));
        }
        else if (field?.key === "b2c-template") {
            dispatch(setB2CText(e));
            dispatch(fetchB2C({ token, text: e }));
        }
        else if (field?.key === "molecules") {
            dispatch(setMoleculesText(e));
            dispatch(fetchMolecules({ token, text: e }));
        }
    }

    const handleChange = (e, field) => {
        console.log("you clicked on change with this", e, field);
        let value = e.target.value;
        value = value === "true" ? true : value === "false" ? false : value;
        const keys = field?.valueMap?.split(".");
        console.log("handling input change ", e, field);
        if (field.key === "product_type")
            dispatch(setProductDetails(e.target.value));
        else
            dispatch(updateData2({ name: field.valueMap, value: e.target.value }));
    }

    const handleSelection = (ind) => {
        dispatch(setSelected(ind));
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            console.log("Before Transforming: ", JSON.stringify(productDetails, null, 2));

            let updatedProductDetails = JSON.parse(JSON.stringify(productDetails));

            if (updatedProductDetails.combination?.molecules) {
                updatedProductDetails.combination.molecules = updatedProductDetails.combination.molecules.map(molecule =>
                    typeof molecule === "number" ? molecule : molecule.molecule_id
                );
            }

            if (updatedProductDetails.sales_category?.b2c_category?.id) {
                updatedProductDetails.sales_category.b2c_category = updatedProductDetails.sales_category.b2c_category.id;
            }

            delete updatedProductDetails.alternate_product;

            console.log("Transformed Product Details: ", JSON.stringify(updatedProductDetails, null, 2));

            if (title === "Edit Product") {
                const resp = await apiClient.put(
                    `/api/v1/master/products/${updatedProductDetails.product_id}`,
                    updatedProductDetails,
                    {
                        headers: {
                            Authorization: `${token}`,
                            Location: "1"
                        }
                    }
                );

                console.log("PUT response = ", resp.data);
            }
            else if (title === "Add Product") {
                const resp = await apiClient.post(
                    `/api/v1/master/products`,
                    updatedProductDetails,
                    {
                        headers: {
                            Authorization: `${token}`,
                            Location: "1"
                        }
                    }
                );

                console.log("PUT response = ", resp.data);
            }
            router.push("/products-master");
        } catch (error) {
            console.error("Error updating product:", error.response?.status, error.response?.data || error.message);
        }
    };


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
                                <div key={ind} className={styles.field}>
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
                                        token={token}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
                <div>
                    <div className={styles.saveBtnDiv}><button className={styles.saveBtn} onClick={handleSave}>SAVE</button></div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
