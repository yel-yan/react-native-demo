import React from 'react';
import { StyleSheet, Text, View, FlatList, DeviceEventEmitter } from 'react-native';
import styleUtil from '../../common/styleUtil';
/*import LoadingMore from '../../components/load/LoadingMore';*/
/*import TopicItem from './TopicItem';*/
import NavigatorPage from '../../components/NavigatorPage';
import toast from '../../common/toast';
import config from '../../common/config';
import request from '../../common/request';

export default class TopicList extends NavigatorPage {
  static defaultProps = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.page = 1;
    this.total = 1;
    Object.assign(this.state, {
      user: props.user,
      list: [1, 2, 3, 4],
      isLoading: false, //上拉加载
      isRefreshing: false //下拉刷新
    });
    this._isMounted = false;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  _hasMore = () => {
    return this.state.list.length < this.total && this.total > 0;
  };

  _fetchMoreData = () => {};

  _renderFooter = () => {
    return null;
  };

  _renderRows = ({ item, separators, index }) => {
    return (
      <View>
        <Text>测试出测试测</Text>
      </View>
    );
  };

  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    console.log(viewableItems, changed);
  };

  renderPage() {
    return (
      <View style={styleUtil.container}>
        <FlatList
          data={this.state.list}
          // extraData={this.state}
          renderItem={this._renderRows}
          initialNumToRender={config.pageSize}
          keyExtractor={(item, index) => index.toString()}
          // ItemSeparatorComponent={this._itemSeparator}
          // ListEmptyComponent={}
          onEndReached={this._fetchMoreData}
          onEndReachedThreshold={0.3}
          // onRefresh={this._fetchDataWithRefreshing}
          refreshing={this.state.isRefreshing}
          ListFooterComponent={this._renderFooter}
          onViewableItemsChanged={this._onViewableItemsChanged}
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({})
