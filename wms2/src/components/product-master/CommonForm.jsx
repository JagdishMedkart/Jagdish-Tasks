import React from "react";
import styles from "../../styles/AddProduct.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchManu } from "@/features/addProduct/addProductSlice";
import { setManu, updateData2 } from "@/features/productDetails/productDetailSlice";

export const CommonForm = ({ field, masterData, handleChange, productDetails, handleSearch, token }) => {
    const dispatch = useDispatch();
    console.log("master data = ", masterData);
    console.log("field key = ", masterData?.[field?.key]);
    console.log("product details = ", productDetails);
    console.log("p name = ", productDetails);
    const getNestedValue = (obj, path) => {
        return path?.split('.').reduce((acc, key) => acc?.[key], obj)
    };
    const [openModule, setOpenModule] = useState(null);
    const manufacturer = useSelector((state) => state.addProduct.manufacturer);
    console.log("field value map = ", field?.valueMap);
    console.log("NESTING = ", getNestedValue(productDetails, field?.valueMap));

    const handleModuleToggle = (moduleName) => {
        if (openModule === null && moduleName === "manufacturer") {
            console.log("this is the goated one!");

            if (manufacturer.values.length === 0) {
                if (manufacturer.text !== "") {
                    dispatch(
                        fetchManu({
                            token: token,
                        })
                    );
                    console.log("updated manufacturer = ", manufacturer);
                }
                else {
                    dispatch(
                        fetchManu({
                            token: token,
                            text: manufacturer.text,
                        })
                    );
                    console.log("updated manufacturer = ", manufacturer);
                }
            }
        }
        console.log("module name = ", moduleName);
        setOpenModule(openModule === moduleName ? null : moduleName);
    };

    const handleSpecialFilter = (name, id) => {
        console.log("name = ", name);
        console.log("id = ", id);
        dispatch(setManu({ id: id, name: name }));
        // dispatch(updateData2({name: field.valueMap, value: name}));
        setOpenModule(null);
    }

    useEffect(() => {
        console.log("Updated Manufacturer List:", manufacturer.values);
    }, [manufacturer.values]);

    switch (field.fieldType) {
        case "input":
            return (
                <input
                    className={styles.input}
                    type={field.inputType}
                    value={getNestedValue(productDetails, field?.valueMap) || ""}
                    onChange={(e) => handleChange(e, field)}
                    disabled={`${field?.disabled === true ? true : ""}`}
                    placeholder={`${field?.placeholder ? field.placeholder : ""}`}
                    required={`${field?.required === true ? true : ""}`}
                    min={field?.min ? field?.min : 0}
                />
            )
        case "dropdown":
            return (
                <select
                    className={styles.select}
                    disabled={`${field?.disabled === true ? true : ""}`}
                    required={`${field?.required === true ? true : ""}`}
                    value={getNestedValue(productDetails, field?.valueMap) || ""}
                    onChange={(e) => handleChange(e, field)}
                >
                    {!(field?.default) && <option></option>}
                    {
                        (masterData[field?.key] ? masterData[field?.key] : field?.options)?.map((item, ind) => (
                            <option key={ind} value={`${field?.values ? field?.values[ind] : item}`}>{`${field?.options ? field?.options[ind] : item}`}</option>
                        ))
                    }
                </select>
            )
        case "search":
            return (
                <>
                    <div className={styles.module}>
                        <div
                            className={`${styles.moduleHeader}`}
                            onClick={() => handleModuleToggle("manufacturer")}
                        >
                            <div className={styles.filterContainer}>
                                <span className={styles.span}>
                                    (
                                    <span className={styles.activeFilter}>
                                        {getNestedValue(productDetails, field?.valueMap) || ""}
                                    </span>
                                    )
                                </span>
                            </div>
                        </div>
                        {openModule === "manufacturer" && (
                            <div className={styles.dropdown}>
                                <div className={styles.inputContainer}>
                                    <div className={styles.inputDiv}>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            value={field?.key === "manufacturer" ? manufacturer.text : ""}
                                            placeholder="Search..."
                                            onChange={(e) => {
                                                handleSearch(e.target.value.trim(), field);
                                            }}
                                        />
                                    </div>
                                </div>
                                {openModule === "manufacturer" &&
                                    (manufacturer?.values)?.map((value, key) => (
                                        <button key={key}
                                            className={`${styles.dropdownItem2}`}
                                            onClick={() => handleSpecialFilter(value.name, value.id)}
                                        >
                                            {value.name}
                                        </button>
                                    ))
                                }
                            </div>
                        )
                        }
                    </div>
                </>
            )
        default:
            return null;
    }
}