import styles from "../styles/ProductListing.module.scss";
import Image from "next/image";

let baseProductURL = "/product-master";

export const productStructure = {
    headers: [
        {
            key: "product_code",
            display: "Product Code"
        },
        {
            key: "ws_code",
            display: "Wondersoft Code"
        },
        {
            key: "product_name",
            display: "Product Name"
        },
        {
            key: "manufacturer",
            display: "Manufacturer"
        },
        {
            key: "combination",
            display: "Combination"
        },
        {
            key: "publish_status",
            display: "Status",
            customField: (product) => {
                return (
                    <span
                        className={`${styles.status} ${product.publish_status ===
                            "Published"
                            ? styles.published
                            : product.publish_status ===
                                "Unpublished"
                                ? styles.unpublished
                                : styles.draft
                            }`}
                    >
                        <span
                            className={`${styles.dot} ${product.publish_status ===
                                "Published"
                                ? styles.publishedDot
                                : product.publish_status ===
                                    "Unpublished"
                                    ? styles.unpublishedDot
                                    : styles.draftDot
                                }`}
                        >
                            {"•"}
                        </span>
                        {product.publish_status}
                    </span>
                )
            },
            values: {
                Draft: "draftDot",
                Published: "publishedDot",
                Unpublished: "unpublishedDot"
            }
        },
        {
            key: "",
            display: "",
            customField: (product) => {
                return (
                    <div className={styles.belowHeader}>
                        <Image src={"/edit.png"}
                            width={20}
                            height={20}
                            alt={"edit"}
                            onClick={() => { router.push(`${baseProductURL}/edit-product/${product?.product_id}`) }} />
                        <Image src={"/add.png"}
                            width={20}
                            height={20}
                            alt={"add"}
                            onClick={() => { router.push(`${baseProductURL}/add-product`) }} />
                    </div>
                )
            }
        }
    ]
};