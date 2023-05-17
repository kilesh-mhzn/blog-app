import React, {lazy, useState} from "react"
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
const DashboardNavbar = lazy(()=>import('./Dashboard/DashboardNavbar'))
const DashboardSidebar = lazy(()=>import('./Dashboard/DashboardSidebar'))

const DashboardLayout = () => {
    // const [user, setUser] =useState(JSON.parse(localStorage.getItem("profile")))
    const user = useSelector(state=>state?.auth.authData.result)
    const navigate = useNavigate()

    const [sidebar, setSidebar] = useState(true);
    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };
    return(
        <>
            <div className="flex">
                <DashboardSidebar
                    sidebar = {sidebar}
                    toggleSidebar = {toggleSidebar}
                />
                <div className="flex-1 h-screen">
                    <DashboardNavbar
                        user = {user}
                        navigate = {navigate}
                        sidebar = {sidebar}
                        toggleSidebar = {toggleSidebar}
                    />
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default DashboardLayout
