import { Box, BoxProps, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyels = makeStyles((theme) => ({
    root: {
        borderRadius: 8,
        padding: 16,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 16,
    },
    border: {
        border: '4px solid #E3F7ED',
    }
}));

interface IProps {
    title: string;
    border?: boolean;
}

export const WidgetBox: React.FC<IProps & BoxProps> = ({ children, border = true, title, ...rest }) => {
    const classes = useStyels();

    let classNames = classes.root;

    if (border) {
        classNames += ` ${classes.border}`;
    }

    return (
        <Box {...rest} className={classNames}>
            <Typography className={classes.title}>{title}</Typography>
            {children}
        </Box>
    );
};
