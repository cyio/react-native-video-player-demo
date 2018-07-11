/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  PanResponder,
} from 'react-native'
import VideoPlayer from 'react-native-video-controls'
import DeviceBrightness from 'react-native-device-brightness'

export default class App extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      paused: true,
      bg: 'white',
      top: 0,
      left: 0,
      brightness: 1,
      // url: 'http://pub.dotabocai.com/sample-small.mp4',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
    }
  }

  setBrightness(n) {
    DeviceBrightness.setBrightnessLevel(n)
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this._top = this.state.top
        this._left = this.state.left
        this.setState({ bg: 'red' })
      },
      onPanResponderMove: (evt, gs) => {
        console.log(gs.dx + ' ' + gs.dy)
        this.setState({
          top: this._top + gs.dy,
          left: this._left + gs.dx,
        })
      },
      onPanResponderRelease: (evt, gs) => {
        this.setState({
          bg: 'white',
        })
      },
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.playerWrapper]}>
          <VideoPlayer
            source={{ uri: this.state.url }}
            paused={this.state.paused}
            setBrightness={this.setBrightness.bind(this)}
          />
        </View>
        <View style={[]}>
          <Button
            onPress={() => {
              DeviceBrightness.setBrightnessLevel(Math.random())
            }}
            title="set brightness"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  playerWrapper: {
    backgroundColor: '#000',
    height: 220,
  },
  video: {
    // 必须，否则会看不到视频
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  rect: {
    position: 'absolute',
    top: 30,
    backgroundColor: 'red',
    right: 10,
    width: 60,
    height: 140,
    borderWidth: 1,
    borderColor: 'black',
  },
})
// <VideoPlayer
// source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
// />
// <View
// {...this._panResponder.panHandlers}
// style={styles.rect}>
// </View>
