import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Style from '../stylesheets/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Languages extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      campaginnumber: '',
      supervisornumber: '',
    }
  }

  changeLanguage(){
    console.log('changeLanguage');
    Alert.alert(
      'Sorry',
      '\n'+'This feature will be available soon.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  login(){
    console.log('login');
    if(!this.state.hajnumber){
      Alert.alert(
        'Sorry',
        '\n'+'Please Enter Campaign Number and Supervisor Number.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }else{
      Actions.Home({supervisornumber:this.state.supervisornumber,campaginnumber:this.state.campaginnumber});
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView bounces={false} >
        <View style={Style.container} >
          <View style={Style.logoSection} >
            <Image source={require('../images/logo.png')} style={Style.lSLogo} />
            <Image source={require('../images/mashaer.png')} style={Style.lSMashaer} />
          </View>
          <View style={Style.languagesSection} >
            <Text style={[Style.textTitle]} >{'Login'}</Text>

           <TouchableOpacity style={Style.sLangButton} onPress={()=>this.changeLanguage()} >
             <Image source={require('../images/en.png')} style={Style.lSLangLogo} />
             <Text style={Style.langTitle} > English </Text>
           </TouchableOpacity>

           <TextInput
             style={Style.TextInput}
             onChangeText={(text) => this.setState({hajnumber:text})}
             value={this.state.supervisornumber}
             keyboardType={'numeric'}
             placeholder="Enter Supervisor Number"
           />

           <TextInput
             style={Style.TextInput}
             onChangeText={(text) => this.setState({hajnumber:text})}
             value={this.state.campaginnumber}
             keyboardType={'numeric'}
             placeholder="Enter Campaign Number"
           />

           <TouchableOpacity style={Style.loginButton} onPress={()=>this.login()} >
             <Text style={Style.langTitleRev} > Login </Text>
           </TouchableOpacity>

          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
