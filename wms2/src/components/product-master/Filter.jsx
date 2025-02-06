"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Filter.module.scss";
import { fetchManufacturers, setFilters, fetchMolecules, setManufacturerText, setMoleculesText, setPageChanged, setMeta } from "@/features/products/productSlice";
import Image from "next/image";
import { productStructure } from "@/utils/productStructure";

const Filter = () => {
    const { filters, pageChanged } = useSelector((state) => state.products);
    const [openModule, setOpenModule] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const manufacturer = useSelector((state) => state.products.manufacturers);
    const molecule = useSelector((state) => state.products.molecules);
    const dispatch = useDispatch();
    const [isManufacturer, setIsManufacturer] = useState(false);
    const [isMolecule, setIsMolecule] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenModule(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        console.log("Updated Manufacturer List:", manufacturer.values);
    }, [manufacturer.values]);


    useEffect(() => {
        console.log("updated molecules list = ", molecule.values);
    }, [molecule.values]);


    const handleModuleToggle = (moduleName) => {
        if (openModule === null) {
            if (!filters[moduleName].hasOwnProperty("values") || filters[moduleName].values?.length === 0) {
                console.log("this is the goated one!");

                if (filters[moduleName].actual === "manufacturers" && manufacturer.values.length === 0) {
                    if (manufacturer.text !== "") {
                        dispatch(
                            fetchManufacturers({
                                token: token,
                            })
                        );
                        console.log("updated manufacturer = ", manufacturer);
                    }
                    else {
                        dispatch(
                            fetchManufacturers({
                                token: token,
                                text: manufacturer.text,
                            })
                        );
                        console.log("updated manufacturer = ", manufacturer);
                    }
                }
                else if (filters[moduleName].actual === "molecules" && molecule.values.length === 0) {
                    if (molecule.text !== "") {
                        dispatch(
                            fetchMolecules({
                                token: token,
                            })
                        );
                        console.log("updated molecule = ", molecule);
                    }
                    else {
                        dispatch(
                            fetchMolecules({
                                token: token,
                                text: molecule.text,
                            })
                        );
                        console.log("updated manufacturer = ", molecule);
                    }
                }
            }
        }
        console.log("module name = ", moduleName);
        setOpenModule(openModule === moduleName ? null : moduleName);
    };

    const handleSearch = (ind, text, type) => {
        if (type === "manufacturers") {
            dispatch(setManufacturerText(text));
            dispatch(fetchManufacturers({ token, text }));
        }
        else {
            dispatch(setMoleculesText(text));
            dispatch(fetchMolecules({ token, text }));
        }
    }

    const handleFilter = (ind, value) => {
        console.log("ind = ", ind);
        let tmpFilter = filters;
        console.log("tmp filter before = ", tmpFilter);
        tmpFilter = filters.map((item, key) => {
            if (key == ind) {
                return { ...item, active: value };
            } else {
                return { ...item };
            }
        });
        console.log("Tmp filter = ", tmpFilter);
        dispatch(setPageChanged(false));
        dispatch(setMeta(1));
        dispatch(setFilters(tmpFilter));
        setOpenModule(null);
    };

    const handleSpecilalFilter = (ind, value, id) => {
        console.log("ind = ", ind);
        let tmpFilter = filters;
        console.log("tmp filter before = ", tmpFilter);
        tmpFilter = filters.map((item, key) => {
            if (key == ind) {
                return { ...item, active: value, id: id };
            } else {
                return { ...item };
            }
        });
        console.log("Tmp filter = ", tmpFilter);
        dispatch(setPageChanged(false));
        dispatch(setMeta(1));
        dispatch(setFilters(tmpFilter));
        setOpenModule(null);
    }

    const clearFilter = (ind) => {
        const tmpFilter = filters.map((item, key) => {
            if (key == ind) {
                return { ...item, active: "false" };
            } else return { ...item };
        });
        dispatch(setPageChanged(false));
        dispatch(setMeta(1));
        dispatch(setFilters(tmpFilter));
        setOpenModule(null);
    };

    // useEffect(() => {
    //     console.log("new manufacturer = ", manufacturer);
    //     manufacturer.values.map((value) => (
    //         console.log(value.name)
    //     ));
    // },);

    return (
        <nav className={styles.header}  ref={dropdownRef}>
            <div className={styles.headerContainer}>
                {filters.map((filter, ind) => (
                    <div key={ind} className={styles.module}>
                        <div
                            className={`${styles.moduleHeader} ${filter.active !== false ? styles.selected : ""
                                }`}
                            onClick={() => handleModuleToggle(ind)}
                        >
                            <div className={styles.filterContainer}>
                                <span className={styles.span}>
                                    {filter?.show}
                                    {filter.active !== "false" ? " : " : ""}
                                    {filter.active !== "false" && (
                                        <span className={styles.activeFilter}>
                                            {filter.active}
                                        </span>
                                    )}
                                </span>
                                {filter.active !== "false" && (
                                    <button
                                        className={styles.clearBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clearFilter(ind);
                                        }}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        </div>
                        {filter?.values?.length > 0 && openModule === ind && (
                            <div className={styles.dropdown}>
                                {filter.values.map((value) => (
                                    <button
                                        key={value}
                                        className={`${styles.dropdownItem} ${filter.active === value
                                            ? styles.selectedItem
                                            : ""
                                            }`}
                                        onClick={() => handleFilter(ind, value)}
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        )}
                        {
                            !filter.hasOwnProperty('values') && openModule === ind && (
                                <div className={styles.dropdown}>
                                    {(
                                        <div className={styles.inputContainer}>
                                            <div className={styles.inputDiv}>
                                                <Image
                                                    alt="search"
                                                    src="/search.png"
                                                    width={19}
                                                    height={19}
                                                />
                                                <input
                                                    className={styles.input}
                                                    type="text"
                                                    value={filter.actual === "manufacturers" ? manufacturer.text : molecule.text}
                                                    placeholder="Search..."
                                                    onChange={(e) => {
                                                        handleSearch(ind, e.target.value.trim(), filter.actual);
                                                    }}
                                                />
                                            </div>
                                        </div>)
                                    }
                                    {
                                        (filter.actual === "manufacturers" ? manufacturer.values : molecule.values).map((value, key) => (
                                            <button key={key}
                                                className={`${styles.dropdownItem2} ${filter.active === value.name
                                                    ? styles.selectedItem
                                                    : ""
                                                    }`}
                                                onClick={() => handleSpecilalFilter(ind, value.name, value.id)}
                                            >
                                                {value.name}
                                            </button>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Filter;
