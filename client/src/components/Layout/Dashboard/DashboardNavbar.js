import {Avatar, Button} from "@material-ui/core";
import { IoMenu } from "react-icons/io5";
import {ActionTypes} from "../../../constants/actionTypes";
import {useDispatch} from "react-redux";

const DashboardNavbar = ({ navigate, toggleSidebar, user}) => {
    const dispatch = useDispatch();
    const logout = () =>{
        dispatch({type:ActionTypes.LOGOUT})
        navigate('/')
    }

    return(
        <>
            <div className="bg-white p-4 flex justify-between items-center shadow mb-4 w-full">
                <div>
                    <IoMenu size = "30" onClick={toggleSidebar} cursor="pointer"/>
                </div>

                <div>
                    {user?
                        <div className="flex gap-x-4">
                            <Avatar
                                className="capitalize"
                                alt={user.name}
                                sx={{ width: 32, height: 32 }}
                            >
                                {user?.name.charAt(0)}
                            </Avatar>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={()=> {
                                    logout()
                                }}>Logout</Button>


                        </div>
                        :
                        <Button onClick={()=>navigate('/auth')}>Login</Button>
                    }
                </div>
            </div>
        </>
    )
}

export default DashboardNavbar