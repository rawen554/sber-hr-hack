import { EFeedFilter } from "./enums";

export const feedFilters = [
    {
        id: EFeedFilter.ALL,
        name: 'Все посты',
    },
    {
        id: EFeedFilter.AVALIABLE,
        name: 'Доступно',
    },
    {
        id: EFeedFilter.ANNOUNCEMENT,
        name: 'Анонсы',
    },
];

export const channelsFilters = [
    {
        id: EFeedFilter.SUBSCRIPTION,
        name: 'Подписка',
    },
    {
        id: EFeedFilter.AVALIABLE,
        name: 'Доступно',
    },
    {
        id: EFeedFilter.MINE,
        name: 'Мои',
    },
];
