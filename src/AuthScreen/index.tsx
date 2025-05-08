import { StyleSheet, View } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const AuthScreen = () => {
  return (
    <View style={styles.root}>
      <WebView style={styles.flex_1} source={{uri:'https://mini-app-web-eta.vercel.app' }} />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    flex_1: {
      flex: 1,
    },
});
