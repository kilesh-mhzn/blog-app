import React from 'react';
import { IoTrashOutline } from 'react-icons/io5';
export const clientConstants = (handleDelete) => {
    return [
        {
            title: 'Name',
            render: (rowData) => {
                return <span>{rowData.name}</span>;
            },
        },
        {
            title: 'Email',
            render: (rowData) => {
                return <span>{rowData.email}</span>;
            },
        },
        {
            title: 'Phone',
            render: (rowData) => {
                return <span>{rowData.phone}</span>;
            },
        },
        {
            title: 'Action',
            render: (rowData) => {
                return (
                    <div className="space-x-4">
                        <button onClick={() => handleDelete(rowData.id)}>
                            <IoTrashOutline size={20} color="red" />
                        </button>
                    </div>
                );
            },
        },
    ];
};
