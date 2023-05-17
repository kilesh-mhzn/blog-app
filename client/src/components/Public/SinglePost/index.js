import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { IoArrowBack } from 'react-icons/io5';
import { Avatar } from '@material-ui/core';

const SinglePost = () => {
    const post = useSelector((state) => state?.publicPost.post);
    const navigate = useNavigate();
    return (
        <>
            <div className=" container space-y-4 mb-4">
                <div className="card p-4 flex items-center">
                    <button
                        className=" hover:bg-gray-200 rounded-full p-2"
                        onClick={() => navigate(-1)}
                    >
                        <IoArrowBack />
                    </button>
                </div>
                <div className="card p-6 space-y-4">
                    <div>
                        <div className="flex items-center space-x-2">
                            <Avatar
                                className="capitalize"
                                alt={post?.creator}
                                sx={{ width: 32, height: 32 }}
                            >
                                {post?.creator?.charAt(0)}
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-slate-900 text-lg">
                                    {post?.creator}
                                </span>
                                <span className="mb-4 text-sm">
                                    <span>
                                        {moment(post?.createdAt).fromNow()}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <h1 className="text-slate-900 text-4xl uppercase ">
                            {post?.title}
                        </h1>
                        <div className="flex gap-2 flex-wrap">
                            {post?.tags &&
                                post?.tags.map((tag, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className="cursor-pointer text-sm font-semibold text-blue-500"
                                        >
                                            #{tag}
                                        </span>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="overflow-hidden  bg-gradient-to-r from-sky-500 to-indigo-500">
                        <img
                            src={post?.selectedFile}
                            alt=""
                            className="object-cover h-96 w-full"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 text-lg">{post?.content}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SinglePost;
