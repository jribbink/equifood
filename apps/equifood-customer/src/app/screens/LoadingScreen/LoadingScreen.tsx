import React from 'react';
import { StyleSheet, View, Modal, Text, ActivityIndicator } from 'react-native';

function LoadingScreen() {
  return (
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorSpacer}>
        <ActivityIndicator
          style={styles.activityIndicatorWrapper}
          animating={true}
          color="primary.500"
        />
        <Text style={styles.activityIndicatorText}>Food for thought!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicatorSpacer: {
    paddingTop: 10,
    borderRadius: 30,
    backgroundColor: '#DDDDDD',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicatorText: {
    height: 30,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 5,
    textAlign: 'center',
  },
});

export default LoadingScreen;
