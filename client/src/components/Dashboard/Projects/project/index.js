import React, { useState, useEffect } from 'react';
import Project from './Project';
import { GET_PROJECT } from '../../../../query/projectQueries';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Kanban from '../../kanban';
import { Button, Drawer } from '@material-ui/core';
import TaskForm from '../../../forms/taskForm';
import { ADD_TASK } from '../../../../mutations/projectMutaions';
import KanbanBoard from '../../../KanbanBoard';

const ProjectView = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id },
    });

    const [addTask] = useMutation(ADD_TASK);

    const [drawer, setDrawer] = useState(false);
    const openDrawer = () => setDrawer(true);

    const initialFormState = {
        title: '',
        summary: '',
        status: 'new',
        projectId: id,
    };

    const [task, setTask] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({
            variables: { ...task },
            update(cache, { data: { addTask } }) {
                const { project } = cache.readQuery({
                    query: GET_PROJECT,
                    variables: { id },
                });
                cache.writeQuery({
                    query: GET_PROJECT,
                    variables: { id },
                    data: {
                        project: {
                            ...project,
                            tasks: [...project.tasks, addTask],
                        },
                    },
                });
            },
        });
        setTask(initialFormState);
        setDrawer(false);
    };

    const headers = [
        { headerText: 'To Do', keyField: 'Not Started' },
        {
            headerText: 'In Progress',
            keyField: 'In Progress',
        },
        { headerText: 'Completed', keyField: 'Completed' },
    ];

    const handledoubleClick = (item) => {
        console.log(item);
        setDrawer(true);
        setTask({
            ...task,
            title: item.title,
            summary: item.summary,
            status: item.status,
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className="m-4 bg-white ">
                <Project data={data.project} />
                <div className="m-4 flex justify-end">
                    <Button variant="outlined" onClick={openDrawer}>
                        + Add Task
                    </Button>
                </div>
                 <Kanban data={data.project.tasks} />
                {/* <Kanban data={kanbanData} /> */}

                {/*<KanbanBoard*/}
                {/*    doubleClick={handledoubleClick}*/}
                {/*    kanbanData={data.project.tasks}*/}
                {/*    headers={headers}*/}
                {/*/>*/}
            </div>
            <Drawer
                anchor="right"
                open={drawer}
                onClose={() => {
                    setDrawer(false);
                    setTask(initialFormState);
                }}
            >
                <TaskForm
                    task={task}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </Drawer>
        </>
    );
};

export default ProjectView;
