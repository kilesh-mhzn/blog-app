import React from 'react';
import { Button } from '@material-ui/core';
import { IoTrashOutline } from 'react-icons/io5';
import { TextEllipsis } from '../../Utils/textControl';
export const projectConstants = (handleView, handleDelete) => {
    return [
        {
            title: 'Name',
            render: (rowData) => {
                return <span>{rowData.name}</span>;
            },
        },
        {
            title: 'Description',
            render: (rowData) => {
                return (
                    <span>
                        <TextEllipsis>{rowData.description}</TextEllipsis>
                    </span>
                );
            },
        },
        {
            title: 'Status',
            render: (rowData) => {
                return (
                    <span
                        title={rowData.status}
                        className={` ${
                            rowData.status === 'Completed'
                                ? '!bg-green-400'
                                : rowData.status === 'In Progress' &&
                                  '!bg-blue-500'
                        } text-white rounded p-2 bg-slate-400`}
                    >
                        {rowData.status}
                    </span>
                );
            },
        },

        {
            title: 'Action',
            render: (rowData) => {
                return (
                    <div className="space-x-4">
                        <Button
                            onClick={() => handleView(rowData.id)}
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            View
                        </Button>
                        <button
                            title="Delete"
                            onClick={() => handleDelete(rowData.id)}
                        >
                            <IoTrashOutline size={20} color="red" />
                        </button>
                    </div>
                );
            },
        },
    ];
};
