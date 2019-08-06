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
import { ListRow } from 'teaset';

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
          <ListRow
            title="Go to me"
            onPress={() => NavigationService.navigate('me', { userName: 'Lucy' })}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="Go to auth"
            onPress={() => this.props.navigation.navigate('Other')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="ImagePicker"
            onPress={() => this.props.navigation.navigate('ImagePickerScreen')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="ScrollableTabView"
            onPress={() => this.props.navigation.navigate('ScrollableTabView')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="Test"
            onPress={() => this.props.navigation.navigate('Test')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="DatePicker"
            onPress={() => this.props.navigation.navigate('DatePicker')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="CalendarsScreen"
            onPress={() => this.props.navigation.navigate('CalendarsScreen')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="Agenda"
            onPress={() => this.props.navigation.navigate('Agenda')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="AnimatedScreen"
            onPress={() => this.props.navigation.navigate('AnimatedScreen')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="GeolocationScreen"
            onPress={() => this.props.navigation.navigate('GeolocationScreen')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="MOBX"
            onPress={() => this.props.navigation.navigate('MobxStoreScreen', { name: 'niunai' })}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="RealmTestScreen"
            onPress={() => this.props.navigation.navigate('RealmTestScreen')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="SegmentedViewScreen"
            onPress={() => this.props.navigation.navigate('SegmentedViewScreen')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="TopNavigator"
            onPress={() => this.props.navigation.navigate('TopNavigator')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="DetailsScreen"
            onPress={() => this.props.navigation.navigate('DetailsScreen')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="LikesList"
            onPress={() => this.props.navigation.navigate('LikesList')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="PickerTest"
            onPress={() => this.props.navigation.navigate('PickerTest')}
            topSeparator="full"
            bottomSeparator="full"
          />
          <ListRow
            title="ModalIndicatorExample"
            onPress={() => this.props.navigation.navigate('ModalIndicatorExample')}
            topSeparator="full"
            bottomSeparator="full"
          />
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
