"use client";
import React, { useState } from "react";
import styles from "../styles/Auth.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
    setEmail,
    setPassword,
    loginRequest,
    setShowPassword,
} from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export const Auth = () => {
    const dispatch = useDispatch();
    const { email, password, showPassword, isLoading, error, token } =
        useSelector((state) => state.auth);
    const router = useRouter();

    // Local state for form validation errors
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const validateForm = () => {
        let errors = {
            email: "",
            password: "",
        };

        let isValid = true;

        if (!email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        }

        if (!password.trim()) {
            errors.password = "Password is required";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        // Validate form before submission
        if (validateForm()) {
            dispatch(loginRequest({ email, password }));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    React.useEffect(() => {
        if (token !== "") {
            router.push("/dashboard");
        }
    }, [token]);

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.innerDiv}>
                    <Image
                        src="/image.png"
                        width={175}
                        height={42}
                        alt={"medkart image"}
                    />
                    <p className={styles.p}>Login to WMS</p>
                    <div className={styles.contentDiv}>
                        <div className={styles.inputContainer}>
                            <div className={styles.inputDiv}>
                                <Image
                                    alt="envelop"
                                    src="/envelop.png"
                                    width={19}
                                    height={19}
                                />
                                <input
                                    className={styles.input}
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => {
                                        dispatch(setEmail(e.target.value));
                                        // Clear email error when user starts typing
                                        setFormErrors((prev) => ({
                                            ...prev,
                                            email: "",
                                        }));
                                    }}
                                    onKeyDown={handleKeyPress}
                                />
                            </div>
                        </div>
                        {formErrors.email && (
                            <p className={styles.errorText}>
                                {formErrors.email}
                            </p>
                        )}
                        <div className={styles.inputContainer}>
                            <div className={styles.inputDiv}>
                                <Image
                                    alt="lock"
                                    src={"/lock.png"}
                                    width={19}
                                    height={19}
                                />
                                <input
                                    className={styles.input}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => {
                                        dispatch(setPassword(e.target.value));
                                        // Clear password error when user starts typing
                                        setFormErrors((prev) => ({
                                            ...prev,
                                            password: "",
                                        }));
                                    }}
                                    onKeyDown={handleKeyPress}
                                />
                                <div
                                    className={styles.passwordEye}
                                    onClick={() => {
                                        dispatch(setShowPassword());
                                    }}
                                >
                                    <Image
                                        alt="lock"
                                        src={
                                            showPassword
                                                ? "/eyeClose.png"
                                                : "/eye.png"
                                        }
                                        width={13}
                                        height={13}
                                    />
                                </div>
                            </div>
                        </div>
                        {formErrors.password && (
                            <p className={styles.errorText}>
                                {formErrors.password}
                            </p>
                        )}
                        <button className={styles.btn} onClick={handleSubmit}>
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                        <div className={styles.forgotPassowrd}>
                            <a className={styles.a} href="/login">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;
