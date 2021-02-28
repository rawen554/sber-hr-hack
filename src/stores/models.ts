import { EFeedFilter, EPostType } from './enums';

export interface IAuthData {
    username: string;
    password: string;
}

export interface IUserInfo {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    lastLoginAt: string;
    points: number;
    subscriptions: IChannel[];
    channels: IChannel[];
    completedPosts: IPost[];
}

export type IUser = Pick<IUserInfo, 'id' | 'firstName' | 'lastName' | 'lastLoginAt'>

export interface IChannel {
    id: string;
    title: string;
    description: string;
    order?: number | null;
    createdAt: string;
    updatedAt: string;
    startDate: string;
    category: ICategory;
    tags: ITag[];
    createdBy: IUser;
    subscribersCount?: number;
    postsCount?: number;
}

export interface IChannelReq {
    title: string;
    description: string;
    startDate: string;
    category: Pick<ICategory, 'id'>;
    tags: Array<Pick<ITag, 'id'> | Pick<ITag, 'title'>>;
}

export type TFeed = Array<IPost>;

export interface IPost {
    id: string;
    title: string;
    description: string;
    order?: number | null;
    startDate?: string;
    createdAt: string;
    updatedAt: string;
    type: EPostType;
    content: string;
    durationInMinutes: number;
    points: number;
    channel: IChannel;
    tags: ITag[];
    createdBy: IUser;
    viewsCount: number;
    likesCount: number;
    completed?: boolean;
    completedUsers?: IUser[];
}

export interface IPostReq {
    title: string;
    description: string;
    type: EPostType;
    content: string;
    durationInMinutes: number;
    points: number;
    tags: Array<Pick<ITag, 'title'> | Pick<ITag, 'id'>>;
}

export interface ICategory {
    id: string;
    title: string;
    description: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}

export interface IFilter {
    id: EFeedFilter;
    name: string;
}

export interface ITag {
    id: string;
    title: string;
    description?: string;
    order?: number;
    createdAt: string;
    updatedAt: string;
}
