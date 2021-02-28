import { Avatar, Box, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ChannelsStore } from '../../stores/channelsStore';
import { channelsFilters } from '../../stores/consts';
  
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
          borderRadius: 4,
          padding: '16px 8px',
          backgroundColor: 'transparent',
          border: '2px solid #fff',
          fontWeight: 'bold',
          fontSize: 16,
          transtition: '0.25s',

          '&.active': {
              backgroundColor: '#E3F7ED',
              cursor: 'default',
          },
          '&:not(.active):hover': {
            borderColor: '#EBF2F6',
            backgroundColor: 'inherit',
          },
          '&:focus': {
              backgroundColor: '#d9f2ff',
          },
        },
      },
      button: {
          fontWeight: 800,
          fontSize: 16,
          color: '#7ECF9D',
          textTransform: 'none',
      },
    title: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    small: {
        fontSize: 12,
    },
    channel: {
        marginTop: 24,
        cursor: 'pointer',
    }
}));

interface IProps {
    channelsStore?: ChannelsStore;
}
  
export const Channels: React.FC<IProps> = inject('channelsStore')(observer(({ channelsStore }) => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (!channelsStore.channels.length) {
            channelsStore.getChannels();
        }
    }, []);

    const handleGoToChannel = (id: string) => {
        history.push(`/channel/${id}`);
    };
  
    return (
        <>
            <div className={classes.root}>
                {channelsFilters?.map((filter, idx) => {
                    return (
                        <Chip
                            key={filter.name}
                            className={idx === channelsStore?.currentChannelsFilter ? 'active' : ''}
                            label={filter.name}
                            onClick={() => channelsStore?.setCurrentFilter(idx)}
                        />
                    );
                })}
            </div>
            {!!channelsStore?.channels.length && channelsStore?.channels.slice(0, 3).map(channel => {
                    return (
                        <Box key={channel.id} className={classes.channel} onClick={() => handleGoToChannel(channel.id)}>
                            <Box display="flex" justifyContent="start">
                                <Avatar />
                                <Box marginLeft="12px">
                                    <Typography className={classes.title}>{channel.title}</Typography>
                                    <Typography  className={classes.small}>{`${channel.subscribersCount} подписчиков • ${channel.postsCount} постов`}</Typography>
                                    <Typography  className={classes.small}>{channel.description}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    );
            })}
            <Box textAlign='center'>
                <Button className={classes.button} variant="text">Показать всё</Button>
            </Box>
        </>
    );
}));
