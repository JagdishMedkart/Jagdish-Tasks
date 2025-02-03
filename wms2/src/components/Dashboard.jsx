"use client";
import React from "react";
import styles from "../styles/Dashboard.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setTabs } from "@/features/dashboard/dashboardSlice";
import { useEffect } from "react";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        dispatch(setTabs(token));
    }, [dispatch]);

    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
}