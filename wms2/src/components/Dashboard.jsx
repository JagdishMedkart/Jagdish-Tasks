"use client";
import React from "react";
import styles from "../styles/Dashboard.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, loginRequest, setShowPassword } from "@/features/auth/authSlice";

export const Dashboard = () => {
    const dispatch = useDispatch();
    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
}