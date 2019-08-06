/**
 * WeiZHou React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import NavigatorPage from '../../../components/NavigatorPage';
import {
  StyleSheet,
  Button,
  AsyncStorage,
  Text,
  View,
  ScrollView,
  PermissionsAndroid,
  Platform
} from 'react-native';
import {
  init,
  stop,
  Geolocation,
  setInterval,
  setNeedAddress,
  setLocatingWithReGeocode,
  addLocationListener
} from 'react-native-amap-geolocation';
import utils from '../../../common/util';

export default class GeolocationScreen extends NavigatorPage {
  static defaultProps = {
    ...NavigatorPage.navigatorStyle,
    title: '高德定位',
    showBackButton: false
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, { location: null, distance: 0, GPSDistance: 0 });
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    }
    await init({
      ios: '',
      android: '6563eccaa23a077b4765c296393d0ad0'
    });
    // 添加定位监听函数
    addLocationListener(location => console.log(location));
  }

  componentWillUnmount() {
    stop();
  }

  updateLocationState(location) {
    const corporationLocation = {
      latitude: 21.448083,
      longitude: 109.148281
    };
    if (location) {
      location.updateTime = new Date().toLocaleString();
      const distance = utils.getDistance(
        corporationLocation.latitude,
        corporationLocation.longitude,
        location.coords.latitude,
        location.coords.longitude
      );
      const GPSDistance = utils.getGPSDisance(
        corporationLocation.latitude,
        corporationLocation.longitude,
        location.coords.latitude,
        location.coords.longitude
      );
      this.setState({ location, distance, GPSDistance });
      alert(JSON.stringify(location.coords));
      console.log(location);
    }
  }

  getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => this.updateLocationState(position),
      error => this.updateLocationState(error)
    );
  };

  watchPosition = () => {
    if (!this.watchId) {
      this.watchId = Geolocation.watchPosition(
        position => this.updateLocationState(position),
        error => this.updateLocationState(error)
      );
    }
  };

  clearWatch = () => {
    if (this.watchId) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
    this.setState({ location: null, distance: 0 });
  };

  setInterval2000 = () => setInterval(2000);
  setInterval10000 = () => setInterval(10000);
  setNeedAddressTrue = () => setNeedAddress(true);
  setNeedAddressFalse = () => setNeedAddress(false);
  setLocatingWithReGeocodeTrue = () => setLocatingWithReGeocode(true);
  setLocatingWithReGeocodeFalse = () => setLocatingWithReGeocode(false);

  renderPage() {
    const { location, distance, GPSDistance } = this.state;
    return (
      <View style={style.container}>
        <ScrollView contentContainerStyle={style.body}>
          <View style={style.controls}>
            <View style={style.button}>
              <Button onPress={this.getCurrentPosition} title="Geolocation.getCurrentPosition" />
            </View>
            <View style={style.button}>
              <Button onPress={this.watchPosition} title="Geolocation.watchPosition" />
            </View>
            <View style={style.button}>
              <Button onPress={this.clearWatch} title="Geolocation.clearWatch" />
            </View>
            <View style={style.button}>
              <Button onPress={this.setInterval2000} title="setInterval(2000)" />
            </View>
            <View style={style.button}>
              <Button onPress={this.setInterval10000} title="setInterval(10000)" />
            </View>
            <View style={style.button}>
              <Button onPress={this.setNeedAddressTrue} title="setNeedAddress(true)" />
            </View>
            <View style={style.button}>
              <Button onPress={this.setNeedAddressFalse} title="setNeedAddress(false)" />
            </View>
            <View style={style.button}>
              <Button onPress={this.setLocatingWithReGeocodeTrue} title="setLocatingWithReGeocode(true)" />
            </View>
            <View style={style.button}>
              <Button onPress={this.setLocatingWithReGeocodeFalse} title="setLocatingWithReGeocode(false)" />
            </View>
          </View>
          <Text style={style.result}>{`${JSON.stringify(location, null, 2)}`}</Text>
          <Text style={style.result}>距离：{`${distance}`}米</Text>
          <Text style={style.result}>距离：{`${GPSDistance}`}米</Text>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 48 : 16
  },
  controls: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 16
  },
  button: {
    flexDirection: 'column',
    marginRight: 8,
    marginBottom: 8
  },
  result: {
    fontFamily: Platform.OS === 'ios' ? 'menlo' : 'monospace'
  }
});
