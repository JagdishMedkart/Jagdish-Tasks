"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Filter.module.scss";
import { setFilters } from "@/features/products/productSlice";

const Filter = () => {
    const { filters, isLoading } = useSelector((state) => state.products);
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
            }
            else {
                return { ...item };
            }
        })
        console.log("Tmp filter = ", tmpFilter);
        dispatch(setFilters(tmpFilter));
        setOpenModule(null);
    }

    return (
        <nav className={styles.header}>
            <div className={styles.headerContainer}>
                {filters.map((filter, ind) => (
                    <div key={ind} className={styles.module}>
                        <div
                            className={`${styles.moduleHeader} ${openModule === ind ? styles.active : ''}`}
                            onClick={() => handleModuleToggle(ind)}
                        >
                            <span className={styles.span}>{filter?.show}</span>
                        </div>
                        {filter?.values?.length > 0 && openModule === ind && (
                            <div className={styles.dropdown}>
                                {filter.values.map((value) => (
                                    <button
                                        key={value}
                                        className={styles.dropdownItem}
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