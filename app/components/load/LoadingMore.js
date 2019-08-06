/**
 * WeiZHou React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
/*import ImageCached from '../ImageCached';*/
import Spinkit from 'react-native-spinkit';
import styleUtil from '../../common/styleUtil';

type Props = {
  hasMore: boolean,
  showText: boolean,
  showSimple: boolean,
  text: string,
  type: string,
  icon: Image
};

export default class LoadingMore extends Component<Props> {
  static defaultProps = {
    hasMore: true,
    showText: true,
    text: '——  我是有底线的  ——',
    icon: require('../../assets/image/blank.png'),
    type: 'Wave', //ThreeBounce
    showSimple: false
  };

  render() {
    let { hasMore, showText, text, icon } = this.props;
    if (hasMore) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {!this.props.showSimple ? (
            <Spinkit type={this.props.type} color={styleUtil.themeColor} />
          ) : (
            <ActivityIndicator color={'#666'} style={styles.loadingMore} size="small" {...this.props} />
          )}
        </View>
      );
    }
    if (!hasMore && showText) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <Text style={{ fontSize: 14, color: '#666' }}>{text}</Text>
        </View>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  loadingMore: {
    marginVertical: 10
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10
  }
});
