import { Avatar, Box, Button, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Favorite, Visibility, Schedule } from '@material-ui/icons';

import { EPostType } from '../../stores/enums';
import { IPost } from '../../stores/models';
import { SberCoin } from '../SberCoin';

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom: '4px solid #E3F7ED',
        padding: '20px 24px',
    },
    announce: {
        backgroundColor: '#FCBE2D',
        height: 20,
    },
    channel: {
        backgroundColor: '#999999',
        height: 20,
        color: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginTop: 8,
    },
    tags: {
        fontSize: 12,
        marginTop: 8,
    },
    pointsBlock: {
        borderRadius: 8,
        backgroundColor: '#F2F6F9',
        display: 'flex',
        justifyContent: 'center',
        float: 'right',
        padding: '0 2px'
    },
    points: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 4,
    },
    gp: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#828F9C',
        marginLeft: 4,
    },
    button: {
        padding: '8px 16px',
        fontWeight: 'bold',
        fontSize: 16,
        borderRadius: 28,
        border: '1px solid #333333',
        textTransform: 'none',
    },
    author: {
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 8,
    },
    smallAvatar: {
        width: 24,
        height: 24,
        fontSize: 12,
    },
    count: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    spacing: {
        marginLeft: 24,
    },
    icon: {
        fontSize: 14,
    },
    date: {
        fontSize: 12,
        marginLeft: 8,
    },
}));

interface IProps {
    post: IPost;
}

export const Post: React.FC<IProps> = ({ post }) => {
    const classes = useStyles();
    const history = useHistory();

    const randLikesCount = Math.ceil(Math.random() * 30);

    const handleGoToPage = (post: IPost) => {
        if (post.channel) {
            history.push(`/post/${post.id}`);
        } else {
            history.push(`/channel/${post.id}`);
        }
    }

    return (
        <Grid container className={classes.root}>
            {post.type === EPostType.ANNOUNCEMENT && (
                <>
                    <Grid item xs={1} />
                    <Grid item xs={11}>
                        <Box display="flex" justifyContent="start" alignItems="center">
                            <Chip className={classes.announce} label={'Анонс'} />
                            <Typography className={classes.date}>
                                {`${new Date(post.updatedAt).getDate()}.${new Date(post.updatedAt).getMonth()}.${new Date(post.updatedAt).getFullYear()}`}
                            </Typography>
                        </Box>
                    </Grid>
                </>
            )}
            {!post.channel && (
                <>
                    <Grid item xs={1} />
                    <Grid item xs={11}>
                        <Box display="flex" justifyContent="start" alignItems="center">
                            <Chip className={classes.channel} label={'Канал'} />
                            <Typography className={classes.date}>
                                {`${new Date(post.updatedAt).getDate()}.${new Date(post.updatedAt).getMonth()}.${new Date(post.updatedAt).getFullYear()}`}
                            </Typography>
                        </Box>
                    </Grid>
                </>
            )}
            <Grid item xs={1}>
                <Box display='flex'>
                    <Avatar />
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography className={classes.title}>{post.title}</Typography>
                <Typography className={classes.description}>{post.description}</Typography>
                <Typography className={classes.tags}>{post?.tags?.reduce((acc, tag) => acc = `${acc}${tag.title} #`, '#')}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Box className={classes.pointsBlock}>
                    <SberCoin />
                    <Typography className={classes.points}>+{post.points || 10}</Typography>
                    <Typography className={classes.gp}>gp</Typography>
                </Box>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={11}>
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Avatar className={classes.smallAvatar}>{post.createdBy.lastName.charAt(0)}</Avatar>
                        <Typography className={classes.author}>{`${post.createdBy.lastName} ${post.createdBy.firstName.charAt(0)}.`}</Typography>
                        <Box className={classes.spacing} display="flex" alignItems="center" justifyContent="space-between">
                            <Favorite className={classes.icon} />
                            <Typography className={classes.count}>{post.likesCount || randLikesCount}</Typography>
                        </Box>
                        <Box className={classes.spacing} display="flex" alignItems="center" justifyContent="space-between">
                            <Visibility className={classes.icon} />
                            <Typography className={classes.count}>{post.viewsCount || 0}</Typography>
                        </Box>
                        <Box className={classes.spacing} display="flex" alignItems="center" justifyContent="space-between">
                            <Schedule className={classes.icon} />
                            <Typography className={classes.count}>{post.durationInMinutes || Math.ceil(10 + Math.random() * 50)} мин.</Typography>
                        </Box>
                    </Box>
                    <Button className={classes.button} onClick={() => handleGoToPage(post)} variant="outlined">Подробнее</Button>
                </Box>
            </Grid>
        </Grid>
    );
};
