import React from 'react';
import { Button } from '@material-ui/core';
import { Input, MultiLineInput } from '../Utils/Input';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../../query/clientQueries';

const ProjectForm = ({ handleSubmit, errors, handleChange }) => {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className="min-w-[350px] p-4 space-y-4">
                <div>Add new Project</div>
                <form
                    onSubmit={handleSubmit}
                    className=" grid grid-cols-2 gap-4 w-[500px]"
                >
                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        handleChange={handleChange}
                        errorMsg={errors?.name}
                    />
                    <MultiLineInput
                        label="Description"
                        name="description"
                        type="text"
                        handleChange={handleChange}
                    />

                    <label htmlFor="status">Status</label>

                    <select id="status" name="status" onChange={handleChange}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <label htmlFor="clientId">Client</label>

                    <select
                        id="clientId"
                        name="clientId"
                        onChange={handleChange}
                    >
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>

                    <div className="col-span-2">
                        <Button
                            variant={'contained'}
                            type={'submit'}
                            color={'primary'}
                            fullWidth
                            size={'large'}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default ProjectForm;
