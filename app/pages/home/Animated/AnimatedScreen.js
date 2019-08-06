/**
 * WeiZHou React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Text, Button, View, AsyncStorage, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../../../components/NavBar/NavBar';
import NavigatorPage from '../../../components/NavigatorPage';

export default class AnimatedScreen extends NavigatorPage {
  static defaultProps = {
    ...NavigatorPage.navigatorStyle,
    title: '动画测试',
    showBackButton: false
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, { fadeAnim: new Animated.Value(0) });
    this.anim = this.anim || new Animated.Value(0);
    this.anims = this.anims || [1, 2, 3].map(() => new Animated.Value(0));
  }

  componentDidMount() {
    Animated.timing(
      // 随时间变化而执行动画
      this.state.fadeAnim, // 动画中的变量值
      {
        toValue: 1, // 透明度最终变为1，即完全不透明
        duration: 1000 // 让动画持续一段时间
      }
    ).start(); // 开始执行动画
    Animated.spring(this.anim, {
      toValue: 0, // Returns to the start
      velocity: 3, // Velocity makes it move
      tension: -10, // Slow
      friction: 1 // Oscillate a lot
    }).start();
  }

  startAnimated = () => {
    const timing = Animated.timing;
    Animated.sequence([
      // One after the other
      timing(this.anims[0], {
        toValue: 200,
        easing: Easing.linear
      }),
      Animated.delay(400), // Use with sequence
      timing(this.anims[0], {
        toValue: 0,
        easing: Easing.elastic(2) // Springy
      }),
      Animated.delay(400),
      Animated.stagger(
        200,
        this.anims
          .map(anim => timing(anim, { toValue: 200 }))
          .concat(this.anims.map(anim => timing(anim, { toValue: 0 })))
      ),
      Animated.delay(400),
      Animated.parallel(
        [
          Easing.inOut(Easing.quad), // Symmetric
          Easing.back(1.5), // Goes backwards first
          Easing.ease // Default bezier
        ].map((easing, ii) =>
          timing(this.anims[ii], {
            toValue: 320,
            easing,
            duration: 3000
          })
        )
      ),
      Animated.delay(400),
      Animated.stagger(
        200,
        this.anims.map(anim =>
          timing(anim, {
            toValue: 0,
            easing: Easing.bounce, // Like a ball
            duration: 2000
          })
        )
      )
    ]).start();
  };

  renderPage() {
    let { fadeAnim } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Animated.View // 使用专门的可动画化的View组件
          style={{
            ...this.props.style,
            opacity: fadeAnim, // 将透明度指定为动画变量值
            transform: [
              {
                translateX: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [150, 0] // 0 : 150, 0.5 : 75, 1 : 0
                })
              }
            ]
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 250, height: 50, backgroundColor: 'powderblue' }}>
              <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>Fading in</Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                // Array order matters
                {
                  scale: this.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 4]
                  })
                },
                {
                  translateX: this.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 500]
                  })
                },
                {
                  rotate: this.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      '0deg',
                      '360deg' // 'deg' or 'rad'
                    ]
                  })
                }
              ]
            }
          ]}
        >
          <Text>Transforms!</Text>
        </Animated.View>
        {['Composite', 'Easing', 'Animations!'].map((text, ii) => (
          <Animated.View
            key={text}
            style={[
              styles.content,
              {
                left: this.anims[ii]
              }
            ]}
          >
            <Text>{text}</Text>
          </Animated.View>
        ))}
        <Button title={'动画'} onPress={() => this.startAnimated()} />
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
  },
  content: {
    backgroundColor: 'deepskyblue',
    borderWidth: 1,
    borderColor: 'dodgerblue',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center'
  }
});
