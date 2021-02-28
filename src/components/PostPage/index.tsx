import { Avatar, Box, Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { EPostType } from '../../stores/enums';

import { FeedStore } from '../../stores/feedStore';
import { UserStore } from '../../stores/userStore';
import { WidgetBox } from '../WidgetBox/Index';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 72,
    },
    info: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#F6F8FA',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        fontWeight: 'bold',
        fontSize: 16,
        borderRadius: 48,
        backgroundColor: '#7ECF9D',
        padding: '8px 16px',
        width: 'max-content',
        margin: '0 auto',
        color: '#fff',
    },
    player: {
        borderRadius: 8,
        width: '100%',
        height: 'max',
        overflow: 'hidden',
    },
    title: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 16,
    },
    description: {
        marginBottom: 16,
        fontSize: 16,
    },
    tags: {
        fontSize: 12,
    },
    closeBox: {
        position: 'absolute',
        top: 20,
        right: 40,
        cursor: 'pointer',
    },
    close: {
        fontSize: 38,
    },
    channelTitle: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    small: {
        fontSize: 12,
    },
    channel: {
        marginTop: 24,
    }
}));

interface IProps {
    feedStore?: FeedStore;
    userStore?: UserStore;
}

export const PostPage: React.FC<IProps> = inject('feedStore', 'userStore')(observer(({ feedStore, userStore }) => {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams<{ id: string }>();
    
    console.log(feedStore.currentPost);

    useEffect(() => {
        feedStore.getCurrentPost(params.id);
    }, []);

    const findVideoId = (url: string) => {
        const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);

        if (match && match[2].length == 11) {
            return match[2];
        }
    };

    const handleClose = () => {
        history.goBack();
    };

    const renderInfo = () => {
        return (
            <>
                <Grid item xs={12}>
                    <Typography className={classes.title}>{feedStore.currentPost.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.description}>{feedStore.currentPost.description}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.tags}>{feedStore.currentPost.tags.reduce((acc, tag) => acc += `#${tag.title}`, '')}</Typography>
                </Grid>
            </>
        );
    };

    let content;

    if (feedStore?.currentPost?.content) {
        content = <YouTube className={classes.player} videoId={findVideoId(feedStore.currentPost.content)} />;
    } else {
        content = renderInfo();
    }

    return (
        <>
            <Container className={classes.root} maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {content}
                    </Grid>
                    <Grid item xs={4}>
                        <Box className={classes.info}>
                            <div>
                                <WidgetBox bgcolor="#fff" border={false} title={'Канал'}>
                                    <Box className={classes.channel}>
                                        <Box display="flex" justifyContent="start">
                                            <Avatar />
                                            <Box marginLeft="12px">
                                                <Typography className={classes.channelTitle}>{feedStore.currentPost.channel.title}</Typography>
                                                <Typography  className={classes.small}>{`${feedStore.currentPost.channel.subscribersCount} подписчиков • ${feedStore.currentPost.channel.postsCount} постов`}</Typography>
                                                <Typography  className={classes.small}>{feedStore.currentPost.channel.description}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </WidgetBox>
                                <WidgetBox bgcolor="#fff" border={false} marginTop="16px" title={'Авторы'}>
                                    <Box display="flex" justifyContent="start">
                                        <Avatar />
                                        <Box marginLeft="12px">
                                            <Typography className={classes.channelTitle}>{`${feedStore.currentPost.createdBy.lastName} ${feedStore.currentPost.createdBy.firstName.charAt(0)}.`}</Typography>
                                            <Typography  className={classes.small}>{userStore.currentUser.points || 0} GreenPoints</Typography>
                                        </Box>
                                    </Box>
                                </WidgetBox>
                            </div>
                            {feedStore.currentPost.type !== EPostType.ANNOUNCEMENT && (
                                <Button
                                    className={classes.button}
                                    onClick={() => feedStore.completePost(params.id)}
                                    disabled={feedStore.currentPost.completed}
                                >
                                    Получить +{feedStore.currentPost.points} GP
                                </Button>
                            )}
                        </Box>
                    </Grid>
                    {!!feedStore.currentPost.content && renderInfo()}
                </Grid>
            </Container>
            <Box className={classes.closeBox} onClick={handleClose}>
                <Close className={classes.close} />
            </Box>
        </>
    );
}));
