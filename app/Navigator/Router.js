import HomeScreen from '../pages/home/HomeScreen';
import ScrollableTabPage from '../pages/home/ScrollableTabPage';
import DetailScreen from '../pages/home/DetailsScreen';
import OtherScreen from '../pages/home/OtherScreen';
import Test from '../pages/home/Test';
import SettingsScreen from '../pages/settings/SettingsScreen';
import DatePicker from '../pages/home/DatePicker';
import CalendarsScreen from '../pages/home/Calendars/CalendarsScreen';
import Agenda from '../pages/home/Calendars/Agenda';
import ImagePickerScreen from '../pages/home/ImagePicker/ImagePickerScreen';
import AnimatedScreen from '../pages/home/Animated/AnimatedScreen';
import GeolocationScreen from '../pages/home/Geolocation/GeolocationScreen';
// import MobxStoreScreen from '../pages/home/Mobx/MobxStoreScreen';
// import RealmTestScreen from '../pages/home/Reaml/RealmTestScreen';
import DetailsScreen from '../pages/home/DetailsScreen';
import LikeList from '../pages/home/spinkit/LikeList';
import PickerTest from '../pages/home/datetime/PickerTest';
import ModalIndicatorExample from '../pages/home/ModalIndicatorExample/ModalIndicatorExample';

import SegmentedViewScreen from '../pages/home/SegmentedView/SegmentedViewScreen';

import SignInScreen from '../pages/auth/SignInScreen';
import AuthLoadingScreen from '../pages/auth/AuthLoadingScreen';
//显示tab bar首页页面放在这里
const FeedModules = { HomeScreen, ScrollableTabPage };
//显示tab bar个人放在这里
const ProfileModules = { SettingsScreen };
//不显示tab bar页面放在这里
const HomeModules = {
  DetailScreen,
  OtherScreen,
  Test,
  DatePicker,
  CalendarsScreen,
  Agenda,
  ImagePickerScreen,
  AnimatedScreen,
  GeolocationScreen,
  // MobxStoreScreen,
  // RealmTestScreen,
  SegmentedViewScreen,
  DetailsScreen,
  LikeList,
  PickerTest,
  ModalIndicatorExample
};
//认证页面
const AuthModules = { AuthLoadingScreen, SignInScreen };

export { FeedModules, ProfileModules, HomeModules, AuthModules };
