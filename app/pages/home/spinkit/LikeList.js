import React from 'react';
import { View, Text, FlatList } from 'react-native';

import LoadingMore from '../../../components/load/LoadingMore';
import Separator from '../../../components/Separator';
import styleUtil from '../../../common/styleUtil';
import NavigatorPage from '../../../components/NavigatorPage';

export default class LikeList extends NavigatorPage {
  static defaultProps = {
    ...NavigatorPage.navigatorStyle,
    title: '列表',
    showBackButton: false
  };

  constructor(props) {
    super(props);
    this.page = 1;
    this.total = 0;
    this.state = {
      list: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this._fetchLikeList();
  }

  componentWillUnmount() {}

  _fetchLikeList = () => {
    this.setState({
      isLoading: true
    });
    setTimeout(_ => {
      this.setState({
        isLoading: false
      });
    }, 10000);
  };

  _renderFooter = () => {
    return <LoadingMore hasMore={this._hasMore()} total={this.total} />;
  };

  _hasMore = () => {
    return 1; //this.state.list.length < this.total && this.total > 0;
  };

  _fetchMoreData = () => {
    if (this._hasMore() && !this.state.isLoading) {
      this._fetchLikeList(this.page);
    }
  };

  _renderRows = ({ item, separators, index }) => {
    return (
      <View>
        <Text>列表</Text>
      </View>
    );
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
          onEndReached={this._fetchMoreData}
          onEndReachedThreshold={0.3}
          ListFooterComponent={this._renderFooter}
        />
      </View>
    );
  }
}
