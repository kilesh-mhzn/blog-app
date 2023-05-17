import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
// const user = JSON.parse(localStorage.getItem('profile'));


export const PublicRoutes = () =>{
    return(
        <Outlet />
    )
}

export const PrivateRoutes = ({roles}) =>{
    const user = useSelector(state => state?.auth?.authData);
    // const user = JSON.parse(localStorage.getItem('profile'));

    const location = useLocation();
    const userRoles = user?.result?.role
    return(
        userRoles?.find(role=>roles.includes(role))
            ?<Outlet />:user?<Navigate to={"/unauthorized"} state={{from:location}} replace />
            :<Navigate to = "/auth" state={{from:location}} replace  />
    )
}

