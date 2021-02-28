import { CircularProgress } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom';

import { UserStore } from '../../stores/userStore';

export const PrivateRoute: React.FC<RouteProps & { userStore?: UserStore }> = inject('userStore')(observer(({ userStore, children, ...rest }) => {
    const history = useHistory();
    
    useEffect(() => {
        if (!userStore?.currentUser) {
            userStore?.getUserInfo();
        }
    }, []);

    useEffect(() => {
        if (userStore.responceCode === 401) {
            history.push('/login');
        }
    }, [userStore.responceCode]);

    let content;

    if (userStore?.loadingUser || !userStore.responceCode) {
        content = <CircularProgress color="primary" />;
    } else if (userStore?.currentUser && userStore.responceCode === 200) {
        content = children;
    } else {
        content = <Redirect
            to={{
                pathname: "/login",
            }}
        />;
    }

    return (
        <Route
            {...rest}
        >
            {content}
        </Route>
    );
}));
