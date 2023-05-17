import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Project = ({ data }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-white rounded p-4">
                <div
                    className="cursor-pointer text-indigo-700 font-semibold"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </div>
                <h2 className="md:text-lg font-bold">{data.name}</h2>
                <p className="text-gray-600">{data.description}</p>
            </div>
        </>
    );
};

export default Project;
