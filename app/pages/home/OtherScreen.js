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

export default class OtherScreen extends NavigatorPage {
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
      modalSelectedIndex: null,
      valueSM: null,
      valueMD: null,
      valueLG: null,
      valueAuto: null,
      valuePull: null,
      valuePopover: null,
      valueReadonly: 'Readonly',
      valueDisable: null,
      valueCustom: null
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
    let {
      valueSM,
      valueMD,
      valueLG,
      valueAuto,
      valuePull,
      valuePopover,
      valueReadonly,
      valueDisable,
      valueCustom
    } = this.state;
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

          <View style={{ height: 20 }} />
          <ListRow
            title="Size sm"
            detail={
              <Select
                style={{ width: 200 }}
                size="sm"
                value={valueSM}
                items={this.items}
                placeholder="Select item"
                pickerTitle="Size sm"
                onSelected={(item, index) => this.setState({ valueSM: item })}
              />
            }
            topSeparator="full"
          />
          <ListRow
            title="Size md"
            detail={
              <Select
                style={{ width: 200 }}
                size="md"
                value={valueMD}
                items={this.items}
                placeholder="Select item"
                pickerTitle="Size md"
                onSelected={(item, index) => this.setState({ valueMD: item })}
              />
            }
          />
          <ListRow
            title="Size lg"
            detail={
              <Select
                style={{ width: 200 }}
                size="lg"
                value={valueLG}
                items={this.items}
                placeholder="Select item"
                pickerTitle="Size lg"
                onSelected={(item, index) => this.setState({ valueLG: item })}
              />
            }
            bottomSeparator="full"
          />
          <View style={{ height: 20 }} />
          <ListRow
            title="PickerType auto"
            detail={
              <Select
                style={{ width: 200 }}
                size="md"
                value={valueAuto}
                items={this.items}
                placeholder="Select item"
                pickerType="auto"
                pickerTitle="PickerType auto"
                onSelected={(item, index) => this.setState({ valueAuto: item })}
              />
            }
          />
          <ListRow
            title="PickerType pull"
            detail={
              <Select
                style={{ width: 200 }}
                size="md"
                value={valuePull}
                items={this.items}
                placeholder="Select item"
                pickerType="pull"
                pickerTitle="PickerType pull"
                onSelected={(item, index) => this.setState({ valuePull: item })}
              />
            }
          />
          <ListRow
            title="PickerType popover"
            detail={
              <Select
                style={{ width: 200 }}
                size="md"
                value={valuePopover}
                items={this.items}
                placeholder="Select item"
                pickerType="popover"
                pickerTitle="PickerType popover"
                onSelected={(item, index) => this.setState({ valuePopover: item })}
              />
            }
          />
          <View style={{ height: 20 }} />
          <ListRow
            title="Readonly"
            detail={
              <Select style={{ width: 200 }} placeholder="Select item" editable={false} value={valueReadonly} />
            }
            topSeparator="full"
          />
          <ListRow
            title="Disabled"
            detail={
              <Select
                style={{ width: 200 }}
                items={this.items}
                placeholder="Select item"
                disabled={true}
                value={valueDisable}
              />
            }
            bottomSeparator="full"
          />
          <View style={{ height: 20 }} />
          <ListRow
            title="Custom"
            detail={
              <Select
                style={{ width: 200, backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b' }}
                size="lg"
                value={valueCustom}
                valueStyle={{ flex: 1, color: '#8a6d3b', textAlign: 'right' }}
                items={this.customItems}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                icon={<Text style={{ color: '#8a6d3b', fontSize: 16, paddingRight: 4 }}>▼</Text>}
                placeholder="Select item"
                pickerTitle="Custom"
                onSelected={(item, index) => this.setState({ valueCustom: item.value })}
              />
            }
            topSeparator="full"
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
