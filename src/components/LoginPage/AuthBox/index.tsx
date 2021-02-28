import React from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, Grid, Link, makeStyles, TextField } from '@material-ui/core';

import { AuthStore } from '../../../stores/authStore';

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

interface IProps {
    authStore?: AuthStore;
}

export const AuthBox: React.FC<IProps> = inject('authStore')(observer(({
    authStore,
}) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Логин"
                autoComplete="username"
                autoFocus
                value={authStore?.values.username}
                onChange={(e) => authStore?.setUsername(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={authStore?.values.password}
                onChange={(e) => authStore?.setPassword(e.target.value)}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Запомнить"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => {
                    e.preventDefault();
                    authStore?.login().then(() => history.push('/feed'));
                }}
            >
              Войти
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="#">
                        Забыл пароль?
                    </Link>
                </Grid>
            </Grid>
          </form>
    );
}));
