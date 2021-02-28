import { AxiosResponse } from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { axiosInstance } from '../utils/axios';

import { ICategory, IChannel, IChannelReq, ITag } from './models';

export class ChannelsStore {
    @observable channels: IChannel[];
    @observable categories: ICategory[];
    @observable tags: ITag[];
    @observable isCategoriesLoading: boolean;
    @observable isChannelsLoading: boolean;
    @observable isTagsLoading: boolean;
    @observable currentChannelsFilter: number;
    @observable currentChannelId: string;

    constructor() {
        this.categories = [];
        this.channels = [];
        this.tags = [
            {
                "id": "4d4d53e3-f8d7-4e69-8cb3-fa0d34e1138d",
                "title": "ux",
                "description": undefined,
                "order": undefined,
                "createdAt": "2021-02-27T16:16:39.776Z",
                "updatedAt": "2021-02-27T16:16:39.776Z"
            },
            {
                "id": "fe8bc9c3-310e-428f-8540-7cf07c769d5e",
                "title": "программирование",
                "description": undefined,
                "order": undefined,
                "createdAt": "2021-02-27T16:16:39.776Z",
                "updatedAt": "2021-02-27T16:16:39.776Z"
            },
            {
                "id": "f468728e-5f7a-498c-aa4d-9c48e084d309",
                "title": "программирование",
                "description": undefined,
                "order": undefined,
                "createdAt": "2021-02-27T16:16:53.553Z",
                "updatedAt": "2021-02-27T16:16:53.553Z"
            }
        ];
        this.isCategoriesLoading = false;
        this.isChannelsLoading = false;
        this.isTagsLoading = false;
        this.currentChannelsFilter = 0;
        this.currentChannelId = '';

        makeObservable(this);
    }

    @action getCategories() {
        this.isCategoriesLoading = true;

        return axiosInstance.get<ICategory[]>('/channels/categories')
            .then(res => this.categories = res.data)
            .finally(() => this.isCategoriesLoading = false);
    }

    @action getTags() {
        this.isTagsLoading = true;

        return axiosInstance.get<ICategory[]>('/tags')
            .then(res => this.categories = res.data)
            .finally(() => this.isTagsLoading = false);
    }

    @action getChannels() {
        this.isChannelsLoading = true;

        return axiosInstance.get<IChannel[]>('/channels')
            .then(res => this.channels = res.data)
            .finally(() => this.isChannelsLoading = false);
    }

    @action createChannel(channel: IChannelReq) {
        this.isChannelsLoading = true;

        return axiosInstance.post<IChannelReq, AxiosResponse<IChannel>>('/channels', channel)
            .then(res => this.channels.unshift(res.data))
            .finally(() => this.isChannelsLoading = false);
    }

    @action setCurrentFilter(id: number) {
        this.currentChannelsFilter = id;
    }

    @action setCurrentChannelId(id: string) {
        this.currentChannelId = id;
    }
}
