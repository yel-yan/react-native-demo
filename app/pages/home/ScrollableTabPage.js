/**
 * WeiZHou React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationBar } from 'teaset';
import styleUtil from '../../common/styleUtil';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../components/tabbar/TabBar';
import NavBar from '../../components/NavBar/NavBar';
import NavigatorPage from '../../components/NavigatorPage';
import TopicList from './TopicList';

export default class ScrollableTabPage extends NavigatorPage {
  static defaultProps = {
    title: '首页',
    showBackButton: false,
    navBarHidden: true,
    navigationBarInsets: false,
    leftHidden: true
  };

  constructor(props) {
    super(props);
    let tabs = [{ name: '最新', uri: null }, { name: '热门', uri: null }];
    if (props.leftHidden) {
      tabs.push({ name: '关注', uri: null });
    }
    Object.assign(this.state, {
      tabs,
      activeIndex: 0,
      fromIndex: 0
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onChangeTab = ({ i, ref, from }) => {
    console.log(from);
    if (this.state.activeIndex !== i) {
      this.setState({
        activeIndex: i,
        fromIndex: from
      });
    }
  };

  renderNavBar = props => {
    console.log(props, 'aaaaaaaaaaaaaaaa');
    return (
      <NavBar
        renderTitleView={
          <TabBar
            activeTextColor={styleUtil.activeTextColor}
            fromIndex={this.state.fromIndex}
            inactiveTextColor={styleUtil.inactiveTextColor}
            underlineStyle={styleUtil.underlineStyle}
            tabContainerWidth={210}
            style={{
              width: 210,
              paddingTop: 10,
              borderBottomWidth: 0
            }}
            {...props}
            tabs={this.state.tabs}
          />
        }
        leftHidden={this.props.leftHidden}
        renderLeftView={this.props.renderLeftView}
        renderRightView={
          <View style={{ flexDirection: 'row' }}>
            <NavigationBar.IconButton icon={require('../../icons/edit.png')} />
            <NavigationBar.IconButton icon={require('../../icons/trash.png')} />
          </View>
        }
      />
    );
  };

  renderPage() {
    const { tabs, activeIndex, leftHidden } = this.state;
    const { getListType } = this.props;
    console.log(this.props);
    return (
      <ScrollableTabView
        tabBarPosition={'top'}
        renderTabBar={this.renderNavBar}
        onChangeTab={this.onChangeTab}
        initialPage={0}
      >
        {tabs.map((item, i) => (
          <TopicList
            key={i}
            {...this.props}
            tabLabel={item.name}
            uri={item.uri}
            activeIndex={activeIndex}
            leftHidden={leftHidden}
            getListType={getListType}
          />
        ))}
      </ScrollableTabView>
    );
  }
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleUtil.backgroundColor
  },
  label: {
    fontSize: 14,
    fontWeight: '700'
  }
});
*/
