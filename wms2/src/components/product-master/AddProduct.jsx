"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModules } from "@/features/dashboard/dashboardSlice";
import "@/styles/Dashboard.module.scss";

export const AddProduct = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const modules = useSelector((state) => state.dashboard?.modules);
    const isLoading = useSelector((state) => state.dashboard?.isLoading);

    return (
        <div>
            <h1>Dashboard</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <h1>Add product</h1>
            )}
        </div>
    );
};

export default AddProduct;
