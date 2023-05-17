import React from "react"
import PublicNavbar from "./Public/PublicNavbar";
import {Outlet} from "react-router-dom";

const PublicLayout = () => {
    return(
        <>
            <PublicNavbar/>
            <Outlet/>
        </>
    )
}

export default PublicLayout
