import * as React from 'react';
import { Container, Grid, makeStyles, Box } from '@material-ui/core';

import { Channels } from './components/Channels';
import { Feed } from './components/Feed';
import { Categories } from './components/Categories';
import { UserInfo } from './components/UserInfo';
import { FeedHeader } from './components/FeedHeader';
import { WidgetBox } from './components/WidgetBox/Index';
import { Activity } from './components/Activity';

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
  }));

export const App: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Container className={classes.container} maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box className={classes.categoryBlock}>
                            <Categories title={'Категории'} />
                            <FeedHeader withSubs />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <UserInfo />
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Feed />
                    </Grid>
                    <Grid item xs={4}>
                        <WidgetBox title={'Каналы'}>
                            <Channels />
                        </WidgetBox>
                        <WidgetBox marginTop="24px" title={'Активность'}>
                            <Activity />
                        </WidgetBox>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
