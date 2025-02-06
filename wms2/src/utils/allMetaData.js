import ProductListing from "@/components/product-master/ProductListing";

export const allMetaData = {
    "product-master": {
        component: <ProductListing />
    },
    "product-master/add-product": {
        component: () => {
            return (
                <h1>adding products????</h1>
            )
        }
    },
    "a/b/c" : {
        component: () => {
            return (
                <h1>ABCDEFGHIJ</h1>
            )
        }
    }
}