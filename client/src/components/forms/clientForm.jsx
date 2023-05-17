import React from 'react';
import { Button } from '@material-ui/core';
import { Input } from '../Utils/Input';

const ClientForm = ({ handleSubmit, errors, handleChange }) => {
    return (
        <>
            <div className="min-w-[350px] p-4 space-y-4">
                <div>Add new Client</div>
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
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        handleChange={handleChange}
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        type="text"
                        handleChange={handleChange}
                    />
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
export default ClientForm;
