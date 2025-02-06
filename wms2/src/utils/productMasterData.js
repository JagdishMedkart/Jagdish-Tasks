export const productMasterData = {
    title: "Add Product",
    mainForm: [
        {
            key: "product_name",
            display: "Product Name*",
            placeholder: "Product Name*",
            required: true,
            fieldType: "string"
        },
        {
            key: "product_type",
            display: "Product Type*",
            required: true,
            fieldType: "dropdown",
            values: ["Goods", "Services"],
            default: "Goods"
        },
        {
            key: "ws_code",
            display: "Wondersoft Code",
            placeholder: "Wondersoft Code",
            disabled: true,
            fieldType: "string"
        },
        {
            key: "product_code",
            display: "Product Code",
            disabled: true,
            fieldType: "string"
        },
        {
            key: "manufacturers",
            display: "Manufacturer*",
            required: true,
            fieldType: "search"
        },
        {
            key: "mrp",
            display: "MRP*",
            required: true,
            fieldType: "number"
        }
    ],
}