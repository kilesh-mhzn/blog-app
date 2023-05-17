import React, { useState, createContext, useContext } from 'react';

const StateContext = createContext();
const initialState = {
    Notification: {
        show: false,
        message: '',
    },
    userProfile: {
        user: {},
        isAuthenticated: false,
        isLoading: false,
        error: null,
    },
};

export const ContextProvider = ({ children }) => {
    const [activeMenu, setactiveMenu] = useState(true);
    return (
        <StateContext.Provider value={{ activeMenu }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
