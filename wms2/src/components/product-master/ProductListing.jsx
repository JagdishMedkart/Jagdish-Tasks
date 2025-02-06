"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import styles from "../../styles/ProductListing.module.scss";
import {
    fetchProducts,
    setAsc,
    setSortBy,
    setSearchBy,
    setSearchKey,
    setPageChanged,
    setMeta,
} from "@/features/products/productSlice";
import Filter from "./Filter";
import { useRouter, usePathname, useParams } from "next/navigation";
import { productStructure } from "@/utils/productStructure";

const ProductListing = ({ title, Struct }) => {
    const {
        products,
        isLoading,
        meta,
        sort_by,
        asc,
        search_by,
        search_key,
        filters,
        pageChanged,
    } = useSelector((state) => state.products);
    const token = useSelector((state) => state.auth.token);
    // const [currentPage, setCurrentPage] = useState(meta.current_page);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    let currentPath = useParams();
    currentPath = Object.values(currentPath);
    let uuid = self.crypto.randomUUID();

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
        dispatch(setPageChanged(false));
        dispatch(setAsc(!item));
        // setCurrentPage(1);
        dispatch(setMeta(1));
    };

    const searchBy = (ind) => {
        let tmpSearchBy = search_by;
        console.log("tmp search by = ", tmpSearchBy);
        tmpSearchBy = search_by.map((item, key) => ({
            ...item,
            active: key === ind,
        }));
        console.log("Updated tmpSearchBy:", tmpSearchBy);
        dispatch(setPageChanged(false));
        dispatch(setSearchBy(tmpSearchBy));
        // setCurrentPage(1);
        dispatch(setMeta(1));
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
        dispatch(setPageChanged(false));
        dispatch(setSortBy(tmpSortBy));
        // setCurrentPage(1);
        dispatch(setMeta(1));
        setOpenModule(null);
    };

    useEffect(() => {
        console.log("within useEffect = ", sort_by);
        // console.log("page = ", currentPage);
        console.log("sort_by = ", sort_by);
        console.log("asc = ", asc);
        console.log("current path = ", currentPath);
        dispatch(
            fetchProducts({
                type: "pageChange",
                payload: {
                    page: meta.current_page,
                    token: token,
                    sort_by: sort_by,
                    asc: asc,
                    search_by: search_by,
                    search_key: search_key,
                    filters: filters,
                    pageChanged: pageChanged,
                },
            })
        );
    }, [
        dispatch,
        meta.current_page,
        sort_by,
        asc,
        search_by,
        search_key,
        filters,
    ]);

    const handlePageChange = (newPage) => {
        if (!newPage) {
            dispatch(setPageChanged(true));
            dispatch(setMeta(1));
        } else if (newPage > meta.last_page) {
            dispatch(setPageChanged(true));
            dispatch(setMeta(meta.last_page));
        } else {
            dispatch(setPageChanged(true));
            dispatch(setMeta(newPage));
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
        <div className={styles.mainListing}>
            <div className={styles.innerListing}>
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
                                                if (
                                                    e.target.value.includes(" ")
                                                ) {
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
                                    <span className={styles.span}>
                                        {search_by?.map(
                                            (value) =>
                                                value.active === true &&
                                                value.show
                                        )}
                                    </span>
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
                                className={`${styles.moduleHeader} ${openModule === "sort" ? styles.active : ""
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
                                            className={`${styles.dropdownItem
                                                } ${item.active
                                                    ? styles.selected
                                                    : ""
                                                }`}
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
                                            className={`${styles.dropdownItem
                                                } ${item.active
                                                    ? styles.selected
                                                    : ""
                                                }`}
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
                                    {productStructure.headers.map((header) => (
                                        <th key={header.key} className={styles.th}>
                                            {header.display}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, ind) => (
                                    <tr key={`${product.product_id}`}>
                                        {
                                            productStructure?.headers.map((header) => {
                                                let value = product[header.key];
                                                return (
                                                    <td key={`${header.key}-${product.product_id}`} className={`${styles.td}`}>
                                                        {
                                                            header?.customField ? header?.customField(product) : value
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={styles.pagination}>
                            <button
                                className={styles.btn}
                                onClick={() =>
                                    handlePageChange(meta.current_page - 1)
                                }
                                disabled={meta.current_page === 1}
                            >
                                Previous
                            </button>
                            <input
                                className={styles.input2}
                                type="text"
                                value={meta.current_page}
                                onChange={(e) => {
                                    // if (e.target.value.includes(" ")) {
                                    //     e.target.value =
                                    //         e.target.value.replace(
                                    //             /\s/g,
                                    //             ""
                                    //         );
                                    // }
                                    handlePageChange(
                                        Number(e.target.value.trim())
                                    );
                                }}
                            />
                            <span className={styles.spanLast}>
                                of {meta.last_page}
                            </span>
                            <button
                                className={styles.btn}
                                onClick={() =>
                                    handlePageChange(meta.current_page + 1)
                                }
                                disabled={meta.current_page === meta.last_page}
                            >
                                Next
                            </button>
                        </div>
                    </div >
                )}
            </div >
        </div >
    );
};

export default ProductListing;
