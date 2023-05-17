import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import TableSecond from '../Common/Table/TableSecond';
import { clientConstants } from './clientConstants';
import { GET_CLIENTS } from '../../query/clientQueries';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT, ADD_CLIENT } from '../../mutations/clientMutations';
import { Button, Drawer } from '@material-ui/core';
import ClientForm from '../forms/clientForm';

const Home = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    const [deleteClient] = useMutation(DELETE_CLIENT);
    const [addClient] = useMutation(ADD_CLIENT);

    const [drawer, setDrawer] = useState(false);
    const openDrawer = () => setDrawer(true);

    const initialFormState = {
        name: '',
        phone: '',
        email: '',
    };

    const [client, setClient] = useState(initialFormState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const [errorMsg, setErrorMsg] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        addClient({
            variables: { ...client },
            update(cache, { data: { addClient } }) {
                const { clients } = cache.readQuery({ query: GET_CLIENTS });
                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: { clients: [...clients, addClient] },
                });
            },
        });
        setClient(initialFormState);
        setDrawer(false);
    };

    const handleDelete = (id) => {
        window.confirm('Are you sure you want to delete this client?');
        if (window.confirm) {
            deleteClient({
                variables: { id },
                update(cache, { data: { deleteClient } }) {
                    const { clients } = cache.readQuery({ query: GET_CLIENTS });
                    cache.writeQuery({
                        query: GET_CLIENTS,
                        data: {
                            clients: clients.filter(
                                (client) => client.id !== deleteClient.id
                            ),
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
                <title>Clients</title>
            </Helmet>
            <div className="p-4 bg-white m-4 space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Clients
                    </h1>
                    <Button variant="outlined" onClick={openDrawer}>
                        + Add Client
                    </Button>
                </div>

                {/* <div className="p-4">
                <div className="flex justify-between items-center">
                    <h1>Clients</h1>
                    <Button onClick={openDrawer}>Add</Button>
                </div> */}
                {!loading && !error && (
                    <TableSecond
                        cols={clientConstants(handleDelete)}
                        data={data?.clients}
                        loading={loading}
                    />
                )}
            </div>
            <Drawer
                anchor="right"
                open={drawer}
                onClose={() => setDrawer(false)}
            >
                <ClientForm
                    errore={errorMsg}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </Drawer>
        </>
    );
};

export default Home;
