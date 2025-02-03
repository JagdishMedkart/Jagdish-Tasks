import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import styles from "../styles/ProfileDropdown.module.scss"


export const ProfileDropdown = () => {
    const name = useSelector((state) => state.auth.name);
    const email = useSelector((state) => state.auth.email);
    let [fname, lname] = name.split(" ");
    console.log(fname);
    console.log(lname);
    const fChar = fname?.length && fname[0];
    const lChar = lname?.length && lname[0];
    console.log(fChar);
    console.log(lChar);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        console.log("isopen = ", isOpen);
        setIsOpen(!isOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    useEffect(() => {

    }, []);

    return (
        <div className={styles.mainDiv}>
            <button className={styles.profileBtn}
                onClick={toggleDropdown}>
                <div className={styles.profile}>
                <span className={styles.span2}>{fChar}</span>
                <span className={styles.span2}>{lChar}</span>
                </div>
            </button>


            {isOpen &&
                (<div className={styles.openDiv}>
                    <div className={styles.contentDiv}>
                        <div className={styles.pic}>
                            <span className={styles.span}>{fChar}</span>
                            <span className={styles.span}>{lChar}</span>
                        </div>
                        <p className={styles.p}>{name}</p>
                        <p className={styles.pEmail}>{email}</p>
                        <button className={styles.logout}
                            onClick={() => {
                                handleLogout();
                            }}
                        >Logout</button>
                    </div>
                </div>)
            }
        </div>
    );
}
