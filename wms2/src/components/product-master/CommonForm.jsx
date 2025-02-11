import React from "react";
import styles from "../../styles/AddProduct.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchB2C, fetchManu, setSelectedB2C } from "@/features/addProduct/addProductSlice";
import { setB2CFinal, setManu, updateData2 } from "@/features/productDetails/productDetailSlice";
import { addMolecule, removeMolecule } from "@/features/productDetails/productDetailSlice";

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
    const { b2c, selectedB2C, molecules } = useSelector((state) => state.addProduct);
    const selectedMolecules = useSelector((state) => state.productDetail?.combination?.molecules || []);
    console.log("field value map = ", field?.valueMap);
    console.log("NESTING = ", getNestedValue(productDetails, field?.valueMap));
    console.log("selected molecules = ", selectedMolecules);

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
        else if (openModule === null && moduleName === "b2c-template") {
            console.log("this is the goated one!");

            if (b2c.values.length === 0) {
                if (b2c.text !== "") {
                    dispatch(
                        fetchB2C({
                            token: token,
                        })
                    );
                    console.log("updated b2c = ", b2c);
                }
                else {
                    dispatch(
                        fetchB2C({
                            token: token,
                            text: b2c.text,
                        })
                    );
                    console.log("updated b2c = ", b2c);
                }
            }
        }
        console.log("module name = ", moduleName);
        setOpenModule(openModule === moduleName ? null : moduleName);
    };

    const handleSpecialFilter = (name, id) => {
        console.log("name = ", name);
        console.log("id = ", id);
        if (field?.key === "manufacturer")
            dispatch(setManu({ id: id, name: name }));
        else if (field?.key === "b2c-template") {
            dispatch(setB2CFinal({ id: id, name: name }));
            dispatch(setSelectedB2C(name));
        }
        setOpenModule(null);
    }

    const handleMultiSelect = (molecule) => {
        console.log("you want to add molecule", molecule);
        console.log("selected molecules = ", selectedMolecules);
        if (!selectedMolecules.some(m => m.molecule_id === molecule.molecule_id)) {
            dispatch(addMolecule(molecule));
        }
    };

    const handleRemoveItem = (e, moleculeId) => {
        console.log("you want to remove molecule", moleculeId);
        e.stopPropagation();
        dispatch(removeMolecule(moleculeId));
    };

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
                            onClick={() => handleModuleToggle(field?.key)}
                        >
                            <div className={styles.filterContainer}>
                                <span className={styles.span}>
                                    <span className={styles.activeFilter}>
                                        {field?.key === "b2c-template" ? selectedB2C : getNestedValue(productDetails, field?.valueMap) || ""}
                                    </span>
                                </span>
                            </div>
                        </div>
                        {openModule === field?.key && (
                            <div className={styles.dropdown}>
                                <div className={styles.inputContainer}>
                                    <div className={styles.inputDiv}>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            value={field?.key === "manufacturer" ? manufacturer.text : field?.key === "b2c-template" ? b2c.text : ""}
                                            placeholder="Search..."
                                            onChange={(e) => {
                                                handleSearch(e.target.value.trim(), field);
                                            }}
                                        />
                                    </div>
                                </div>
                                {openModule === field?.key &&
                                    (field?.key === "manufacturer" ? manufacturer?.values : b2c?.values)?.map((value, key) => (
                                        <button key={key}
                                            className={`${styles.dropdownItem2}`}
                                            onClick={() => handleSpecialFilter(value[field?.valueName], value.id)}
                                        >
                                            {value[field?.valueName]}
                                        </button>
                                    ))
                                }
                            </div>
                        )
                        }
                    </div>
                </>
            )
        case "multiSearchDropdown":
            return (
                <div className={styles.multiSelectContainer}>
                    {/* Show Selected Items as Tags */}
                    <div className={styles.selectedTagsContainer}>
                        {selectedMolecules.map((molecule) => (
                            <span key={molecule.molecule_id} className={styles.selectedTag}>
                                {molecule.molecule_name}
                                <button className={styles.removeBtn} onClick={(e) => handleRemoveItem(e, molecule.molecule_id)}>
                                    X
                                </button>
                            </span>
                        ))}
                    </div>

                    {/* Search Input and Dropdown */}
                    <div className={styles.module}>
                        <div className={styles.moduleHeader} onClick={() => handleModuleToggle(field?.key)}>
                            <div className={styles.filterContainer}>
                                <span className={styles.placeholderText}>
                                    {selectedMolecules.length === 0 ? "Search molecules..." : ""}
                                </span>
                            </div>
                        </div>

                        {openModule === field?.key && (
                            <div className={styles.dropdown}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Search..."
                                    onChange={(e) => handleSearch(e.target.value.trim(), field)}
                                />
                                {molecules?.values?.map((molecule) => (
                                    <button key={molecule.molecule_id}
                                        className={styles.dropdownItem2}
                                        onClick={() => handleMultiSelect(molecule)}
                                    >
                                        {molecule.molecule_name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )
        default:
            return null;
    }
}