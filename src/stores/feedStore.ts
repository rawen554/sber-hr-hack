import { AxiosResponse } from 'axios';
import { observable, action, makeObservable } from 'mobx';
import { stores } from '..';

import { axiosInstance } from '../utils/axios';
import { IPost, IPostReq, TFeed } from './models';

export class FeedStore {
    @observable isFeedLoading: boolean;
    @observable feed: TFeed;

    @observable isChannelsLoading: boolean;
    @observable channelsPosts: Record<string, TFeed>;

    @observable isCurrentFilterLoading: boolean;
    @observable currentFilter: number;

    @observable isCurrentPostLoading: boolean;
    @observable currentPost: IPost | undefined;

    constructor () {
        this.isFeedLoading = false;
        this.isChannelsLoading = false;
        this.isCurrentFilterLoading = false;
        this.isCurrentPostLoading = false;
        this.feed = [];
        this.currentFilter = 0;
        this.channelsPosts = {};
        this.currentPost = {
            "id": "c5a42818-eae5-435c-bfe6-8c2926485b46",
            "title": "Первый пост",
            "description": "Очень интересный пост про сторителлинг",
            "order": null,
            "createdAt": "2021-02-27T19:51:41.728Z",
            "updatedAt": "2021-02-27T19:51:41.728Z",
            "type": 1,
            "content": "https://www.youtube.com/watch?v=1rMnzNZkIX0",
            "durationInMinutes": 45,
            "points": 10,
            "viewsCount": 10,
            "likesCount": 10,
            "channel": {
                "id": "3a48095c-96e0-493d-b4c2-b0546228181c",
                "title": "Мой ингтересный канал",
                "description": "Про всякое",
                "order": null,
                "createdAt": "2021-02-27T19:50:37.175Z",
                "updatedAt": "2021-02-27T19:50:37.175Z",
                "startDate": "2021-02-27T18:30:00.000Z",
                "category": null,
                "tags": [],
                "createdBy": {
                    "id": "51d7cf7a-95eb-479c-a6d9-fb9916a9e6b3",
                    "firstName": "Дмитрий",
                    "lastName": "Тутыхин",
                    "lastLoginAt": null
                }
            },
            "createdBy": {
                "id": "51d7cf7a-95eb-479c-a6d9-fb9916a9e6b3",
                "firstName": "Дмитрий",
                "lastName": "Тутыхин",
                "lastLoginAt": null
            },
            "tags": [
                {
                    "id": "4969ea7e-2d67-4921-8586-b3ffa3293d07",
                    "title": "сторителлинг",
                    "description": null,
                    "order": null,
                    "createdAt": "2021-02-27T19:51:41.728Z",
                    "updatedAt": "2021-02-27T19:51:41.728Z"
                },
                {
                    "id": "a43d1aec-b393-439c-b7f1-be2666060782",
                    "title": "pixar",
                    "description": null,
                    "order": null,
                    "createdAt": "2021-02-27T19:51:41.728Z",
                    "updatedAt": "2021-02-27T19:51:41.728Z"
                }
            ]
        };

        makeObservable(this);
    }

    @action setCurrentFilter(id: number) {
        this.currentFilter = id;
    }

    @action getFeed() {
        this.isFeedLoading = true;
        return axiosInstance.get<{ data: TFeed }>('/feed')
            .then(res => {
                this.feed = res.data.data;
            })
            .finally(() => {
                this.isFeedLoading = false;
            });

    }

    @action getChannelsPosts(channelId: string) {
        this.isChannelsLoading = true;
        return axiosInstance.get<TFeed>(`/channels/${channelId}/posts`)
            .then(res => {
                this.channelsPosts[channelId] = res.data;
            })
            .finally(() => {
                this.isChannelsLoading = false;
            });

    }

    @action createPost(channelId: string, post: IPostReq) {
        this.isCurrentPostLoading = true;
        return axiosInstance.post<IPostReq, AxiosResponse<IPost>>(`/channels/${channelId}/posts`, post)
            .then(res => {
                if (!!this.channelsPosts[channelId]) {
                    this.channelsPosts[channelId].unshift(res.data);
                } else {
                    this.channelsPosts[channelId] = [res.data];
                }
            })
            .finally(() => {
                this.isCurrentPostLoading = false;
            });
    }

    @action getCurrentPost(postId: string) {
        this.isCurrentPostLoading = true;

        return axiosInstance.get<IPost>(`/posts/${postId}`)
            .then(res => {
                this.currentPost = res.data;
            })
            .finally(() => {
                this.isCurrentPostLoading = false;
            });
    }

    @action completePost(postId: string) {
        this.isCurrentPostLoading = true;

        return axiosInstance.patch<{}, AxiosResponse<IPost>>(`/posts/${postId}/complete`, {})
            .then(res => {
                this.currentPost = res.data;
                stores.userStore.getUserInfo();
            })
            .finally(() => {
                this.isCurrentPostLoading = false;
            });
    }
}
