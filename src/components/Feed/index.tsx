import { Box, makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';

import { FeedStore } from '../../stores/feedStore';
import { IPost } from '../../stores/models';
import { Post } from './post';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 8,
        border: '4px solid #E3F7ED',
        height: '100%',
    }
}));

interface IProps {
    feedStore?: FeedStore;
    channelId?: string;
}

export const Feed: React.FC<IProps> = inject('feedStore')(observer(({ feedStore, channelId }) => {
    const classes = useStyles();

    useEffect(() => {
        feedStore?.getFeed();
    }, []);

    let feed = feedStore?.feed;

    if (!!channelId) {
        feed = feedStore?.feed.filter(post => (post as IPost)?.channel?.id === channelId);
    }

    return (
        <Box className={classes.root}>
            {!!feed.length && feed.map((post) => {
                return (
                    <Post key={post.id} post={post} />
                );
            })}
        </Box>
    );
}));
