/**
 * WeiZHou React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  Text,
  Button,
  View,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../../components/NavBar/NavBar';
import NavigatorPage from '../../components/NavigatorPage';
import styleUtil from '../../common/styleUtil';
import { NavigationBar } from 'teaset';
import NavigationService from '../../Navigator/NavigationService';

export default class SignInScreen extends NavigatorPage {
  static defaultProps = {
    ...NavigatorPage.navigatorStyle,
    title: '登录',
    // showBackButton: false,
    leftView: <NavigationBar.LinkButton title={'关闭'} onPress={_ => NavigationService.popToTop()} />
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, { account: '', password: '', secureTextEntry: true });
  }

  _btnStyle = bool => (bool ? styleUtil.themeColor : styleUtil.disabledColor);

  renderPage() {
    const { account, password, secureTextEntry } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.signUpBox}>
          <TextInput
            placeholder="请输入账号"
            autoCorrect={false}
            autoCapitalize={'none'}
            underlineColorAndroid="transparent"
            style={styles.inputField}
            value={account}
            maxLength={30}
            onChangeText={text => {
              this.setState({ account: text });
            }}
          />
          <View
            style={[
              styles.inputField,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }
            ]}
          >
            <TextInput
              placeholder="请输入密码"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              secureTextEntry={secureTextEntry}
              style={{ flex: 1, height: 40 }}
              value={password}
              maxLength={30}
              onChangeText={text => {
                this.setState({ password: text });
              }}
            />
            <Icon
              name={secureTextEntry ? 'visibility-off' : 'visibility'}
              size={20}
              onPress={_ => this.setState({ secureTextEntry: !secureTextEntry })}
            />
          </View>
          <TouchableOpacity
            activeOpacity={account.length > 0 && password.length > 0 ? 0.5 : 1}
            style={[
              styles.buttonBox,
              {
                backgroundColor: this._btnStyle(account.length > 0 && password.length > 0),
                borderColor: this._btnStyle(account.length > 0 && password.length > 0)
              }
            ]}
            onPress={this._signInAsync}
          >
            <Text style={styles.buttonText}>登录</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Home');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleUtil.backgroundColor
  },
  signUpBox: {
    marginTop: 10,
    padding: 10
  },
  title: {
    marginBottom: 20,
    color: '#333',
    fontSize: 20,
    textAlign: 'center'
  },
  inputField: {
    height: 40,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: styleUtil.borderSeparator,
    borderColor: styleUtil.borderColor,
    borderRadius: 4,
    marginVertical: 5
  },
  buttonBox: {
    backgroundColor: styleUtil.themeColor,
    padding: 12,
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    borderColor: styleUtil.themeColor,
    borderRadius: 4
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  passwordBox: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  countBtn: {
    width: 110,
    height: 40,
    padding: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: styleUtil.themeColor,
    backgroundColor: styleUtil.themeColor,
    borderRadius: 4
  },
  countBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16
  },
  closeModal: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  }
});
