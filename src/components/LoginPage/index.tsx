import * as React from 'react';

import { Grid, makeStyles, CssBaseline, Paper, Typography } from '@material-ui/core';

import { AuthBox } from './AuthBox';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
}));

export const LoginPage = () => {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Авторизация
                </Typography>
                <AuthBox/>
            </div>
        </Grid>
    </Grid>
    );
};
