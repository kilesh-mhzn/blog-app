import React, {useEffect, useState} from "react"
import {Helmet} from "react-helmet"
import { IoEllipse } from "react-icons/io5";
import TableWrapper from "../../Common/Table/TableWrapper";
import {useDispatch, useSelector} from "react-redux";
import {ActionTypes} from "../../../constants/actionTypes";
import {getUser, getUsers} from "../../../Redux/Actions/Dashboard/userActions";
import {Button, Drawer} from "@material-ui/core";
import User from "./User";
import TableSecond from "../../Common/Table/TableSecond";
import { userConstants } from './userConstants';

const Users = () => {

    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const handleEdit = (item) => () => {
        getUser(item.id)
        openDrawer(item._id)
    }
    const userData = useSelector(state => state?.user);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(()=>{
        dispatch(getUsers(page))
    },[page])
    //
    const[drawer, setDrawer] = useState(false)
    const openDrawer = (id) => {
        setDrawer(true)
        setSelectedUser(id)

    }

    return(
        <>
            <Helmet>
                <title>Users</title>
            </Helmet>
            <div className="m-4">
                <TableSecond cols={userConstants(handleEdit)} data={userData.result} page={page} changePage={setPage} pages={userData.pages} />
            </div>
                    <Drawer
                        anchor="right"
                        open={drawer}
                        onClose={() => setDrawer(false)}
                    >
                        <User users= {userData.result} selectedUser = {selectedUser} />
                    </Drawer>

        </>
    )


}

export default Users
