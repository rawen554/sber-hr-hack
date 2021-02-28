import { Box, Typography, makeStyles, Chip } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React from 'react';

import { feedFilters } from '../../stores/consts';
import { EFeedFilter } from '../../stores/enums';
import { FeedStore } from '../../stores/feedStore';

const useStyles = makeStyles((theme) => ({
    header: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
          borderRadius: 4,
          padding: 8,
          backgroundColor: 'transparent',
          border: '2px solid #fff',
          fontWeight: 'bold',
          fontSize: 16,
          transtition: '0.25s',

          '&.active': {
              backgroundColor: '#E3F7ED',
              cursor: 'default',
          },
          '&:not(.active):hover': {
            borderColor: '#E3F7ED',
            backgroundColor: 'inherit',
          },
          '&:focus': {
              backgroundColor: '#E3F7ED',
          },
        },
      },
}));

interface IProps {
    feedStore?: FeedStore;
    withSubs?: boolean;
}

export const FeedHeader: React.FC<IProps> = inject('feedStore')(observer(({ feedStore, withSubs }) => {
    const classes = useStyles();

    const subs = {
        id: EFeedFilter.SUBSCRIPTION,
        name: 'Подписка',
    };

    const resultFilter = withSubs ? [...feedFilters, subs] : feedFilters;

    return (
        <Box marginTop="48px">
            <Typography className={classes.header}>Лента</Typography>
            <Box className={classes.chips} marginTop="16px">
                {resultFilter?.map((filter, idx) => {
                    return (
                        <Chip
                            key={filter.name}
                            className={idx === feedStore?.currentFilter ? 'active' : ''}
                            label={filter.name}
                            onClick={() => feedStore?.setCurrentFilter(idx)}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}));
