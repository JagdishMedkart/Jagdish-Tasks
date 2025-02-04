"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../../styles/ProductListing.module.scss";
import {
    fetchProducts,
    setAsc,
    setSortBy,
    setSearchBy,
    setSearchKey,
    setFilters,
} from "@/features/products/productSlice";
import Filter from "./Filter";

const ProductListing = () => {
    const {
        products,
        isLoading,
        meta,
        sort_by,
        asc,
        search_by,
        search_key,
        filters,
    } = useSelector((state) => state.products);
    const token = useSelector((state) => state.auth.token);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const [openModule, setOpenModule] = useState(null);
    const [openSearch, setOpenSearch] = useState(null);
    const [openFilter, setOpenFilter] = useState(null);

    const handleFilterToggle = (item) => {
        setOpenFilter(openFilter === item ? null : item);
        setOpenSearch(null);
        setOpenModule(null);
    };

    const handleModuleToggle = (moduleName) => {
        setOpenModule(openModule === moduleName ? null : moduleName);
        setOpenSearch(null);
        setOpenFilter(null);
    };

    const handleSearchToggle = (item) => {
        setOpenSearch(openSearch === item ? null : item);
        setOpenModule(null);
        setOpenFilter(null);
    };

    const handleAsc = (item) => {
        console.log("within handleAsc");
        console.log(sort_by, asc);
        dispatch(setAsc(!item));
        setCurrentPage(1);
    };

    const searchBy = (ind) => {
        let tmpSearchBy = search_by;
        console.log("tmp search by = ", tmpSearchBy);
        tmpSearchBy = search_by.map((item, key) => ({
            ...item,
            active: key === ind,
        }));
        console.log("Updated tmpSearchBy:", tmpSearchBy);
        dispatch(setSearchBy(tmpSearchBy));
        // setCurrentPage(1);
        setOpenSearch(null);
    };

    const sortBy = (ind) => {
        let tmpSortBy = sort_by;
        console.log("tmp Sort by = ", tmpSortBy);
        tmpSortBy = sort_by.map((item, key) => ({
            ...item,
            active: key === ind,
        }));

        console.log("Updated tmpSortBy:", tmpSortBy);
        dispatch(setSortBy(tmpSortBy));
        setCurrentPage(1);
        setOpenModule(null);
    };

    useEffect(() => {
        console.log("within useEffect = ", sort_by);
        console.log("page = ", currentPage);
        console.log("sort_by = ", sort_by);
        console.log("asc = ", asc);
        dispatch(
            fetchProducts({
                type: "pageChange",
                payload: {
                    page: currentPage,
                    token: token,
                    sort_by: sort_by,
                    asc: asc,
                    search_by: search_by,
                    search_key: search_key,
                    filters: filters,
                },
            })
        );
    }, [dispatch, currentPage, sort_by, asc, search_by, search_key, filters]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= meta.last_page) {
            setCurrentPage(newPage);
        }
    };
    // if (isLoading) return (
    //     <div className={styles.header}>
    //         <div className={styles.headerContainer}>
    //             <p>Loading Products...</p>
    //         </div>
    //     </div>
    // );

    return (
        <div>
            <h1>Product Listing</h1>
            <nav className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.module}>
                        <div className={styles.searchContainer}>
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
                                        type="email"
                                        value={search_key}
                                        placeholder="Search by..."
                                        onChange={(e) => {
                                            if (e.target.value.includes(" ")) {
                                                e.target.value =
                                                    e.target.value.replace(
                                                        /\s/g,
                                                        ""
                                                    );
                                            }
                                            dispatch(
                                                setSearchKey(
                                                    e.target.value.trim()
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                className={`${styles.moduleHeader}`}
                                onClick={() => handleSearchToggle("search")}
                            >
                                <span className={styles.span}>Search By</span>
                            </div>
                        </div>
                        <div
                            className={`${styles.moduleHeader}`}
                            onClick={() => handleFilterToggle("filter")}
                        >
                            <Image
                                src={"/filter.png"}
                                alt={"filter"}
                                width={20}
                                height={20}
                                style={{ objectFit: "contain" }}
                            />
                            <span className={styles.span}>Filter</span>
                        </div>
                        <div
                            className={`${styles.moduleHeader} ${
                                openModule === "sort" ? styles.active : ""
                            }`}
                            onClick={() => handleModuleToggle("sort")}
                        >
                            <Image
                                src={"/sort.png"}
                                alt={"sort"}
                                width={20}
                                height={20}
                                style={{ objectFit: "contain" }}
                            />
                            <span className={styles.span}>Sort By</span>
                        </div>
                        <div
                            className={`${styles.moduleHeader}`}
                            onClick={() => handleAsc(asc)}
                        >
                            <Image
                                src={asc ? "/asc.png" : "/desc.png"}
                                alt={"sort"}
                                width={15}
                                height={15}
                                style={{ objectFit: "contain" }}
                            />
                            <span className={styles.span}>
                                {asc ? "Ascending" : "Descending"}
                            </span>
                        </div>
                        {openModule === "sort" && (
                            <div className={styles.dropdown}>
                                {sort_by?.map((item, ind) => (
                                    <button
                                        key={ind}
                                        className={`${styles.dropdownItem} ${item.active ? styles.selected : ""}`}
                                        onClick={() => {
                                            sortBy(ind);
                                        }}
                                    >
                                        {item.show}
                                    </button>
                                ))}
                            </div>
                        )}
                        {openSearch === "search" && (
                            <div className={styles.dropdown}>
                                {search_by?.map((item, ind) => (
                                    <button
                                        key={ind}
                                        className={`${styles.dropdownItem} ${item.active ? styles.selected : ""}`}
                                        onClick={() => {
                                            searchBy(ind);
                                        }}
                                    >
                                        {item.show}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {openFilter === "filter" && <Filter />}
            {!isLoading && (
                <div className={styles.tableDiv}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Product Code</th>
                                <th className={styles.th}>Wondersoft Code</th>
                                <th className={styles.th}>Product Name</th>
                                <th className={styles.th}>Manufacturer</th>
                                <th className={styles.th}>Combination</th>
                                <th className={styles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product?.product_id}>
                                    <td className={styles.td}>
                                        {product?.product_code}
                                    </td>
                                    <td className={styles.td}>
                                        {product?.ws_code}
                                    </td>
                                    <td className={styles.td}>
                                        {product?.product_name}
                                    </td>
                                    <td className={styles.td}>
                                        {product?.manufacturer}
                                    </td>
                                    <td className={styles.td}>
                                        {product?.combination}
                                    </td>
                                    <td className={styles.td}>
                                        {product?.publish_status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.pagination}>
                        <button
                            className={styles.btn}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {meta.last_page}
                        </span>
                        <button
                            className={styles.btn}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === meta.last_page}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListing;
