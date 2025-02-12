"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/Navbar.module.scss"
import { ProfileDropdown } from "./ProfileDropdown";

const Navbar = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.innerDiv}>

                    <div className={styles.brand}>
                        <Image alt="logo" src="/image2.png" width={130} height={28} />
                    </div>

                    <div className={styles.rightDiv}>
                        <ul className={styles.navLinks}>
                            <li className={styles.li}>
                                <Link href="/">Home</Link>
                            </li>
                        </ul>
                        <div>
                            {isLogin ? (
                                <ProfileDropdown />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => router.push("/login")}
                                    className={styles.loginBtn}
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;