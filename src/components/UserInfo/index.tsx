import { Box, Button, Divider, makeStyles, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { UserStore } from '../../stores/userStore';
import { UserAvatar } from '../Avatar';
import { SberCoin } from '../SberCoin';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: '#E3F7ED',
        borderRadius: 8,
    },
    userBlock: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 16,
    },
    avatar: {
        height: 64,
        width: 64,
        fontSize: 28,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#828F9C',
        marginRight: 4,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#333333',
        borderRadius: 48,
        padding: '8px 25px',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
        textTransform: 'none',

        '&:hover': {
            backgroundColor: '#444444',
        }
    }
}));

interface IProps {
    userStore?: UserStore;
}

export const UserInfo: React.FC<IProps> = inject('userStore')(observer(({ userStore }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Box className={classes.root}>
            <Box className={classes.userBlock}>
                <UserAvatar className={classes.avatar} user={userStore?.currentUser} />
                <Typography className={classes.userName}>{`${userStore?.currentUser?.lastName} ${userStore?.currentUser?.firstName}`}</Typography>
            </Box>
            <Box marginTop={'24px'}>
                <Divider />
            </Box>
            <Box marginTop={'24px'} justifyContent='start' display='flex'>
                <Typography className={classes.text}>GreenPoints:</Typography>
                <SberCoin amount={String(userStore.currentUser.points || 0)} />
            </Box>
            <Box marginTop={'24px'} justifyContent='start' display='flex'>
                <Typography className={classes.text}>Рейтинг автора:</Typography>
                <Typography className={classes.boldText}>3 из 45</Typography>
            </Box>
            <Box marginTop={'44px'} justifyContent='center' display='flex'>
                <Button className={classes.button} onClick={() => history.push('create/channel')}>Создать канал</Button>
            </Box>
        </Box>
    );
}));
