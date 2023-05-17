import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../Redux/Actions/Dashboard/userActions';
const User = ({ users, selectedUser }) => {
    const [role, setRole] = useState([]);
    // console.log(role)
    // console.log(selectedUser)

    const handleChange = (e) => {
        let data = [...role];
        if (e.target.checked) {
            data.push(e.target.value);
        } else {
            data = data.filter((item) => item !== e.target.value);
        }
        setRole(data);
    };
    useEffect(() => {
        getUser(selectedUser);
    }, [selectedUser]);
    return (
        <div className="p-4 grid grid-cols-2 gap-4 w-[500px]">
            <div>
                {users
                    .filter((user) => user._id === selectedUser)
                    .map((user, index) => {
                        return (
                            <div key={index}>
                                <p className="text-xl first-letter:capitalize">
                                    {' '}
                                    {user.name}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Email:&nbsp;
                                    </span>
                                    {user.email}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Roles:&nbsp;
                                    </span>
                                    {user.role.join(', ')}
                                </p>
                                {/* <div>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    value="admin"
                                                    color="primary"
                                                />
                                            }
                                            label="Admin"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    value="editor"
                                                    color="primary"
                                                />
                                            }
                                            label="Editor"
                                        />
                                    </FormGroup>
                                </div> */}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default User;
