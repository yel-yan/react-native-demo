// /**
//  * WeiZHou React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import NavigatorPage from '../../../components/NavigatorPage';
// import { colors } from '../../../assets/styles/colors-theme';
// // const Realm = require('realm');
// // let realm = new Realm({ schema: [{ name: 'Dog', properties: { name: 'string' } }] });
// export default class RealmTestScreen extends NavigatorPage {
//   static defaultProps = {
//     ...NavigatorPage.navigatorStyle,
//     title: 'Realm',
//     showBackButton: false
//   };
//   constructor(props) {
//     super(props);
//     this.state = { realm: null };
//   }
//
//   componentWillMount() {
//     // Realm.open({
//     //   schema: [{ name: 'Dog', properties: { name: 'string' } }]
//     // }).then(realm => {
//     //   realm.write(() => {
//     //     realm.create('Dog', { name: 'Rex' });
//     //   });
//     //   this.setState({ realm });
//     // });
//   }
//
//   renderPage() {
//     const info = this.state.realm ? 'Number of dogs in this Realm: ' : 'Loading...';
//
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>{info}</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   welcome: {
//     flex: 1
//   }
// });
