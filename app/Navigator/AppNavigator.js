/**
 * WeiZHou React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { Dimensions, Platform, PixelRatio, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  StackViewTransitionConfigs
} from 'react-navigation';
import { FeedModules, ProfileModules, HomeModules, AuthModules } from './Router';
import MobxStoreScreen from '../pages/home/Mobx/MobxStoreScreen';
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

const IOS_MODAL_ROUTES = ['SignIn'];

let dynamicModalTransition = (transitionProps, prevTransitionProps) => {
  const isModal = IOS_MODAL_ROUTES.some(
    screenName =>
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
  );
  return StackViewTransitionConfigs.defaultTransitionConfig(transitionProps, prevTransitionProps, isModal);
};

const TopNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: FeedModules.HomeScreen,
      navigationOptions: {
        tabBarLabel: '首页'
      }
    },
    me: {
      screen: ProfileModules.SettingsScreen,
      navigationOptions: {
        tabBarLabel: '个人'
      }
    }
  },
  {
    // tabBarComponent: <View />
    // defaultNavigationOptions: {
    //   header: null,
    //   headerMode: 'none'
    // }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: FeedModules.HomeScreen,
      navigationOptions: {
        tabBarLabel: '首页'
      }
    },
    me: {
      screen: ProfileModules.SettingsScreen,
      navigationOptions: {
        tabBarLabel: '个人'
      }
    }
  },
  {
    backBehavior: 'none',
    navigationOptions: {
      header: null
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }: { tintColor: string, focused: boolean }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : ''}`;
        } else if (routeName === 'me') {
          iconName = `ios-settings${focused ? '' : ''}`;
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  }
);

/* TabNavigator.navigationOptions = {
    // Hide the header from AppNavigator stack
    header: null,
};*/

const HomeStack = createStackNavigator(
  {
    Tabs: TabNavigator,
    TopNavigator: TopNavigator,
    Details: HomeModules.DetailScreen,
    Other: HomeModules.OtherScreen,
    Test: HomeModules.Test,
    DatePicker: HomeModules.DatePicker,
    CalendarsScreen: HomeModules.CalendarsScreen,
    Agenda: HomeModules.Agenda,
    ImagePickerScreen: HomeModules.ImagePickerScreen,
    AnimatedScreen: HomeModules.AnimatedScreen,
    GeolocationScreen: HomeModules.GeolocationScreen,
    // MobxStoreScreen: HomeModules.MobxStoreScreen,
    // RealmTestScreen: HomeModules.RealmTestScreen,
    SegmentedViewScreen: HomeModules.SegmentedViewScreen,
    DetailsScreen: HomeModules.DetailsScreen,
    LikesList: HomeModules.LikeList,
    PickerTest: HomeModules.PickerTest,
    ModalIndicatorExample: HomeModules.ModalIndicatorExample,
    ScrollableTabView: {
      screen: FeedModules.ScrollableTabPage
    }
    /* 隐藏tab bar页面放在这里 */
  },
  {
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    /* mode: 'modal',*/
    defaultNavigationOptions: {
      // header: null,
      gesturesEnabled: true
    },
    // headerMode: 'screen',
    // transitionConfig:
    // Platform.OS === 'ios'
    //   ? dynamicModalTransition
    //   : () => ({
    //       screenInterpolator: StackViewStyleInterpolator.forHorizontal
    //     }),
    // transitionConfig: iOS ? dynamicModalTransition : StackViewStyleInterpolator.forHorizontal,
    cardOverlayEnabled: true
    // transparentCard: true,
    // headerTransitionPreset: 'fade-in-place',
    // headerMode: 'float',
    // mode: 'modal'
  }
);

const AuthStack = createStackNavigator(
  { SignIn: AuthModules.SignInScreen },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {}
  },
  { initialRouteName: 'SignIn' /*transitionConfig: dynamicModalTransition*/ }
); // 认证页面 （登录，注册，忘记密码）页面

const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthModules.AuthLoadingScreen,
      Home: HomeStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
export default App;
