export const productMasterData = {
    title: "Add Product",
    Goods: {
        mainForm: [
            {
                key: "product_name",
                display: "Product Name*",
                placeholder: "Product Name*",
                required: true,
                fieldType: "input",
                inputType: "text",
            },
            {
                key: "product_type",
                display: "Product Type*",
                required: true,
                fieldType: "dropdown",
                default: "Goods"
            },
            {
                key: "ws_code",
                display: "Wondersoft Code",
                placeholder: "Wondersoft Code",
                disabled: true,
                fieldType: "input",
                inputType: "text",
            },
            {
                key: "product_code",
                display: "Product Code",
                disabled: true,
                placeholder: "Product Code",
                fieldType: "input",
                inputType: "text",
            },
            {
                key: "manufacturers",
                display: "Manufacturer*",
                required: true,
                fieldType: "search",
            },
            {
                key: "mrp",
                display: "MRP*",
                required: true,
                fieldType: "input",
                inputType: "number",
                placeholder: "MRP*"
            }
        ],
        headers: [
            {
                title: "Packaging and Units*",
                required: true,
                fields: [
                    {
                        key: "dosage_form",
                        display: "Dosage Form*",
                        required: true, 
                        fieldType: "dropdown",
                    },
                    {
                        key: "package_type",
                        display: "Package Type*",
                        required: true, 
                        fieldType: "dropdown",
                    },
                    {
                        key: "uom",
                        display: "UOM*",
                        required: true, 
                        fieldType: "dropdown",
                    },
                    {
                        key: "",
                        display: "Package Size*",
                        required: true, 
                        fieldType: "input",
                        inputType: "number",
                        placeholder: "Package Size*"
                    },
                ]
            },
            {
                title: "Molecule Composition*",
                required: true,
                fields: [
                    {
                        key: "molecules",
                        display: "Molecules*",
                        required: true, 
                        fieldType: "multiSearchDropdown",
                    },
                ]
            },
            {
                title: "Classification*",
                required: true,
                fields: [
                    {
                        key: "",
                        display: "Is Assured*",
                        required: true, 
                        fieldType: "dropdown",
                        values: ["Yes", "No"]
                    },
                    {
                        key: "",
                        display: "Discontinued*",
                        disabled: true, 
                        fieldType: "dropdown",
                        values: ["No"],
                        default: "No"
                    },
                    {
                        key: "",
                        display: "Banned*",
                        required: true, 
                        fieldType: "dropdown",
                        values: ["Yes", "No"]
                    },
                    {
                        key: "",
                        display: "Is Active*",
                        required: true, 
                        fieldType: "dropdown",
                        values: ["Yes", "No"]
                    },
                    {
                        key: "",
                        display: "Is Hidden From Alternate*",
                        required: true, 
                        fieldType: "dropdown",
                        values: ["Yes", "No"]
                    },
                    {
                        key: "",
                        display: "Rx Required.",
                        disabled: true, 
                        fieldType: "dropdown",
                        values: ["Yes"],
                        default: "Yes"
                    },
                    {
                        key: "",
                        display: "Can Sell Online",
                        disabled: true, 
                        fieldType: "dropdown",
                        values: ["Yes"],
                        default: "Yes"
                    },
                    {
                        key: "",
                        display: "Chronic",
                        disabled: true, 
                        fieldType: "dropdown",
                        values: ["Yes"],
                        default: "Yes"
                    },
                    {
                        key: "",
                        display: "Refrigerated",
                        disabled: true, 
                        fieldType: "dropdown",
                        values: ["Yes"],
                        default: "Yes"
                    },
                    {
                        key: "",
                        display: "Scheduled Type Code",
                        disabled: true, 
                        fieldType: "input",
                        inputType: "text",
                        placeholder: "Schedule"
                    },
                ]
            },
            {
                title: "Transaction Units",
                required: false,
                fields: [
                    {
                        key: "",
                        display: "Purchase Unit",
                        fieldType: "input",
                        inputType: "number",
                        placeholder: "Purchase Unit",
                        default: 1,
                    },
                    {
                        key: "",
                        display: "Transfer Unit",
                        fieldType: "input",
                        inputType: "number",
                        placeholder: "Purchase Unit",
                        default: 1,
                    },
                    {
                        key: "",
                        display: "Sales Unit",
                        fieldType: "input",
                        inputType: "number",
                        placeholder: "Purchase Unit",
                        default: 1,
                    },
                ]
            },
            {
                title: "GST Info*",
                required: true,
                fields: [
                    {
                        key: "gst_type",
                        display: "GST Type*",
                        required: true, 
                        fieldType: "dropdown",
                    },
                    {
                        key: "",
                        display: "HSN Code*",
                        required: true, 
                        fieldType: "input",
                        inputType: "text",
                        placeholder: "HSN Code*"
                    },
                ]
            },
            {
                title: "Sales Category*",
                required: true,
                fields: [
                    {
                        key: "b2b_category",
                        display: "B2B Product type*",
                        required: true, 
                        fieldType: "dropdown",
                    },
                    {
                        key: "b2c-template",
                        display: "B2C Product type*",
                        required: true, 
                        fieldType: "dropdown",
                        default: "B2C Product type*",
                    },
                    {
                        key: "sales_trend_category",
                        display: "Sales Trend Category*",
                        required: true, 
                        fieldType: "dropdown",
                    },
                    {
                        key: "product_return_type",
                        display: "Return Type*",
                        required: true, 
                        fieldType: "dropdown",
                    },
                ]
            },
            {
                title: "MIS Category",
                required: false,
                fields: [
                    {
                        key: "mis_reporting_category",
                        display: "Reporting Category",
                        required: false, 
                        fieldType: "dropdown",
                    },
                    {
                        key: "mis_warehouse_category",
                        display: "WH Category",
                        required: false, 
                        fieldType: "dropdown",
                    },
                ]
            }
        ]
    },
    Services: {
        mainForm: [
            {
                key: "product_name",
                display: "Product Name*",
                placeholder: "Product Name*",
                required: true,
                fieldType: "input",
                inputType: "text",
            },
            {
                key: "product_type",
                display: "Product Type*",
                required: true,
                fieldType: "dropdown",
                default: "Goods"
            },
            {
                key: "ws_code",
                display: "Wondersoft Code",
                placeholder: "Wondersoft Code",
                disabled: true,
                fieldType: "input",
                inputType: "text",
            },
            {
                key: "product_code",
                display: "Product Code",
                disabled: true,
                fieldType: "input",
                inputType: "text",
            },
        ],
        headers: [
            {
                title: "Classification*",
                required: true,
                fields: [
                    {
                        key: "",
                        display: "Is Active*",
                        required: true, 
                        fieldType: "dropdown",
                        values: ["Yes", "No"],
                        default:"Yes"
                    },
                ]
            },
            {
                title: "GST Info*",
                required: true,
                fields: [
                    {
                        key: "gst_type",
                        display: "GST Type*",
                        required: true, 
                        fieldType: "dropdown",
                    },
                    {
                        key: "",
                        display: "HSN Code*",
                        required: true, 
                        fieldType: "input",
                        inputType: "text",
                        placeholder: "HSN Code*"
                    },
                ]
            },
            {
                title: "MIS Category",
                required: false,
                fields: [
                    {
                        key: "mis_reporting_category",
                        display: "Reporting Category",
                        required: false, 
                        fieldType: "dropdown",
                    },
                    {
                        key: "mis_warehouse_category",
                        display: "WH Category",
                        required: false, 
                        fieldType: "dropdown",
                    },
                ]
            }
        ]
    }
}