"use client";
import React from "react";
import styles from "../../styles/ProductListing.module.scss";

const Table = ({ productStructure, products, onClickAction }) => {

    return (
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
                            productStructure?.headers.map((header, key2) => {
                                return (
                                    <td key={`${ind}123-${key2}-${product?.product_id}`} className={`${styles.td}`}>
                                        {
                                            header?.actions ?
                                                header?.actions?.map((action, actionIndex) => {
                                                    switch (action?.fieldType) {
                                                        case "button":
                                                            return (
                                                                <button
                                                                key={`btn-${product.product_id}-${actionIndex}`}
                                                                    onClick={() => { onClickAction(action, product) }}>
                                                                    {action?.component ?
                                                                        action.component()
                                                                        :
                                                                        action.fieldKey}
                                                                </button>
                                                            )
                                                    }
                                                })
                                                :
                                                header?.customField ? header?.customField(product) : product[header.key]
                                        }
                                    </td>
                                )
                            })
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;