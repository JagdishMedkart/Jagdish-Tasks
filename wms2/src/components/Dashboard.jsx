"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModules } from "@/features/dashboard/dashboardSlice";
import "@/styles/Dashboard.module.scss";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const modules = useSelector((state) => state.dashboard?.modules);
    const isLoading = useSelector((state) => state.dashboard?.isLoading);

    console.log("Dashboard Render - State:", {
        token,
        modules,
        isLoading,
        modulesLength: modules?.length,
    });

    useEffect(() => {
        if (token) {
            console.log("Dispatching fetchModules with token:", token);
            dispatch(fetchModules(token));
        }
    }, [token, dispatch]);

    useEffect(() => {

    }, [isLoading]);

    return (
        <div>
            <h1>Dashboard</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {modules?.length > 0 ? (
                        modules.map((module) => (
                            <li key={module.name}>{module.name}</li>
                        ))
                    ) : (
                        <p>No modules available</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
