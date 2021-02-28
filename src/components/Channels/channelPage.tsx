import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles, Box } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { Categories } from '../Categories';
import { FeedHeader } from '../FeedHeader';
import { Feed } from '../Feed';
import { Activity } from '../Activity';
import { WidgetBox } from '../WidgetBox/Index';
import { ChannelsStore } from '../../stores/channelsStore';
import { ChannelInfo } from '../ChannelInfo';
import { IChannel } from '../../stores/models';
import { ArrowBackIos } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
        marginTop: 20,
    },
    categoryBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    goBackBox: {
        position: 'absolute',
        top: 20,
        left: 40,
        cursor: 'pointer',
    },
    goBack: {
        fontSize: 38,
    },
}));

interface IProps {
    channelsStore?: ChannelsStore;
}

export const Channel: React.FC<IProps> = inject('channelsStore')(observer(({ channelsStore }) => {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const { id: channelId } = params;

    const handleGoBack = () => {
        history.push('/feed');
    };
    
    const handleFindChannel = (id: string) => {
        return channelsStore?.channels.find(channel => channel.id === channelId);
    }
    
    const [channel, setChannel] = useState<IChannel>(handleFindChannel(channelId));

    useEffect(() => {
        if (!channel) {
            channelsStore.getChannels();
        }
    }, []);

    useEffect(() => {
        setChannel(handleFindChannel(channelId));
    }, [channelsStore.isChannelsLoading, params]);

    return (
        <>
            <Container className={classes.container} maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box className={classes.categoryBlock}>
                            <Categories title={'Подкатегории'} categories={channel?.tags} />
                            <FeedHeader />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <ChannelInfo channel={channel} />
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Feed channelId={channelId} />
                    </Grid>
                    <Grid item xs={4}>
                        <WidgetBox title={'Авторы'}>
                            <Activity />
                        </WidgetBox>
                        <WidgetBox marginTop="24px" title={'Подписчики'}>
                            <Activity />
                        </WidgetBox>
                    </Grid>
                </Grid>
            </Container>
            <Box className={classes.goBackBox} onClick={handleGoBack}>
                <ArrowBackIos className={classes.goBack} />
            </Box>
        </>
    );
}));
