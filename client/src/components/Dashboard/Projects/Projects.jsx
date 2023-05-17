import React, { useState } from 'react';
import TableSecond from '../../Common/Table/TableSecond';
import { Button, Drawer } from '@material-ui/core';
import ProjectForm from '../../forms/projectForm';
import { Helmet } from 'react-helmet';
import { useQuery, useMutation } from '@apollo/client';
import { projectConstants } from './projectConstants';
import { GET_PROJECTS } from '../../../query/projectQueries';
import {
    ADD_PROJECT,
    DELETE_PROJECT,
} from '../../../mutations/projectMutaions';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    const [addProject] = useMutation(ADD_PROJECT);
    const [deleteProject] = useMutation(DELETE_PROJECT);

    const navigate = useNavigate();

    const [drawer, setDrawer] = useState(false);
    const openDrawer = () => setDrawer(true);

    const initialFormState = {
        name: '',
        description: '',
        status: 'new',
        clientId: '',
    };

    const [project, setProject] = useState(initialFormState);
    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        addProject({
            variables: { ...project },
            update(cache, { data: { addProject } }) {
                const { projects } = cache.readQuery({ query: GET_PROJECTS });
                cache.writeQuery({
                    query: GET_PROJECTS,
                    data: { projects: [...projects, addProject] },
                });
            },
        });
        setProject(initialFormState);
        setDrawer(false);
    };

    const handleView = (id) => {
        navigate(`/dashboard/projects/${id}`);
    };

    const handleDelete = (id) => {
        window.confirm('Are you sure you want to delete this project?');
        if (window.confirm) {
            deleteProject({
                variables: { id },
                update(cache, { data: { deleteProject } }) {
                    const { projects } = cache.readQuery({
                        query: GET_PROJECTS,
                    });
                    cache.writeQuery({
                        query: GET_PROJECTS,
                        data: {
                            projects: [
                                ...projects.filter(
                                    (project) => project.id !== id
                                ),
                            ],
                        },
                    });
                },
            });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Helmet>
                <title>Projects</title>
            </Helmet>

            <div className="p-4 bg-white m-4 space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Projects
                    </h1>
                    <Button variant="outlined" onClick={openDrawer}>
                        + Add Project
                    </Button>
                </div>
                {!loading && !error && (
                    <TableSecond
                        cols={projectConstants(handleView, handleDelete)}
                        data={data?.projects}
                        loading={loading}
                    />
                )}
            </div>
            <Drawer
                anchor="right"
                open={drawer}
                onClose={() => setDrawer(false)}
            >
                <ProjectForm
                    // errore={errorMsg}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </Drawer>
        </>
    );
};

export default Projects;
