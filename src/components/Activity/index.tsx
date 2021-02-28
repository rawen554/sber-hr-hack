import { Avatar, Box, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';

import { ChannelsStore } from '../../stores/channelsStore';
import { channelsFilters } from '../../stores/consts';
  
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
          borderRadius: 4,
          padding: '16px 8px',
          backgroundColor: 'transparent',
          border: '2px solid #fff',
          fontWeight: 'bold',
          fontSize: 16,
          transtition: '0.25s',

          '&.active': {
              backgroundColor: '#EBF2F6',
              cursor: 'default',
          },
          '&:not(.active):hover': {
            borderColor: '#EBF2F6',
            backgroundColor: 'inherit',
          },
          '&:focus': {
              backgroundColor: '#d9f2ff',
          },
        },
      },
      button: {
          fontWeight: 800,
          fontSize: 16,
          color: '#7ECF9D',
          textTransform: 'none',
      },
    title: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    small: {
        fontSize: 12,
    },
}));
  
export const Activity: React.FC = () => {
    const classes = useStyles();
  
    return (
        <>
            <div className={classes.root}>
                {['Слушатели', 'Авторы']?.map((filter, idx) => {
                    return (
                        <Chip
                            key={filter}
                            label={filter}
                            className={idx === 0 ? 'active' : ''}
                            onClick={() => {}}
                        />
                    );
                })}
            </div>
            <Box marginTop="24px">
                <Box display="flex" justifyContent="start">
                    <Avatar />
                    <Box marginLeft="12px">
                        <Typography className={classes.title}>{'Константинопольский К. К. '}</Typography>
                        <Typography  className={classes.small}>{'100 GreenPoints'}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box marginTop="24px">
                <Box display="flex" justifyContent="start">
                    <Avatar />
                    <Box marginLeft="12px">
                        <Typography className={classes.title}>{'Дмитрий Т. В. '}</Typography>
                        <Typography  className={classes.small}>{'100 GreenPoints'}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box textAlign='center'>
                <Button className={classes.button} variant="text">Показать всё</Button>
            </Box>
        </>
    );
};
