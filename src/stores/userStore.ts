import { observable, action, makeObservable } from 'mobx';

import { IUserInfo } from './models';
import { axiosInstance } from '../utils/axios';

export class UserStore {
    @observable currentUser: IUserInfo | undefined;
    @observable loadingUser: boolean;
    @observable errors: any;
    @observable responceCode: number | undefined;

    constructor() {
        this.loadingUser = false;
        this.responceCode = undefined;

        makeObservable(this)
    }

    @action setUser(user: IUserInfo) {
        this.currentUser = user;
    }

    @action setResponceCode(code: number) {
        this.responceCode = code;
    }

    @action forgetUser() {
        this.currentUser = undefined;
    }

    @action getUserInfo(id?: string) {
        this.loadingUser = true;
        this.errors = [];
        return axiosInstance.get<IUserInfo>('/users')
            .then(res => {
                this.setUser(res.data);
                this.setResponceCode(res.status);
            })
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                this.setResponceCode(401);
                throw err;
            }))
            .finally(action(() => { this.loadingUser = false; }));
    }
}
