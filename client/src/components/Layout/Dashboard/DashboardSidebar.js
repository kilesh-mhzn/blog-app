import React, { useState } from 'react';
import {
    IoPeopleOutline,
    IoHomeOutline,
    IoBookOutline,
    IoChevronDown,
    IoChevronUp,
} from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const DashboardSidebar = ({ sidebar, toggleSidebar }) => {
    const sidebarData = [
        // {
        //     icon: <IoHomeOutline />,
        //     title: 'Clients',
        //     link: '/dashboard/home',
        // },
        // {
        //     icon: <IoBookOutline />,
        //     title: 'Projects',
        //     link: '/dashboard/projects',
        // },
        {
            icon: <IoPeopleOutline />,
            title: 'Users',
            link: '/dashboard/users',
        },
        {
            icon: <IoBookOutline />,
            title: 'Posts',
            link: '/dashboard/posts',
        },
        {
            icon: <IoPeopleOutline />,
            title: 'Project Management',
            children: [
                {
                    icon: <IoBookOutline />,
                    title: 'Projects',
                    link: '/dashboard/projects',
                },
                {
                    icon: <IoBookOutline />,
                    title: 'Clients',
                    link: '/dashboard/home',
                },
            ],
        },
    ];

    const [children, setChildren] = useState(false);
    const setChildrenActive = () => {
        if (!sidebar) toggleSidebar();

        setChildren(!children);
    };
    const sidebarLogo = 'Web-based Project Management';
    const getFirstLetters = (str) => {
        return str
            .split(' ')
            .map((word) => word[0])
            .join('');
    };
    return (
        <>
            <div
                className={
                    sidebar
                        ? 'z-10 shadow px-4 bg-white min-w-[250px]'
                        : 'shadow px-4 bg-white z-10'
                }
            >
                <div className="py-4 text-center truncate ">
                    {sidebar ? sidebarLogo : getFirstLetters(sidebarLogo)}
                </div>
                <div>
                    {sidebarData.map((item, index) => {
                        return (
                            <>
                                {!item.children ? (
                                    <NavLink
                                        key={index}
                                        to={item.link}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'mt-2 flex items-center gap-2  rounded-xl px-4 py-2 bg-gray-200'
                                                : 'mt-2 flex items-center gap-2  rounded-xl px-4 py-2 hover:bg-gray-200'
                                        }
                                    >
                                        <div>{item.icon}</div>
                                        {sidebar && <div>{item.title}</div>}
                                    </NavLink>
                                ) : (
                                    <div>
                                        <div
                                            onClick={setChildrenActive}
                                            className="px-4 py-2 flex justify-between items-baseline gap-2 cursor-pointer  "
                                        >
                                            <div className="mt-2 flex justify-between items-center gap-2 cursor-pointer">
                                                <div>{item.icon}</div>
                                                {sidebar && (
                                                    <div>{item.title}</div>
                                                )}
                                            </div>
                                            {sidebar &&
                                                (children ? (
                                                    <IoChevronUp />
                                                ) : (
                                                    <IoChevronDown />
                                                ))}
                                        </div>
                                        {children &&
                                            item.children.map(
                                                (child, childIdx) => {
                                                    return (
                                                        <NavLink
                                                            key={childIdx}
                                                            to={child.link}
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                isActive
                                                                    ? 'mt-2 ml-6 flex items-center gap-2  rounded-xl px-4 py-2 bg-gray-200'
                                                                    : 'mt-2 ml-6 flex items-center gap-2  rounded-xl px-4 py-2 hover:bg-gray-200'
                                                            }
                                                        >
                                                            <div>
                                                                {child.icon}
                                                            </div>
                                                            {sidebar && (
                                                                <div>
                                                                    {
                                                                        child.title
                                                                    }
                                                                </div>
                                                            )}
                                                        </NavLink>
                                                    );
                                                }
                                            )}
                                    </div>
                                )}
                            </>
                        );
                    })}
                    <NavLink
                        to={'/'}
                        className={({ isActive }) =>
                            isActive
                                ? 'mt-4 flex items-center gap-2  rounded-xl px-4 py-2 bg-gray-200'
                                : 'mt-4 flex items-center gap-2  rounded-xl px-4 py-2 hover:bg-gray-200'
                        }
                    >
                        <div>{<IoHomeOutline />}</div>
                        {sidebar && <div>Go Home</div>}
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default DashboardSidebar;
