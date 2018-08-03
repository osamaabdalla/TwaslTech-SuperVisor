import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Style from '../stylesheets/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var {width, height} = Dimensions.get('window');

export default class HajjBusses extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      campaginnumber: '',
      supervisornumber: '',
    }
  }

  changeHajjBuss(name){
    console.log('changeHajjBuss');
    Alert.alert(
      'Success',
      '\n'+'Hajj NO : '+this.props.hajjnumber+' \n has been moved to '+name+' bus',
      [
        {text: 'OK', onPress: () => Actions.Home({type:'reset'})},
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
          <View style={[Style.logoSection,{height:150}]} >
            <Image source={require('../images/logo.png')} style={[Style.lSLogo,{marginTop:-50,marginBottom:-130}]} />
            <Image source={require('../images/mashaer.png')} style={Style.lSMashaer} />
          </View>
          <View style={[Style.languagesSection,{height:height-150}]} >
            <Text style={[Style.textTitle,{color:'black'}]} >{'Select a new Bus for Hajj NO : '+ this.props.hajjnumber}</Text>

            <View style={{height:1,backgroundColor:'#ddd',width:width}} ></View>

            <View style={{width:width,flexDirection:'column',justifyContent:'flex-start'}} >
             <TouchableOpacity style={Style.sBussButton} onPress={()=>this.changeHajjBuss('Khalid Mohammed')} >
               <Image source={require('../images/buss.png')} style={Style.bussLogo} />
               <Text style={[Style.langTitle,{color:'#333'}]} > Khalid Mohammed </Text>
               <Text style={[Style.langTitle,{color:'#333'}]} > {'19/20'} </Text>
             </TouchableOpacity>
             <TouchableOpacity style={Style.sBussButton} onPress={()=>this.changeHajjBuss('Abdalla Alhzim')} >
               <Image source={require('../images/buss.png')} style={Style.bussLogo} />
               <Text style={[Style.langTitle,{color:'#333'}]} > Abdalla Alhzim </Text>
               <Text style={[Style.langTitle,{color:'#333'}]} > {'12/25'} </Text>
             </TouchableOpacity>
             <TouchableOpacity style={Style.sBussButton} onPress={()=>this.changeHajjBuss('Mohammed Alomar')} >
               <Image source={require('../images/buss.png')} style={Style.bussLogo} />
               <Text style={[Style.langTitle,{color:'#333'}]} > Mohammed Alomar </Text>
               <Text style={[Style.langTitle,{color:'#333'}]} > {'13/20'} </Text>
             </TouchableOpacity>
             <TouchableOpacity style={Style.sBussButton} onPress={()=>this.changeHajjBuss('Hassan Alali')} >
               <Image source={require('../images/buss.png')} style={Style.bussLogo} />
               <Text style={[Style.langTitle,{color:'#333'}]} > Hassan Alali </Text>
               <Text style={[Style.langTitle,{color:'#333'}]} > {'20/20'} </Text>
             </TouchableOpacity>
             </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
