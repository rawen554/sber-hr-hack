import { AxiosResponse } from 'axios';
import { observable, action, makeObservable } from 'mobx';
import { stores } from '..';

import { axiosInstance } from '../utils/axios';
import { IAuthData, IUserInfo } from './models';

export class AuthStore {
    @observable inProgress: boolean;
    @observable errors: string[];

    @observable values: IAuthData = {
      username: '',
      password: '',
    };

    constructor() {
        this.inProgress = false;
        this.errors = [];

        makeObservable(this);
    }

    @action setUsername(username: string) {
      this.values.username = username;
    }

    @action setPassword(password: string) {
      this.values.password = password;
    }

    @action reset() {
      this.values.username = '';
      this.values.password = '';
    }

    @action login() {
      this.inProgress = true;
      this.errors = [];
      return axiosInstance.post<IAuthData, AxiosResponse<IUserInfo>>('/auth/login', { username: this.values.username, password: this.values.password })
        .then(res => {
          stores.userStore.setUser(res.data);
          console.log(res);
          stores.userStore.setResponceCode(res.status);
        })
        .catch(action((err) => {
          this.errors = err.response && err.response.body && err.response.body.errors;
          throw err;
        }))
        .finally(action(() => { this.inProgress = false; }));
    }

    @action logout() {
      this.inProgress = true;
      this.errors = [];
      return axiosInstance.post<IAuthData, {}>('/auth/logout')
        .then(res => stores.userStore.forgetUser())
        .catch(action((err) => {
          this.errors = err.response && err.response.body && err.response.body.errors;
          throw err;
        }))
        .finally(action(() => { this.inProgress = false; }));
    }
}
