import { Avatar } from '@material-ui/core';
import React from 'react';

import { IUser } from '../../stores/models';

interface IProps {
    user?: IUser;
    className?: string | undefined;
}

export const UserAvatar: React.FC<IProps> = ({ user, className }) => {
    return (
        <Avatar className={className} alt={`${user?.firstName} ${user?.lastName}`}>
            {user?.firstName.toUpperCase().substr(0, 1)}
        </Avatar>
    );
};
