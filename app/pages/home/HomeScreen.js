/**
 * WeiZHou React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { StyleSheet, Text, Button, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationService from '../../Navigator/NavigationService';
import NavBar from '../../components/NavBar/NavBar';
import { SafeAreaView } from 'react-navigation';
import NavigatorPage from '../../components/NavigatorPage';
import styleUtil from '../../common/styleUtil';

export default class HomeScreen extends NavigatorPage {
  static defaultProps = {
    ...NavigatorPage.navigatorStyle,
    title: '首页',
    showBackButton: false
  };

  renderPage() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView forceInset={{ horizontal: 'always' }}>
          <Text>Home!</Text>
          <Icon name="ios-person" size={30} color="#4F8EF7" />
          <Text>
            Lorem <Icon name="ios-book" color="#4F8EF7" /> Ipsum
          </Text>

          <Button title="Go to me" onPress={() => NavigationService.navigate('me', { userName: 'Lucy' })} />
          <Button title="Go to auth" onPress={() => this.props.navigation.navigate('Other')} />
          <Button title="Go to ImagePicker" onPress={() => this.props.navigation.navigate('ImagePickerScreen')} />
          <Button
            title="Go to ScrollableTabView"
            onPress={() => this.props.navigation.navigate('ScrollableTabView')}
          />
          <Button title="Go to Test" onPress={() => this.props.navigation.navigate('Test')} />
          <Button title="Go to DatePicker" onPress={() => this.props.navigation.navigate('DatePicker')} />
          <Button
            title="Go to CalendarsScreen"
            onPress={() => this.props.navigation.navigate('CalendarsScreen')}
          />
          <Button title="Go to Agenda" onPress={() => this.props.navigation.navigate('Agenda')} />
          <Button title="动画" onPress={() => this.props.navigation.navigate('AnimatedScreen')} />
          <Button title="GeolocationScreen" onPress={() => this.props.navigation.navigate('GeolocationScreen')} />
          <Button
            title="MOBX"
            onPress={() => this.props.navigation.navigate('MobxStoreScreen', { name: 'niunai' })}
          />
          <Button title="Realm" onPress={() => this.props.navigation.navigate('RealmTestScreen')} />
          <Button title="SegmentedView" onPress={() => this.props.navigation.navigate('SegmentedViewScreen')} />
          <Button title="TopNavigator" onPress={() => this.props.navigation.navigate('TopNavigator')} />
          <Button title="DetailsScreen" onPress={() => this.props.navigation.navigate('DetailsScreen')} />
          <Button title="LikesList" onPress={() => this.props.navigation.navigate('LikesList')} />
          <Button title="PickerTest" onPress={() => this.props.navigation.navigate('PickerTest')} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleUtil.backgroundColor
  }
});
