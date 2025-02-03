"use client";
import { useParams } from "next/navigation";

const submodulePage = () => {
    let params = useParams();

    console.log("params = ", params);
    params = Object.values(params);
    console.log("new params = ", params);
    params = params[0].split("-");
    let [submodule, module] = params;

    return (
        <div>
            <h1>Module : {module}</h1>
            <h2>Submodule : {submodule}</h2>
        </div>
    );
};
export default submodulePage;
