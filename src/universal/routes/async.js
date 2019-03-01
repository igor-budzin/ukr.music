import React from 'react';

function asyncRoute(getComponent) {
  return class AsyncComponent extends React.Component {
    state = {
      Component: null
    };

    componentDidMount() {
      if ( this.state.Component === null ) {
        getComponent().then((Component) => {
          this.setState({Component: Component});
        })
      }
    }

    render() {
      const {
        Component
      } = this.state;

      if ( Component ) {
        return (<Component {...this.props} />);
      }
      return (<div>loading...</div>); // or <div /> with a loading spinner, etc..
    }
  }
}

export const LoginPage = asyncRoute(() => {
  return System.import('../pages/LoginPage.js');
});

export const RegisterPage = asyncRoute(() => {
  return System.import('../pages/RegisterPage.js');
});

export const ArtistProfilePage = asyncRoute(() => {
  return System.import('../pages/ArtistProfilePage.js');
});

export const FollowListPage = asyncRoute(() => {
  return System.import('../pages/FollowListPage.js');
});

export const HomePage = asyncRoute(() => {
  return System.import('../pages/HomePage.js');
});

export const NotFoundPage = asyncRoute(() => {
  return System.import('../pages/NotFoundPage.js');
});

export const SettingsPage = asyncRoute(() => {
  return System.import('../pages/SettingsPage.js');
});

export const UploadMusicPage = asyncRoute(() => {
  return System.import('../pages/UploadMusicPage.js');
});

export const UserMainPage = asyncRoute(() => {
  return System.import('../pages/UserMainPage.js');
});
