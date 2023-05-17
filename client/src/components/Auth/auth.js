import React, { useEffect, useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Input } from '../Utils/Input';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp, login } from '../../Redux/Actions/AuthActions';
import { authValidation } from '../../Validations';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state?.auth);

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const [user, setUser] = useState(initialState);
    const [error, setError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const authError = authValidation(user, isLogin);
        setError(authError);
        if (Object.keys(authError).length === 0) {
            if (isLogin) {
                dispatch(login(user, navigate));
            } else {
                dispatch(signUp(user, navigate));
            }
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        clear();
    };
    const clear = () => {
        setUser(initialState);
        setError({});
    };
    return (
        <>
            <Helmet>
                {isLogin ? <title>Login</title> : <title>Signup</title>}
            </Helmet>
            <div className="flex flex-col justify-center items-center h-screen gap-16">
                <div>
                    <h1 className="text-4xl font-bold text-slate-700">
                        Web-Based Project Management System
                    </h1>
                </div>
                <div className="card w-96 space-y-4 p-4">
                    <p className="text-2xl font-bold text-slate-600 text-center">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                {userData.error ? (
                                    <span className="text-red-600">
                                        {userData.error}
                                    </span>
                                ) : null}
                            </div>
                            {!isLogin && (
                                <>
                                    <Input
                                        name="firstName"
                                        label="First Name"
                                        handleChange={handleChange}
                                        type="text"
                                        half
                                        errorMsg={error?.firstName}
                                    />
                                    <Input
                                        name="lastName"
                                        label="Last Name"
                                        type="text"
                                        handleChange={handleChange}
                                        half
                                        errorMsg={error?.lastName}
                                    />
                                </>
                            )}

                            <Input
                                name="email"
                                label="Email"
                                handleChange={handleChange}
                                type="email"
                                errorMsg={error?.email}
                                value={user.email}
                            />
                            <Input
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                type="password"
                                errorMsg={error?.password}
                                value={user.password}
                            />
                            {!isLogin && (
                                <Input
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    handleChange={handleChange}
                                    type="password"
                                    errorMsg={error?.confirmPassword}
                                />
                            )}
                        </div>
                        <div className="text-center mt-4">
                            {!isLogin ? (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Sign up
                                </Button>
                            ) : (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </form>

                    {!isLogin ? (
                        <div>
                            Already a member?{' '}
                            <span
                                onClick={switchMode}
                                className="hover:text-indigo-700 cursor-pointer"
                            >
                                Login
                            </span>
                        </div>
                    ) : (
                        <div>
                            Not a member?{' '}
                            <span
                                onClick={switchMode}
                                className="hover:text-indigo-700 font-bold cursor-pointer hover:underline underline-offset-4"
                            >
                                Sign Up
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Auth;
