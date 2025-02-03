"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../styles/Header.module.scss";

const Header = () => {
    const { modules, isLoading } = useSelector((state) => state.dashboard);
    const router = useRouter();
    const [openModule, setOpenModule] = useState(null);

    const handleModuleToggle = (moduleName) => {
        setOpenModule(openModule === moduleName ? null : moduleName);
    };

    const handleNavigation = (module, submodule) => {
        router.push(`/${submodule}-${module}`);
        setOpenModule(null); // Close dropdown after navigation
    };

    if (isLoading) return (
        <div className={styles.header}>
            <div className={styles.headerContainer}>
                <p>Loading modules...</p>
            </div>
        </div>
    );

    return (
        <nav className={styles.header}>
            <div className={styles.headerContainer}>
                {modules.map((module) => (
                    <div key={module.name} className={styles.module}>
                        <div 
                            className={`${styles.moduleHeader} ${openModule === module.name ? styles.active : ''}`}
                            onClick={() => handleModuleToggle(module.name)}
                        >
                            <Image 
                                src={module.image} 
                                alt={module.name} 
                                width={30} 
                                height={30} 
                                style={{ objectFit: 'contain' }}
                            />
                            <span>{module.name}</span>
                        </div>
                        {module.submodules.length > 0 && openModule === module.name && (
                            <div className={styles.dropdown}>
                                {module.submodules.map((submodule) => (
                                    <button 
                                        key={submodule} 
                                        className={styles.dropdownItem} 
                                        onClick={() => handleNavigation(module.name, submodule)}
                                    >
                                        {submodule}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Header;