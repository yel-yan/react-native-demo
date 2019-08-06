/**
 * WeiZHou React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Text, Button, View, StatusBar, AsyncStorage, StyleSheet, ScrollView, Image } from 'react-native';
import { NavigationPage, ListRow, PopoverPicker, Select } from 'teaset';
import NavigationService from '../../Navigator/NavigationService';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../../components/NavBar/NavBar';
import NavigatorPage from '../../components/NavigatorPage';

export default class DatePicker extends NavigatorPage {
  static defaultProps = {
    ...NavigatorPage.navigatorStyle,
    title: '其他测试',
    showBackButton: false
  };

  constructor(props) {
    super(props);
    this.items = [
      "Aged Pu'er",
      'Bohea',
      'Chrysanthemum',
      'Hyson',
      'Jasmine',
      'Keemun',
      'Loungjing',
      'Pekoe',
      'Tieguanyin'
    ];
    this.customItems = [
      {
        text: 'Long long long long long long long',
        value: 1
      },
      {
        text: 'Short',
        value: 2
      },
      {
        text: 'a',
        value: 3
      }
    ];
    Object.assign(this.state, {
      selectedIndex: null,
      modalSelectedIndex: null
    });
  }

  show(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      PopoverPicker.show(
        { x: pageX, y: pageY, width, height },
        this.items,
        this.state.selectedIndex,
        (item, index) => this.setState({ selectedIndex: index })
      );
    });
  }

  showModal(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      PopoverPicker.show(
        { x: pageX, y: pageY, width, height },
        this.items,
        this.state.modalSelectedIndex,
        (item, index) => this.setState({ modalSelectedIndex: index }),
        { modal: true }
      );
    });
  }

  renderPage() {
    let { selectedIndex, modalSelectedIndex } = this.state;
    let selected = selectedIndex || selectedIndex === 0 ? this.items[selectedIndex] : null;
    let modalSelected = modalSelectedIndex || modalSelectedIndex === 0 ? this.items[modalSelectedIndex] : null;
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <Button title="go back" onPress={() => NavigationService.pop()} />
        <StatusBar barStyle="default" />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 20 }} />
          <ListRow
            title="Default"
            detail={selected}
            ref="defaultRow"
            onPress={() => this.show(this.refs['defaultRow'])}
            topSeparator="full"
          />
          <ListRow
            title="Modal"
            detail={modalSelected}
            ref="modalRow"
            onPress={() => this.showModal(this.refs['modalRow'])}
            bottomSeparator="full"
          />
        </ScrollView>
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    NavigationService.navigate('Auth', { userName: 'Lucy' });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
