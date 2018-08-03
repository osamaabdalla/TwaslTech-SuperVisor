import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Scene, Router } from 'react-native-router-flux';
import Languages from './components/Languages';
import Home from './components/Home';
import HajjBusses from './components/HajjBusses';
import Style from './stylesheets/styles';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Router>
        <Scene key="root" >
          <Scene
            initial={true}
            key="Languages"
            title="Languages"
            component={Languages}
            backTitle=" "
            hideNavBar
          />
          <Scene
            key="Home"
            title="Home"
            component={Home}
            backTitle=" "
            hideNavBar
          />
          <Scene
            key="hajjBusses"
            title="Hajj Busess"
            component={HajjBusses}
            backTitle=" "
            navigationBarStyle={{backgroundColor:'#00aced'}}
            navBarButtonColor="#ffffff"
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
