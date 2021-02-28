import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { LoginPage } from './components/LoginPage';
import { PrivateRoute } from './components/PrivateRoute';
import { UserStore } from './stores/userStore';
import { AuthStore } from './stores/authStore';
import { ChannelsStore } from './stores/channelsStore';
import { FeedStore } from './stores/feedStore';
import { CreateChannel } from './components/Create/Channel';
import { CreatePost } from './components/Create/Post';
import { Channel } from './components/Channels/channelPage';
import { PostPage } from './components/PostPage';

import './index.css';

export const stores = {
  authStore: new AuthStore,
  userStore: new UserStore,
  channelsStore: new ChannelsStore,
  feedStore: new FeedStore,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Proxima Nova',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      color: '#333333',
    },
  },
  palette: {
    primary: {
      main: '#70ca92',
    },
  }
});

ReactDOM.render(
  <Provider {...stores}>
    <React.StrictMode>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <PrivateRoute path="/feed" exact>
              <App />
            </PrivateRoute>
            <PrivateRoute path="/create/channel" exact>
              <CreateChannel />
            </PrivateRoute>
            <PrivateRoute path="/channel/:id" exact>
              <Channel />
            </PrivateRoute>
            <PrivateRoute path="/channel/:id/create" exact>
              <CreatePost />
            </PrivateRoute>
            <PrivateRoute path="/post/:id" exact>
              <PostPage />
            </PrivateRoute>
            <Route path="*">
              <Redirect
                  to={{
                      pathname: "/login",
                  }}
              />
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
