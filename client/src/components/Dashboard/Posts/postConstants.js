import React from 'react';
import { FiEdit } from 'react-icons/fi';
import moment from 'moment';
import { TextEllipsis, TagsControl } from '../../Utils/textControl';

export const postConstants = (handleEdit, handleView) => {
    return [
        {
            title: 'Title',
            render: (rowData) => {
                return <span>{rowData.title}</span>;
            },
        },
        {
            title: 'Content',
            render: (rowData) => {
                return (
                    <span>
                        <TextEllipsis>{rowData.content}</TextEllipsis>
                    </span>
                );
            },
        },
        {
            title: 'Tags',
            render: (rowData) => {
                return (
                    <span className={'space-x-2'}>
                        <TagsControl>{rowData.tags}</TagsControl>
                    </span>
                );
            },
        },
        {
            title: 'Created At',
            render: (rowData) => {
                return <span>{moment(rowData.createdAt).fromNow()}</span>;
            },
        },
        {
            title: 'Action',
            render: (rowData) => {
                return (
                    <div className="space-x-4">
                        {/* <button onClick={handleEdit(rowData)}><FiEdit /></button> */}
                        <button onClick={handleView(rowData._id)}>
                            <FiEdit />
                        </button>
                    </div>
                );
            },
        },
    ];
};
