import { Chip, Avatar, Box, createStyles, makeStyles, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { ChannelsStore } from '../../stores/channelsStore';
import { ICategory } from '../../stores/models';

const useStyles = makeStyles((theme) =>
  createStyles({
    catHeader: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
        borderRadius: 4,
        padding: 8,
        backgroundColor: 'transparent',
        border: '2px solid #E3F7ED',
        fontWeight: 'bold',
        fontSize: 16,

        '&:hover': {
            backgroundColor: '#E3F7ED',
        },
        '&:focus': {
            backgroundColor: '#E3F7ED',
        },
      },
    },
  }),
);
  
interface IProps {
    channelsStore?: ChannelsStore;
    title: string;
    categories?: Array<{id: string; title: string;}>;
}

export const Categories: React.FC<IProps> = inject('channelsStore')(observer(({ channelsStore, title, categories }) => {
    const classes = useStyles();

    useEffect(() => {
        if (!channelsStore?.categories.length) {
            channelsStore.getCategories();
        }
    }, []);

    const cats = categories ? categories : channelsStore?.categories;

    return (
        <Box>
            <Typography className={classes.catHeader}>
                {title}
            </Typography>
            <Box className={classes.root}>
                {cats?.map(cat => {
                    return (
                        <Chip key={cat.id} label={cat.title} onClick={() => {}} />
                    );
                })}
            </Box>
        </Box>
    );
}));
