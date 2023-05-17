import { TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

export const Input = ({
    half,
    name,
    label,
    handleChange,
    type,
    errorMsg,
    value,
}) => {
    const [error, setError] = useState(false);
    useEffect(() => {
        if (errorMsg) {
            setError(true);
        } else {
            setError(false);
        }
    }, [errorMsg]);
    return (
        <div className={half ? 'col-span-1' : 'col-span-2'}>
            <TextField
                name={name}
                label={label}
                variant="outlined"
                onChange={handleChange}
                fullWidth
                type={type}
                error={error}
                value={value}
            />
            {error && <span className="text-red-500">{errorMsg}</span>}
        </div>
    );
};
export const MultiLineInput = ({
    half,
    name,
    label,
    handleChange,
    type,
    errorMsg,
    value,
}) => {
    const [error, setError] = useState(false);
    useEffect(() => {
        if (errorMsg) {
            setError(true);
        } else {
            setError(false);
        }
    }, [errorMsg]);
    return (
        <div className={half ? 'col-span-1' : 'col-span-2'}>
            <TextField
                name={name}
                label={label}
                variant="outlined"
                onChange={handleChange}
                fullWidth
                type={type}
                multiline
                maxRows={6}
                error={error}
                value={value}
            />
            {error && <span className="text-red-500">{errorMsg}</span>}
        </div>
    );
};

export const MultipleInput = ({
    half,
    name,
    label,
    handleChange,
    type,
    errorMsg,
}) => {
    const [error, setError] = useState(false);
    useEffect(() => {
        if (errorMsg) {
            setError(true);
        } else {
            setError(false);
        }
    }, [errorMsg]);
    return (
        <div className={half ? 'col-span-1' : 'col-span-2'}>
            <TextField
                name={name}
                label={label}
                variant="outlined"
                onChange={handleChange}
                fullWidth
                type={type}
                error={error}
            />
            {error && <span className="text-red-500">{errorMsg}</span>}
        </div>
    );
};
