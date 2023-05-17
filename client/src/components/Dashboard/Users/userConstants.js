import React from 'react';
import { FiEdit } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
// This is the table constant/settings which needed to render table elements
export const userConstants = (handleEdit) => {
    return [
        {
            title: 'Name',
            render: rowData => {
                return <span>{rowData.name}</span>;
            },
        },
        {
            title: 'Email',
            render: rowData => {
                return <span>{rowData.email}</span>;
            },
        },
        {
            title: 'Role',
            render: rowData => {
                return <span className="rounded bg-gray-200 text-slate-900 p-1">{rowData.role}</span>;
            },
        },
        {
            title: 'Action',
            render: rowData => {
                return <button className='btn btn-warning' onClick={handleEdit(rowData)}><FiEdit /></button>
            },
        },
    ];
};