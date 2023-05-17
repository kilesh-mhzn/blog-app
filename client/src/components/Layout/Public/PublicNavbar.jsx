import { Link } from 'react-router-dom';
import {
    Avatar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Select,
    Tooltip,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import decode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../../constants/actionTypes';

const PublicNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state?.auth?.authData);
    const user = userData?.result;
    const logout = () => {
        dispatch({ type: ActionTypes.LOGOUT });
        navigate('/');
    };

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    }, [location]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="p-4 flex justify-between items-center shadow mb-4 bg-white">
                <div className="font-semibold first-letter:font-bold first-letter:text-2xl">
                    MEDIUM
                </div>
                <div>
                    <Link to="/">
                        <span>Home</span>
                    </Link>
                </div>
                <div>
                    {user ? (
                        <div className="flex gap-x-4">
                            <Tooltip title="Setting">
                                <IconButton
                                    id="profile"
                                    onClick={handleClick}
                                    aria-controls={
                                        open ? 'account-menu' : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    size={'small'}
                                    sx={{ ml: 2 }}
                                >
                                    <Avatar
                                        className="capitalize"
                                        alt={user.name}
                                        sx={{ width: 32, height: 32 }}
                                    >
                                        {user?.name.charAt(0)}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                            >
                                <MenuItem onClick={logout}>Logout</MenuItem>
                                <MenuItem
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Dashboard
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Button onClick={() => navigate('/auth')}>Login</Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default PublicNavbar;
