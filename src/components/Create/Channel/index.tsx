import { Avatar, Box, Button, Checkbox, Chip, Container, FormControlLabel, FormHelperText, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChannelsStore } from '../../../stores/channelsStore';

import { IChannelReq } from '../../../stores/models';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '72px 0'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 24,
    },
    field: {
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    inputLabel: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        backgroundColor: '#fff',
        height: '68px',
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&.Mui-focused': {
            backgroundColor: '#fff',
        },
    },
    textArea: {
        backgroundColor: '#fff',
        minHeight: 116,
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&.Mui-focused': {
            backgroundColor: '#fff',
        },
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
    fields: {
        '& > *': {
            marginBottom: 16,
        }
    },
    helperText: {
        color: '#333333',
        fontSize: 12,
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: '8px 12px',
        '& .categories': {
            display: 'flex',
            flexWrap: 'wrap',
            '& > div': {
                margin: theme.spacing(0.7),
                borderRadius: 4,
                padding: 10,
                backgroundColor: 'transparent',
                border: '2px solid #EEF4F7',
                fontWeight: 'bold',
                fontSize: 16,

                '&.selected': {
                    backgroundColor: '#EEF4F7',
                },
                '&:hover': {
                    backgroundColor: '#EEF4F7',
                },
                '&:focus': {
                    backgroundColor: '#d9f2ff',
                },
            },
        }
    },
    category: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    submit: {
        textTransform: 'none',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 48,
        backgroundColor: '#7ECF9D',
        padding: '8px 64px',
    }
}));

interface IProps {
    channelsStore?: ChannelsStore;
}

export const CreateChannel: React.FC<IProps> = inject('channelsStore')(observer(({ channelsStore }) => {
    const classes = useStyles();
    const history = useHistory();
    const [channel, setChannel] = React.useState<IChannelReq>();
    const [tags, setTags] = React.useState<string>();

    useEffect(() => {
        document.body.classList.add('create');

        return () => document.body.classList.remove('create');
    }, []);

    const handleChange = (key: string, value: string) => {
        setChannel({
            ...channel,
            [key]: value,
        });
    };

    const selectCategory = (id: string) => {
        setChannel({
            ...channel,
            category: {
                id,
            }
        });
    };

    const handleClose = () => {
        history.goBack();
    };

    const handleSubmit = () => {
        const result = { ...channel };

        if (tags) {
            const tagArr = tags.split(',');
            result.tags = tagArr.map(tag => {
                return {
                    title: tag,
                };
            })
        }

        channelsStore.createChannel(result)
            .then(() => handleClose());
    };

    return (
        <>
            <Container className={classes.root} maxWidth="lg">
                <Typography className={classes.title}>Создание канала</Typography>
                <Grid container spacing={10}>
                    <Grid item xs={6} className={classes.fields}>
                        <TextField
                            label="Название"
                            placeholder="Введите название"
                            variant="filled"
                            color="primary"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                                className: classes.inputLabel,
                            }}
                            InputProps={{
                                className: classes.input,
                            }}
                            className={classes.field}
                            value={channel?.title}
                            onChange={(e) => handleChange('title', e.currentTarget.value)}
                        />
                        <TextField
                            label="Описание"
                            placeholder="Введите тезисное описание"
                            variant="filled"
                            color="primary"
                            fullWidth
                            multiline
                            InputLabelProps={{
                                shrink: true,
                                className: classes.inputLabel,
                            }}
                            InputProps={{
                                className: classes.textArea,
                            }}
                            className={classes.field}
                            value={channel?.description}
                            onChange={(e) => handleChange('description', e.currentTarget.value)}
                        />
                        <div>
                            <TextField
                                label="Дата запуска"
                                placeholder="Введите дату запуска"
                                variant="filled"
                                color="primary"
                                fullWidth
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                                className={classes.field}
                                value={channel?.startDate}
                                onChange={(e) => handleChange('startDate', e.currentTarget.value)}
                            />
                            <FormHelperText className={classes.helperText}>При создании канала автоматически сформируется анонс с указанием этой даты</FormHelperText>
                        </div>
                        <TextField
                            label="Соавторы"
                            placeholder="Введите фамилию"
                            variant="filled"
                            color="primary"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                                className: classes.inputLabel,
                            }}
                            InputProps={{
                                className: classes.input,
                            }}
                            className={classes.field}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.fields}>
                        <div>
                            <Box className={classes.box}>
                                <Typography className={classes.category}>Категория</Typography>
                                <div className="categories">
                                    {channelsStore?.categories?.map(cat => {
                                        const selected = cat.id === channel?.category?.id;

                                        return (
                                            <Chip
                                                key={cat.id}
                                                className={selected ? 'selected' : ''}
                                                avatar={<Avatar>{cat.title.toUpperCase().charAt(0)}</Avatar>}
                                                label={cat.title}
                                                onClick={selected ? undefined : () => selectCategory(cat.id)}
                                            />
                                        );
                                    })}
                                </div>
                            </Box>
                            <FormHelperText className={classes.helperText}>У канала может быть только одна категория</FormHelperText>
                        </div>
                        <TextField
                            label="Подкатегории"
                            placeholder="Введите подкатегории через запятую"
                            variant="filled"
                            color="primary"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                                className: classes.inputLabel,
                            }}
                            InputProps={{
                                className: classes.input,
                            }}
                            className={classes.field}
                            value={tags}
                            onChange={(e) => setTags(e.currentTarget.value)}
                        />
                        <Box display="flex" justifyContent="space-between">
                            <FormControlLabel control={<Checkbox color="primary" name="checkedC" />} label="Оповестить знакомых" />
                            <Button className={classes.submit} onClick={handleSubmit}>Готово</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Box className={classes.closeBox} onClick={handleClose}>
                <Close className={classes.close} />
            </Box>
        </>
    );
}));
