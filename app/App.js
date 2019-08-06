import React from 'react';
import { View, ActivityIndicator, DeviceEventEmitter, BackHandler, ToastAndroid, StyleSheet } from 'react-native';
import { Theme, Toast } from 'teaset';
import styleUtil from './common/styleUtil';
import config from './common/config';
import AppContainer from './Navigator/AppNavigator';
import NavigationService from './Navigator/NavigationService';
import SplashScreen from 'react-native-splash-screen';
import { Provider, observer } from 'mobx-react';
import * as stores from './stores/index';

global.config = config;

Theme.set({
  fitIPhoneX: true,
  tvBarBtnIconActiveTintColor: styleUtil.themeColor,
  tvBarBtnActiveTitleColor: styleUtil.themeColor,
  navColor: '#f9f9f9',
  backgroundColor: 'white',
  navTintColor: 'black',
  navTitleColor: 'black',
  navSeparatorLineWidth: styleUtil.borderSeparator,
  navSeparatorColor: styleUtil.borderColor,
  navType: 'auto', //'auto', 'ios', 'android'
  navStatusBarStyle: 'dark-content' //'default', 'light-content', 'dark-content'
});

let lastBackPressed: number;

@observer
export default class App extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    this.timer && clearTimeout(this.timer);
  }
  onBackButtonPressAndroid = () => {
    if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      return false;
    }
    lastBackPressed = Date.now();
    Toast.message('再按一次退出应用');
    return true;
  };
  render() {
    return (
      <Provider rootStore={stores}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          onNavigationStateChange={(prevState, currentState) => {
            console.log(prevState.routes);
            console.log('_____');
            console.log(currentState.routes);
            const AppRouter = currentState.routes[1];
            if (AppRouter.routes && AppRouter.routes.length > 1) {
              BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
            } else {
              BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
            }
          }}
        />
      </Provider>
    );
  }
}
