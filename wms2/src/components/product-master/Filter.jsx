"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Filter.module.scss";
import { setFilters } from "@/features/products/productSlice";

const Filter = () => {
    const { filters } = useSelector((state) => state.products);
    const [openModule, setOpenModule] = useState(null);
    const dispatch = useDispatch();

    const handleModuleToggle = (moduleName) => {
        console.log("module name = ", moduleName);
        setOpenModule(openModule === moduleName ? null : moduleName);
    };

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
        dispatch(setFilters(tmpFilter));
        setOpenModule(null);
    };

    const clearFilter = (ind) => {
        const tmpFilter = filters.map((item, key) => {
            if (key == ind) {
                return { ...item, active: "false" };
            } else return { ...item };
        });
        dispatch(setFilters(tmpFilter));
        setOpenModule(null);
    };

    return (
        <nav className={styles.header}>
            <div className={styles.headerContainer}>
                {filters.map((filter, ind) => (
                    <div key={ind} className={styles.module}>
                        <div
                            className={`${styles.moduleHeader} ${
                                filter.active !== false ? styles.selected : ""
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
                                        className={`${styles.dropdownItem} ${
                                            filter.active === value
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
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Filter;
