import { Avatar, Box, Button, Checkbox, Chip, Container, FormControlLabel, FormHelperText, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { ArrowBackIos, Close } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ChannelsStore } from '../../../stores/channelsStore';
import { EPostType } from '../../../stores/enums';
import { FeedStore } from '../../../stores/feedStore';

import { IChannel, IChannelReq, IPostReq } from '../../../stores/models';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '72px 0'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 24,
    },
    description: {
        fontSize: 16,
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
    },
    paper: {
        borderRadius: 4,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 50,
        color: '#000',
    },
    goBackBox: {
        position: 'absolute',
        top: 20,
        left: 40,
        cursor: 'pointer',
    },
    goBack: {
        fontSize: 38,
    },
}));

interface IProps {
    feedStore?: FeedStore;
    channelsStore?: ChannelsStore;
}

export const CreatePost: React.FC<IProps> = inject('feedStore', 'channelsStore')(observer(({ feedStore, channelsStore }) => {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams<{id: string}>();
    const [post, setPost] = React.useState<IPostReq>();
    const [step, setStep] = React.useState<number>(0);
    const [currentChannel, setCurrentChannel] = React.useState<IChannel>();

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    useEffect(() => {
        const currentChannel = channelsStore?.channels.find(channel => channel.id === params.id);

        if (currentChannel) {
            setCurrentChannel(currentChannel);
        }
    }, [channelsStore]);

    useEffect(() => {
        document.body.classList.add('create');

        return () => document.body.classList.remove('create');
    }, []);

    const handleChange = (key: string, value: string) => {
        setPost({
            ...post,
            [key]: value,
        });
    };

    const selectCategory = (id: string) => {
        setPost({
            ...post,
        });
    };

    const handleClose = () => {
        history.goBack();
    };

    const handleSubmit = () => {
        const result = { ...post };
        result.type = EPostType.VIDEO;

        feedStore.createPost(params.id, result)
            .then(() => handleClose());
    };

    const titles = [
        'Выберите тип контента для создания',
        'Создание видеоконтента',
    ];

    let content;

    const categories = currentChannel?.tags || channelsStore?.categories;

    switch (step) {
        case 0:
            content = (
                <>
                    <Typography className={classes.description}>Возможно тут какой-то теккст6 объясняющий порядок загрузки контента и подсказыввающий, когда что лучше выбрать</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Paper onClick={handleNextStep} className={classes.paper}>
                                Видео
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper onClick={handleNextStep} className={classes.paper}>
                                Аудио
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper onClick={handleNextStep} className={classes.paper}>
                                Текст
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper onClick={handleNextStep} className={classes.paper}>
                                Картинка
                            </Paper>
                        </Grid>
                    </Grid>
                </>
            );
            break;
        case 1:
        default:
            content = (
                <Box className={classes.fields}>
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
                        value={post?.title}
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
                        value={post?.description}
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
                        />
                        <FormHelperText className={classes.helperText}>При создании канала автоматически сформируется анонс с указанием этой даты</FormHelperText>
                    </div>
                    <div>
                        <Box className={classes.box}>
                            <Typography className={classes.category}>Подкатегории</Typography>
                            <div className="categories">
                                {categories?.map(cat => {
                                    const selected = cat.id === params.id;

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
                        <FormHelperText className={classes.helperText}>У поста может быть несколько подкатегорий</FormHelperText>
                    </div>
                    <TextField
                        label="Ссылка"
                        placeholder="Введите ссылку на контент"
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
                        value={post?.content}
                        onChange={(e) => handleChange('content', e.currentTarget.value)}
                    />
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <div>
                            <FormControlLabel control={<Checkbox color="primary" name="checkedC" />} label="Авторский контент" />
                            <FormControlLabel control={<Checkbox color="primary" name="checkedC" />} label="Видно только подписчикам" />
                        </div>
                        <Button className={classes.submit} onClick={handleSubmit}>Готово</Button>
                    </Box>
                </Box>
            );
            break;
    }

    return (
        <>
            <Container className={classes.root} maxWidth="sm">
                <Typography className={classes.title}>{titles[step]}</Typography>
                {content}
            </Container>
            <Box className={classes.closeBox} onClick={handleClose}>
                <Close className={classes.close} />
            </Box>
            {!!step && (
                <Box className={classes.goBackBox} onClick={handleBack}>
                    <ArrowBackIos className={classes.goBack} />
                </Box>
            )}
        </>
    );
}));
