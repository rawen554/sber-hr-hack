import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import logo from '../../assets/images/sberIcon.svg';

const useStyles = makeStyles((theme) => ({
    icon: {
        width: 16,
        height: 16,
        marginLeft: 4,
    },
    font: {
        fontWeight: 'bold',
        fontSize: 16,
    }
}));

interface IProps {
    amount?: string;
    reverse?: boolean;
    className?: string;
}

export const SberCoin: React.FC<IProps> = ({
    amount,
    reverse,
    className,
}) => {
    const classes = useStyles();

    return (
        <Box className={className} justifyContent="start" display="flex" alignItems='center' flexDirection={reverse ? 'row-reverse' : 'row'}>
            {!!amount && (<Typography className={classes.font}>{amount}</Typography>)}
            <img className={classes.icon} src={logo} />
        </Box>
    );
};
