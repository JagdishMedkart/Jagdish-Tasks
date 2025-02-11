"use client";
import React from "react";
import styles from "../../styles/ProductListing.module.scss";

const Pagination = ({handlePageChange, meta}) => {

    return (
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
    );
};

export default Pagination;