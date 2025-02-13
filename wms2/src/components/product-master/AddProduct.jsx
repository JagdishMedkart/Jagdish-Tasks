"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/styles/Dashboard.module.scss";
import { CommonForm } from "./CommonForm";
import { setProductDetails, updateData2 } from "@/features/productDetails/productDetailSlice";
import styles from "../../styles/AddProduct.module.scss";
import { setSelected } from "@/features/productDetails/productDetailSlice";
import { fetchB2C, fetchManu, fetchMolecules, setSelectedB2C, setB2CText, setManufacturerText, setMoleculesText } from "@/features/addProduct/addProductSlice";
import apiClient from "@/axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { setB2CFinal, setManu } from "@/features/productDetails/productDetailSlice";
import { addMolecule, removeMolecule } from "@/features/productDetails/productDetailSlice";

export const AddProduct = ({ masterData, productMasterData, value, productDetails, title, token }) => {
    console.log("master data = ", masterData);
    console.log("value = ", value);
    const dispatch = useDispatch();
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const selectedMolecules = useSelector((state) => state.productDetail?.combination?.molecules || []);

    const isEmptyValue = (value) => {
        return (
            value === undefined ||
            value === "" ||
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === "object" && value !== null && Object.keys(value).length === 0)
        );
    };

    const validateFields = () => {
        let newErrors = {};

        productMasterData[productDetails?.product_type]?.mainForm?.forEach((field) => {
            const value = field.valueMap.split('.').reduce((acc, key) => acc?.[key], productDetails);
            console.warn("value for ", field?.valueMap, " is ", value);
            if (field?.required && isEmptyValue(value)) {
                newErrors[field.valueMap] = `${field.display} is required`;
            }
        });

        productMasterData[productDetails?.product_type]?.headers?.forEach((header) => {
            header.fields.forEach((field) => {
                const value = field.valueMap.split('.').reduce((acc, key) => acc?.[key], productDetails);
                console.warn("value for ", field?.valueMap, " is ", value);
                if (field.required && isEmptyValue(value)) {
                    newErrors[field.valueMap] = `${field.display} is required`;
                }
            });
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    const handleSpecialFilter = (field, name, id) => {
        console.log("name = ", name);
        console.log("id = ", id);
        if (field?.key === "manufacturer")
            dispatch(setManu({ id: id, name: name }));
        else if (field?.key === "b2c-template") {
            dispatch(setB2CFinal({ id: id, name: name }));
            dispatch(setSelectedB2C(name));
        }
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field.valueMap];
            return newErrors;
        });
        console.warn("errors now = ", errors);
    }

    const handleMultiSelect = (e, molecule, field) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("you want to add molecule", molecule);
        console.log("selected molecules = ", selectedMolecules);
        if (!selectedMolecules.some(m => m.molecule_id === molecule.molecule_id)) {
            dispatch(addMolecule(molecule));
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                if (!isEmptyValue(field?.valueMap)) {
                    delete newErrors[field.valueMap];
                }
                return newErrors;
            });
        }
    };

    const handleChange = (e, field) => {
        console.log("you clicked on change with this", e, field);
        let value = e.target.value;
        if (value === "true") value = true;
        else if (value === "false") value = false;
        console.warn("Setting value:", value);
        const keys = field?.valueMap?.split(".");
        console.warn("you are trying to change ", value);
        console.log("handling input change ", value, field);
        if (field.key === "product_type")
            dispatch(setProductDetails(e.target.value));
        else
            dispatch(updateData2({ name: field.valueMap, value: value }));
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (!isEmptyValue(value)) {
                delete newErrors[field.valueMap];
            }
            return newErrors;
        });
        // validateFields();
        console.warn("errors now = ", errors);
    }

    const handleSelection = (ind) => {
        dispatch(setSelected(ind));
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validateFields()) {
            toast.error("Please fill all required fields before submitting.");
            return;
        }
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

            let resp;
            if (title === "Edit Product") {
                resp = await apiClient.put(
                    `/api/v1/master/products/${updatedProductDetails.product_id}`,
                    updatedProductDetails,
                    {
                        headers: {
                            Authorization: `${token}`,
                            Location: "1"
                        }
                    }
                );
            }
            else if (title === "Add Product") {
                resp = await apiClient.post(
                    `/api/v1/master/products`,
                    updatedProductDetails,
                    {
                        headers: {
                            Authorization: `${token}`,
                            Location: "1"
                        }
                    }
                );
            }
            console.warn("Response = ", resp);
            if (resp.status === 200) {
                toast.success(resp.data.message || "Success!", {
                    duration: 1500,
                });

                setTimeout(() => {
                    router.push("/products-master");
                }, 1800);

                dispatch(setSelectedB2C(""));
            }
            else {
                toast.error(`Error ${resp.status}: ${resp.data.message}`, { duration: 2000 });
            }
        } catch (error) {
            console.warn(error);
            toast.error(`Error ${error.response?.status}: ${error.response?.data?.message || error.message}`, { duration: 2000 });
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
                                <div key={ind} className={`${styles.field} ${errors[field.valueMap] ? styles.errorField : ""}`}>
                                    <div className={styles.labelDiv}>
                                        <label className={styles.label}>{field.display}</label>
                                    </div>
                                    <CommonForm
                                        field={field}
                                        masterData={masterData}
                                        handleChange={handleChange}
                                        productDetails={productDetails}
                                        handleSearch={handleSearch}
                                        token={token}
                                        error={errors[field.valueMap]}
                                        handleSpecialFilter={handleSpecialFilter}
                                        handleMultiSelect={handleMultiSelect}
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
                                <li key={ind} onClick={() => handleSelection(ind)}
                                    className={`${styles.li} ${ind === productDetails?.selected ? styles.selected : ""} ${header.fields.some(field => errors[field.valueMap]) ? styles.errorHeader : ""}`}>
                                    {header?.title}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={styles.belowForm}>
                    {
                        productMasterData?.[productDetails?.product_type]?.headers[productDetails?.selected]?.fields.map((field, key) => {
                            console.log("field key = ", masterData[field?.key]);
                            return (
                                <div key={key} className={`${styles.field} ${errors[field.valueMap] ? styles.errorField : ""}`}>
                                    <div className={styles.labelDiv}>
                                        <label className={styles.label}>{field.display}</label>
                                    </div>
                                    <CommonForm
                                        field={field}
                                        masterData={masterData}
                                        handleChange={handleChange}
                                        productDetails={productDetails}
                                        handleSearch={handleSearch}
                                        token={token}
                                        error={errors[field.valueMap]}
                                        handleSpecialFilter={handleSpecialFilter}
                                        handleMultiSelect={handleMultiSelect}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
                <div>
                    <div className={styles.saveBtnDiv}><button className={styles.saveBtn} onClick={handleSave}>SAVE</button></div>
                </div>
                <Toaster />
            </form>
        </div>
    );
};

export default AddProduct;
