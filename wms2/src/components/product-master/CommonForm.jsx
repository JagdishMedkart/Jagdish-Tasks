import React from "react";
import styles from "../../styles/AddProduct.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchB2C, fetchManu } from "@/features/addProduct/addProductSlice";
import { addMolecule, removeMolecule } from "@/features/productDetails/productDetailSlice";
import Image from "next/image";

export const CommonForm = ({ field, masterData, handleChange, productDetails, handleSearch, token, error, handleSpecialFilter, handleMultiSelect }) => {
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
                <>
                    <input
                        className={`${styles.input} ${error ? styles.errorInput : ""}`}
                        type={field.inputType}
                        value={getNestedValue(productDetails, field?.valueMap) || field?.default || ""}
                        onChange={(e) => handleChange(e, field)}
                        disabled={field?.disabled === true}
                        placeholder={`${field?.placeholder ? field.placeholder : ""}`}
                        required={field?.required === true}
                        min={field?.min || 0}
                    />
                    {/* {error && <span className={styles.errorTooltip} title={error}>⚠</span>} */}
                    {error && (<span className={styles.errorTooltip} title={error}><Image
                        src={'/error.png'}
                        alt={'error'}
                        width={18}
                        height={18}
                    />
                    </span>)}
                </>
            )
        case "dropdown":
            return (
                <>
                    <select
                        className={`${styles.select} ${error ? styles.errorInput : ""}`}
                        disabled={field?.disabled === true}
                        required={field?.required === true}
                        value={String(getNestedValue(productDetails, field?.valueMap)) || ""}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            const finalValue =
                                selectedValue === "true" ? true : selectedValue === "false" ? false : selectedValue;
                            handleChange({ target: { value: finalValue } }, field);
                        }}
                    >
                        {!(field?.default) && <option></option>}
                        {
                            (masterData[field?.key] ? masterData[field?.key] : field?.options)?.map((item, ind) => {
                                return (<option key={ind} value={String(field?.values ? field?.values[ind] : item)}>
                                    {field?.options ? field?.options[ind] : item}
                                </option>);
                            })
                        }
                    </select>
                    {/* {error && <span className={styles.errorTooltip} title={error}>⚠</span>} */}
                    {error && (<span className={styles.errorTooltip} title={error}><Image
                        src={'/error.png'}
                        alt={'error'}
                        width={18}
                        height={18}
                    />
                    </span>)}
                </>
            )
        case "search":
            return (
                <>
                    <div className={styles.module2}>
                        <div
                            className={`${styles.moduleHeader2}`}
                            onClick={() => handleModuleToggle(field?.key)}
                        >
                            <div className={styles.filterContainer}>
                                <span className={styles.span}>
                                    <span className={styles.activeFilter}>
                                        {field?.key === "b2c-template" ? selectedB2C ? selectedB2C : field?.default : getNestedValue(productDetails, field?.valueMap) || field?.default || ""}
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
                                            onClick={() => {
                                                handleSpecialFilter(field, value[field?.valueName], value.id);
                                                setOpenModule(null);
                                            }}
                                        >
                                            {value[field?.valueName]}
                                        </button>
                                    ))
                                }
                            </div>
                        )
                        }
                        {/* {error && <span className={styles.errorTooltip} title={error}>⚠</span>} */}
                    </div>
                    {error && (<span className={styles.errorTooltip} title={error}><Image
                        src={'/error.png'}
                        alt={'error'}
                        width={18}
                        height={18}
                    />
                    </span>)}
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
                                        onClick={(e) => handleMultiSelect(e, molecule, field)}
                                    >
                                        {molecule.molecule_name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {error && (<span className={styles.errorTooltip} title={error}><Image
                            src={'/error.png'}
                            alt={'error'}
                            width={18}
                            height={18}
                        />
                        </span>)}
                    </div>
                </div>
            )
        default:
            return null;
    }
}