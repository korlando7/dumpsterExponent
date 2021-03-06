import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../../modules/app/actions';
import { LoadingPage } from '../../components';

import Expo, {
  Asset,
} from 'expo';
const gifAddress = require('../../assets/images/DumpLoopTrans2.gif');
import Api from '../../api/api.js';

class SplashPage extends React.Component {

  static navigationOptions = {
    title: 'Home',
    header: null
  };

  state = {
    isReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    await Promise.all([
      Asset.fromModule(gifAddress).downloadAsync(),
    ]);
    Api.getNewsSources();
    this.setState({ isReady: true });
  }

  _navigateToAdThenScreen = (screen) => {
    this.props.navigation.navigate(screen)
  }

  render() {

    if (!this.state.isReady) {
      return (
        <LoadingPage />
      )
    }

    return (
      <View style={ styles.container }>
        <View style={ styles.statusBarUnderlay } />

        <Text style={ styles.dumpsterTitle }> DUMPSTER </Text>

        <Image
          style={ styles.gifContainer }
          source={ require('../../assets/images/DumpLoopTrans2.gif') }
          resizeMode="contain"
        />

        <View>
          <TouchableHighlight
            onPress= { () => this._navigateToAdThenScreen('Trivia') }
            style={ styles.button }>
            <Text style={ styles.buttonText }>
              Trivia Builder
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress= { () => this._navigateToAdThenScreen('Vocab') }
            style={ styles.button }>
            <Text style={ styles.buttonText }>
              Vocab Builder
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

SplashPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  toggleLoggedIn: PropTypes.func.isRequired,
};

// all state and dispatch actions - this could get messy
export default connect(
  (state) => ({
    loggedIn: state.Dumpster.loggedIn,
    playAsGuest: state.Dumpster.playAsGuest,
    username: state.Dumpster.username,
  }),
  (dispatch) => ({
    toggleLoggedIn: () => dispatch(actions.toggleLoggedIn()),
    togglePlayAsGuest: () => dispatch(actions.togglePlayAsGuest()),
  })
)(SplashPage)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dumpsterTitle: {
    marginTop: 5,
    fontSize: 32,
  },
  gifContainer: {
    width: 300,
    height: 360,
    backgroundColor: 'white',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  buttonText: {
    fontSize: 20,
  },
  button: {
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 4,
    width: 250,
    alignItems: 'center',
    height: 30,
  },
});
