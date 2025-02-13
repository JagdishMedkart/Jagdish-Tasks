export const productMasterData = {
    Goods: {
        mainForm: [
            {
                key: "product_name",
                display: "Product Name*",
                placeholder: "Product Name*",
                required: true,
                fieldType: "input",
                inputType: "text",
                valueMap: "product_name"
            },
            {
                key: "product_type",
                display: "Product Type*",
                required: true,
                fieldType: "dropdown",
                default: "Goods",
                valueMap: "product_type",
            },
            {
                key: "ws_code",
                display: "Wondersoft Code",
                placeholder: "Wondersoft Code",
                disabled: true,
                fieldType: "input",
                inputType: "text",
                valueMap: "ws_code",
            },
            {
                key: "product_code",
                display: "Product Code",
                disabled: true,
                placeholder: "Product Code",
                fieldType: "input",
                inputType: "text",
                valueMap: "product_code",
            },
            {
                key: "manufacturer",
                display: "Manufacturer*",
                required: true,
                fieldType: "search",
                valueMap: "manufacturer.name",
                valueName: "name",
                default: "Ex. Pharma..."
            },
            {
                key: "mrp",
                display: "MRP*",
                required: true,
                fieldType: "input",
                inputType: "number",
                placeholder: "MRP*",
                min: 1,
                valueMap: "mrp"
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
                        valueMap: "packaging_units.dosage_form"
                    },
                    {
                        key: "package_type",
                        display: "Package Type*",
                        required: true, 
                        fieldType: "dropdown",
                        valueMap: "packaging_units.package_type"
                    },
                    {
                        key: "uom",
                        display: "UOM*",
                        required: true, 
                        fieldType: "dropdown",
                        valueMap: "packaging_units.uom"
                    },
                    {
                        key: "",
                        display: "Package Size*",
                        required: true, 
                        fieldType: "input",
                        inputType: "number",
                        placeholder: "Package Size*",
                        valueMap: "packaging_units.package_size"
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
                        valueMap: "combination.molecules"
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
                        options: ["Yes", "No"],
                        values: [true, false],
                        valueMap: "is_assured"
                    },
                    {
                        key: "",
                        display: "Discontinued*",
                        disabled: true, 
                        fieldType: "dropdown",
                        options: ["No"],
                        values: [false],
                        default: "No",
                        valueMap: "is_discontinued"
                    },
                    {
                        key: "",
                        display: "Banned*",
                        required: true, 
                        fieldType: "dropdown",
                        options: ["Yes", "No"],
                        values: [true, false],
                        valueMap: "is_banned"
                    },
                    {
                        key: "",
                        display: "Is Active*",
                        required: true, 
                        fieldType: "dropdown",
                        options: ["Yes", "No"],
                        values: [true, false],
                        valueMap: "is_active"
                    },
                    {
                        key: "",
                        display: "Is Hidden From Alternate*",
                        required: true, 
                        fieldType: "dropdown",
                        options: ["Yes", "No"],
                        values: [true, false],
                        valueMap: "is_hidden_from_alternate_products"
                    },
                    {
                        key: "",
                        display: "Rx Required.",
                        disabled: true, 
                        fieldType: "dropdown",
                        options: ["Yes"],
                        values: [true],
                        default: "Yes",
                        valueMap: "is_rx_required"
                    },
                    {
                        key: "",
                        display: "Can Sell Online",
                        disabled: true, 
                        fieldType: "dropdown",
                        options: ["Yes"],
                        values: [true],
                        default: "Yes",
                        valueMap: "can_sell_online"
                    },
                    {
                        key: "",
                        display: "Chronic",
                        disabled: true, 
                        fieldType: "dropdown",
                        options: ["Yes"],
                        values: [true],
                        default: "Yes",
                        valueMap: "is_chronic"
                    },
                    {
                        key: "",
                        display: "Refrigerated",
                        disabled: true, 
                        fieldType: "dropdown",
                        options: ["Yes"],
                        values: [true],
                        default: "Yes",
                        valueMap: "is_refrigerated"
                    },
                    {
                        key: "",
                        display: "Scheduled Type Code",
                        disabled: true, 
                        fieldType: "input",
                        inputType: "text",
                        placeholder: "Schedule",
                        valueMap: "scheduled_type_code"
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
                        valueMap: "transaction_units.purchase_unit"
                    },
                    {
                        key: "",
                        display: "Transfer Unit",
                        fieldType: "input",
                        inputType: "number",
                        placeholder: "Purchase Unit",
                        default: 1,
                        valueMap: "transaction_units.transfer_unit"
                    },
                    {
                        key: "",
                        display: "Sales Unit",
                        fieldType: "input",
                        inputType: "number",
                        placeholder: "Purchase Unit",
                        default: 1,
                        valueMap: "transaction_units.sales_unit"
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
                        valueMap: "taxes.gst_type"
                    },
                    {
                        key: "",
                        display: "HSN Code*",
                        required: true, 
                        fieldType: "input",
                        inputType: "text",
                        placeholder: "HSN Code*",
                        valueMap: "taxes.hsn_code"
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
                        valueMap: "sales_category.b2b_category"
                    },
                    {
                        key: "b2c-template",
                        display: "B2C Product type*",
                        required: true, 
                        fieldType: "search",
                        default: "B2C Product type...",
                        valueMap: "sales_category.b2c_category",
                        valueName: "category_name"
                    },
                    {
                        key: "sales_trend_category",
                        display: "Sales Trend Category*",
                        required: true, 
                        fieldType: "dropdown",
                        valueMap: "sales_category.sales_trend_category"
                    },
                    {
                        key: "product_return_type",
                        display: "Return Type*",
                        required: true, 
                        fieldType: "dropdown",
                        valueMap: "sales_category.return_type"
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
                        valueMap: "mis_reporting_category"
                    },
                    {
                        key: "mis_warehouse_category",
                        display: "WH Category",
                        required: false, 
                        fieldType: "dropdown",
                        valueMap: "mis_warehouse_category"
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
                valueMap: "product_name"
            },
            {
                key: "product_type",
                display: "Product Type*",
                required: true,
                fieldType: "dropdown",
                default: "Goods",
                valueMap: "product_type"
            },
            {
                key: "ws_code",
                display: "Wondersoft Code",
                placeholder: "Wondersoft Code",
                disabled: true,
                fieldType: "input",
                inputType: "text",
                valueMap: "ws_code"
            },
            {
                key: "product_code",
                display: "Product Code",
                disabled: true,
                fieldType: "input",
                inputType: "text",
                valueMap: "product_code",
                placeholder: "Product Code",
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
                        options: ["Yes", "No"],
                        values: [true, false],
                        default:"Yes",
                        valueMap: "is_active"
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
                        valueMap: "taxes.gst_type"
                    },
                    {
                        key: "",
                        display: "HSN Code*",
                        required: true, 
                        fieldType: "input",
                        inputType: "text",
                        placeholder: "HSN Code*",
                        valueMap: "taxes.hsn_code"
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
                        valueMap: "mis_reporting_category"
                    },
                    {
                        key: "mis_warehouse_category",
                        display: "WH Category",
                        required: false, 
                        fieldType: "dropdown",
                        valueMap: "mis_warehouse_category"
                    },
                ]
            }
        ]
    }
}