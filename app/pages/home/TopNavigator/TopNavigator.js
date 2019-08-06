/**
 * WeiZHou React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Text, Button, View, AsyncStorage, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../../../components/NavBar/NavBar';
import NavigatorPage from '../../../components/NavigatorPage';

export default class TopNavigator extends NavigatorPage {
  static defaultProps = {
    ...NavigatorPage.navigatorStyle,
    title: '详情',
    showBackButton: false
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {});
  }

  renderPage() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Home');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
