import React from "react";
import styles from "../../styles/AddProduct.module.scss";

export const CommonForm = (field, masterData, handleChange) => {

    console.log("field key = ", masterData[field.key]);

    switch (field.fieldType) {
        case "input":
            return (
                    <input 
                        className={styles.input}
                        type={field.inputType}
                        value={}
                        onChange={(e) => handleChange(e, field)}
                        disabled={`${field?.disabled === true ? true : ""}`}
                        placeholder={`${field?.placeholder ? field.placeholder : ""}`}
                        required={`${field?.required === true ? true : ""}`}
                    />
            )
        case "dropdown":
            return (
                    <select
                        className={styles.select}
                        disabled={`${field?.disabled === true ? true : ""}`}
                        required={`${field?.required === true ? true : ""}`}
                        onChange={(e) => handleChange(e, field)}
                    >
                        <option></option>
                        {
                            (masterData[field?.key] ? masterData[field?.key] : field?.values)?.map((item, ind) => (
                                <option key={ind} value={`${item}`}>{`${item}`}</option>
                            ))
                        }
                    </select>
            )
        default:
            return null;
    }
}