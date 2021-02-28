import { Box, Button, Divider, makeStyles, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { IChannel } from '../../stores/models';

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
        fontSize: 16,
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
    },
    secondBtn: {
        backgroundColor: '#ffffff',
        borderRadius: 48,
        padding: '8px 25px',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333333',
        textTransform: 'none',

        '&:hover': {
            backgroundColor: '#fafafa',
        }
    }
}));

interface IProps {
    channel?: IChannel;
}

export const ChannelInfo: React.FC<IProps> = ({ channel }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Box className={classes.root}>
            <Box className={classes.userBlock}>
                <UserAvatar className={classes.avatar} />
                <Typography className={classes.userName}>{channel?.title}</Typography>
            </Box>
            <Box marginTop={'24px'}>
                <Divider />
            </Box>
            <Box marginTop={'24px'} justifyContent='start' display='flex'>
                <Typography className={classes.text}>{channel?.description}</Typography>
            </Box>
            <Box marginTop={'44px'} justifyContent='space-between' display='flex'>
                <Button className={classes.secondBtn} onClick={() => {}}>Редактировать</Button>
                <Button className={classes.button} onClick={() => history.push(`/channel/${channel.id}/create`)}>Создать пост</Button>
            </Box>
        </Box>
    );
};
