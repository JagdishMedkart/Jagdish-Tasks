"use client";
import React, { useEffect } from "react";
import styles from "../styles/Auth.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, loginRequest, setShowPassword } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export const Auth = () => {
    const dispatch = useDispatch();
    const { email, password, showPassword, isLoading, error, token } = useSelector((state) => state.auth);
    const router = useRouter();

    const handleSubmit = (e) => {
        dispatch(loginRequest({ email, password }));
    };

    useEffect(() => {
        if(token !== "") {
            router.push("/dashboard");
        }
    }, [token]);

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.innerDiv}>
                    <Image src="/image.png" width={175} height={42}
                        alt={"medkart image"} />
                    <p className={styles.p}>Login to WMS</p>
                    <div className={styles.contentDiv}>
                        <div className={styles.inputContainer}>
                            <div className={styles.inputDiv}>
                                <Image alt="envelop" src="/envelop.png" width={19} height={19} />
                                <input
                                    className={styles.input}
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => dispatch(setEmail(e.target.value))}
                                //   disabled={otpVisible}
                                //   className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
                                />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.inputDiv}>
                                <Image alt="lock" src={'/lock.png'} width={19} height={19} />
                                <input
                                    className={styles.input}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => dispatch(setPassword(e.target.value))}
                                // className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
                                />
                                <div className={styles.passwordEye}
                                    onClick={() => {
                                        dispatch(setShowPassword())
                                    }}>
                                    <Image alt="lock" src={showPassword ? '/eyeClose.png' : '/eye.png'} width={13} height={13} />
                                </div>
                            </div>
                        </div>
                        <button className={styles.btn}
                        onClick={() => {
                            handleSubmit();
                        }}>{isLoading ? "Logging in..." : "Login"}</button>
                        <div className={styles.forgotPassowrd}>
                            <a className={styles.a} href="/login">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}