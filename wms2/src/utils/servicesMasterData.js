export const servicesMasterData = {
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
                    fieldType: "string",
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