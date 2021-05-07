import React from 'react';
import { UserProps } from 'screens/ProjectList';
import IdSelector from './IdSelector';

interface UserSelectProps extends React.ComponentProps<typeof IdSelector> {
    users: UserProps[];
}

const UserSelect: React.FC<UserSelectProps> = (props) => {
    const { users, ...restProps } = props
    return (
        <IdSelector
            options={users}
            {...restProps}
        ></IdSelector>
    )
}

export default UserSelect