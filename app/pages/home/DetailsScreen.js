/**
 * WeiZHou React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Text, Button, View, AsyncStorage, StyleSheet, TextInput, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../../components/NavBar/NavBar';
import styleUtil from '../../common/styleUtil';
import util from '../../common/util';
import config from '../../common/config';
import NavigatorPage from '../../components/NavigatorPage';
import OverlayModal from '../../components/OverlayModal';
import DatePicker from '../../components/DatePicker';
import TextInputC from '../../components/TextInputC';
import { Theme, ListRow } from 'teaset';

const MAX_LENGTH = 200;
const COMPOSER_HEIGHT = 200;
const OPTION_TYPES = ['点击选择', '单选', '多选'];

export default class DetailsScreen extends NavigatorPage {
  static defaultProps = {
    ...NavigatorPage.navigatorStyle,
    title: '详情',
    showBackButton: false
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      remainLength: MAX_LENGTH,
      text: '',
      selection: { start: 0, end: 0 },
      optionType: 1,
      user: config.user
    });
  }

  onChangeText = text => {
    let remainLength = MAX_LENGTH - text.length;
    this.setState({
      text,
      remainLength
    });
  };

  showDatePicker = () => {
    let user = this.state.user;
    let arr = user.birth.split('-');
    OverlayModal.show(
      <DatePicker
        selectedYear={arr[0]}
        selectedMonth={arr[1]}
        selectedDate={arr[2]}
        onDone={arr => {
          user.birth = arr.join('-');
          this.updateUser(user, { birth: util.formatBirth(arr) });
        }}
      />
    );
  };

  selectOptionType = () => {
    let items = [
      {
        title: '单选',
        onPress: _ => this.setState({ optionType: 1 })
      },
      {
        title: '多选',
        onPress: _ => this.setState({ optionType: 2 })
      }
    ];
    config.showAction(items);
  };

  renderInput = () => {
    return (
      <View style={{ height: COMPOSER_HEIGHT }}>
        <TextInput
          ref={component => (this._textInput = component)}
          style={styles.textInput}
          onChangeText={this.onChangeText}
          value={this.state.text}
          autoCapitalize={'none'}
          returnKeyType={'done'}
          maxLength={MAX_LENGTH}
          blurOnSubmit={true}
          multiline={true}
          textInputAutoFocus={true}
          placeholder={'你希望了解对方什么？脑洞有多大，舞台就有多大~'}
          // onSubmitEditing={this.props.onSubmitEditing}
          // onChange={this.onContentSizeChange}
          // onContentSizeChange={this.onContentSizeChange}
          enablesReturnKeyAutomatically
          underlineColorAndroid="transparent"
          selection={this.state.selection}
          onSelectionChange={({ nativeEvent: { selection } }) => {
            this.setState({ selection });
          }}
          // onFocus={_ => this.onTogglePress(false, true)}
          // onBlur={_ => this.onTogglePress(undefined, false)}
        />
        <Text
          style={{
            color: this.state.remainLength <= 0 ? 'red' : '#337ab7',
            textAlign: 'right'
          }}
        >
          {this.state.remainLength}
        </Text>
      </View>
    );
  };

  renderPage() {
    let { user, text, remainLength } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>{/*<View style={styles.inputContainer}>{this.renderInput()}</View>*/}</View>
        <View style={styles.header}>
          <View style={styles.inputContainer}>
            <TextInputC
              placeholder={'脑洞有多大，舞台就有多大~'}
              style={styles.textInput}
              MAX_LENGTH={200}
              remainLength={remainLength}
              COMPOSER_HEIGHT={100}
              onChangeText={this.onChangeText}
            />
          </View>
        </View>
        <Text>{text}</Text>
        <View style={{ marginTop: 10 }}>
          <ListRow
            title={'选项类型'}
            detail={OPTION_TYPES[this.state.optionType]}
            onPress={this.selectOptionType}
            topSeparator={'full'}
          />
          <ListRow
            title={'生日'}
            detail={
              <Text
                style={{
                  color: styleUtil.detailTextColor
                }}
              >
                {util.formatBirth(user.birth.split('-'))}
              </Text>
            }
            onPress={this.showDatePicker}
          />
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 20
            }}
          >
            <Button
              activeOpacity={0.7}
              title={'立即充值'}
              size={'xl'}
              titleStyle={{
                color: 'white',
                fontSize: 18
              }}
              onPress={this.recharge}
              style={{
                borderRadius: 5,
                borderColor: '#C30',
                backgroundColor: '#C30',
                paddingVertical: 12,
                paddingHorizontal: 10
              }}
            />
          </View>
          {/*<ListRow title={'分类'} detail={this.state.categoryName} onPress={this.renderCategory} />*/}
          {/*<ListRow title={'限制作答'} detail={LIMIT_TYPES[this.state.limitType]} onPress={this.selectLimitType} />*/}
          {/*<ListRow*/}
          {/*title={'是否匿名发布'}*/}
          {/*detail={<Switch value={this.state.isHidden} onValueChange={isHidden => this.setState({ isHidden })} />}*/}
          {/*bottomSeparator={'full'}*/}
          {/*/>*/}
        </View>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Home');
  };
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: Theme.tvBarSeparatorWidth,
    borderBottomColor: '#ccc'
  },
  inputContainer: {
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#ccc',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 14,
    textAlignVertical: 'top'
  }
});
