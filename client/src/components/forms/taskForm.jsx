import React from 'react';
import { Button } from '@material-ui/core';
import { Input, MultiLineInput } from '../Utils/Input';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../../query/clientQueries';

const TaskForm = ({ handleSubmit, handleChange, task }) => {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className="min-w-[350px] p-4 space-y-4">
                {task ? <div>Edit Project</div> : <div>Add new Project</div>}
                <form
                    onSubmit={handleSubmit}
                    className=" grid grid-cols-2 gap-4 w-[500px]"
                >
                    <Input
                        label="Title"
                        name="title"
                        type="text"
                        handleChange={handleChange}
                        value={task?.title}
                    />
                    <MultiLineInput
                        label="Summary"
                        name="summary"
                        type="text"
                        handleChange={handleChange}
                        value={task?.summary}
                    />

                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        onChange={handleChange}
                        value={task?.status}
                    >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
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
export default TaskForm;
