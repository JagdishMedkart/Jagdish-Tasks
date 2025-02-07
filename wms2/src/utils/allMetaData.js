import ProductListing from "@/components/product-master/ProductListing";
import { useSelector } from "react-redux";
import AddProduct from "@/components/product-master/AddProduct";

export const allMetaData = {
    "product-master": {
        component: <ProductListing />
    },
    // "product-master/add-product": {
    //     component: <AddProduct masterData={masterData} />
    // },
    "a/b/c" : {
        component: () => {
            return (
                <h1>ABCDEFGHIJ</h1>
            )
        }
    }
}