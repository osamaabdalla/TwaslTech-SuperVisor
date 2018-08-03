import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, Linking, Modal, TouchableWithoutFeedback} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Style from '../stylesheets/styles';
import MapView from 'react-native-maps';

var self;

export default class Home extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      supervisornumber:'',
      campaginnumber:'',
      region: {
        latitude: 21.613857,
        longitude: 39.155606,
        latitudeDelta: 0.012653,
        longitudeDelta: 0.012023,
      },
      coordinate: {
        latitude: 21.613857,
        longitude: 39.155606,
      },
      message:'',
      modalVisible: false,
      hajjModalVisible: false,
      modalMessageVisible: false,
      hajjs: [
        {
          name : 'Omar Ali',
          latlng : { latitude: 21.617397, longitude: 39.157190 },
          description : 'description',
          number : 1,
          mobile : '009664233464532',
        },
        {
          name : 'Ali Ahmed',
          latlng : { latitude: 21.615803, longitude: 39.154774 },
          description : 'description',
          number : 2,
          mobile : '00966434345321',
        },
        {
          name : 'Ahmed Sami',
          latlng : { latitude: 21.612984, longitude: 39.157615 },
          description : 'description',
          number : 3,
          mobile : '00966328210010',
        },
        {
          name : 'Sami Osama',
          latlng : { latitude: 21.612060, longitude: 39.155388 },
          description : 'description',
          number : 4,
          mobile : '009664233464532',
        },
        {
          name : 'Osama Omar',
          latlng : { latitude: 21.616274, longitude: 39.152520 },
          description : 'description',
          number : 5,
          mobile : '00966434345321',
        }
      ]
    }
    self = this;
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition((position) => {
        self.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.012653,
              longitudeDelta: 0.012023,
            },
            coordinate: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
        });
      },(error) => {
        console.log("location error", error);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  componentDidMount(){
    this.setState({
      supervisornumber:this.props.supervisornumber,
      campaginnumber:this.props.campaginnumber
    })
  }

  onRegionChange(region) {
    console.log('region', region);
    self.setState({ region });
  }

  showHideBusModal(){
    this.setState({modalVisible: !this.state.modalVisible});
  }

  confimBusChange(){
    Alert.alert(
      'Success',
      '\n Your request has been sent to the Hajj',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  showRequestResons(){
    this.setState({modalVisible: !this.state.modalVisible});

    setTimeout(function () {
      Alert.alert(
        'Select Change Reason',
        '\n',
        [
          {text: 'I will late', onPress: () => self.confimBusChange()},
          {text: 'I Lost my way', onPress: () => self.confimBusChange()},
          {text: 'Emergney issue', onPress: () => self.confimBusChange()},
          {text: 'I need More time', onPress: () => self.confimBusChange()},
          {text: 'Cancel Request', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }, 100);
  }

  sendMessage(){
    console.log('sendMessage');
    this.setState({hajjModalVisible: !this.state.hajjModalVisible});
    setTimeout(function () {
      self.setState({modalMessageVisible: !self.state.modalMessageVisible});
    }, 100);
  }

  sendMessageDone(){
    if(self.state.message){
      this.setState({modalMessageVisible: !this.state.modalMessageVisible});
      setTimeout(function () {
        Alert.alert(
          'Success',
          '\n Your message has been sent to the Hajj',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }, 100);
    }else {
      Alert.alert(
        'Sorry',
        '\n Please enter your message',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  notAvailable(){
    Alert.alert(
      'Sorry',
      '\n Medical history is not available',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  showHajjModall(marker){
    this.setState({
      hajjModalVisible: !this.state.hajjModalVisible,
      markermobile:marker.mobile,
      markername :marker.name,
      markernumber :marker.number,
    });
  }

  render() {
    return (
      <View style={Style.container} >

        <MapView
          provider="google"
          showsCompass={true}
          rotateEnabled={true}
          zoomControlEnabled={true}
          initialRegion={this.state.region}
          style={Style.map}
         >
         <MapView.Marker
           coordinate={this.state.coordinate}
           title={'The Bus location'}
           onPress={()=>this.showHideBusModal()}
         >
         <Image
           source={require('../images/busPin.png')}
           style={{width:40,height:60}}
           resizeMode="contain"
         />
       </MapView.Marker>

          {this.state.hajjs.map((marker, index) => (
            <MapView.Marker
              key={"hajjindex"+index}
              coordinate={marker.latlng}
              title={marker.name}
              onPress={()=>self.showHajjModall(marker)}
            >
              <Image
                source={require('../images/othersHajjsPin.png')}
                style={{width:40,height:60}}
                resizeMode="contain"
              />
            </MapView.Marker>
          ))}
        </MapView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.hajjModalVisible}
          >
          <View style={Style.busModalContainer} >

            <TouchableOpacity style={[Style.supreVisorRow,{width:40,position:'absolute',top:5,left:10,zIndex:9999999}]} onPress={()=>{this.setState({hajjModalVisible: !this.state.hajjModalVisible})}} >
              <Image source={require('../images/close.png')} style={{width:20,height:20,marginRight:8}} />
            </TouchableOpacity>

            <View style={Style.titlePopButton} >
              <Text style={Style.langTitleRev} > Hajj Details </Text>
            </View>

            <View style={Style.supreVisorRow} >
              <Image source={require('../images/hajj.png')} style={{width:20,height:20,marginRight:8}} />
              <Text>{self.state.markername}</Text>
            </View>

            <TouchableOpacity style={Style.supreVisorRow} onPress={()=>{Linking.openURL('tel://'+self.state.markermobile)}} >
              <Image source={require('../images/mobile.png')} style={{width:20,height:20,marginRight:8}} />
              <Text >{self.state.markermobile}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Style.supreVisorRow} onPress={()=>{this.sendMessage()}} >
              <Image source={require('../images/message.png')} style={{width:20,height:20,marginRight:8}} />
              <Text>Send Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Style.supreVisorRow} onPress={()=>{this.notAvailable()}} >
              <Image source={require('../images/medical.png')} style={{width:20,height:20,marginRight:8}} />
              <Text >Medical History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Style.hideButton} onPress={()=>{this.setState({hajjModalVisible: !this.state.hajjModalVisible}); Actions.hajjBusses({hajjnumber:this.state.markernumber})}} >
              <Text style={Style.langTitleRev} > Change Hajj Bus </Text>
            </TouchableOpacity>

          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          >
          <View style={Style.busModalContainer} >

            <View style={Style.titlePopButton} >
              <Text style={Style.langTitleRev} > My Bus </Text>
            </View>

            <View style={Style.supreVisorRow} >
              <Text>15/20 Hajjs</Text>
            </View>

            <TouchableOpacity style={Style.hideButton} onPress={()=>this.showHideBusModal()} >
              <Text style={Style.langTitleRev} > hide </Text>
            </TouchableOpacity>

          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalMessageVisible}
          >
          <View style={Style.busModalContainer} >

            <View style={Style.titlePopButton} >
              <Text style={Style.langTitleRev} > Enter your message </Text>
            </View>

            <View style={Style.supreVisorRow} >
              <TextInput
                style={[Style.TextAreaInput,{marginTop:90}]}
                onChangeText={(text) => this.setState({message:text})}
                value={this.state.message}
                placeholder="Enter your message here"
              />
            </View>

            <View style={Style.mainHideButton} >
              <TouchableOpacity style={Style.seminHideButton} onPress={()=>this.sendMessageDone()} >
                <Text style={Style.langTitleRev} > Send </Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.seminHideButton} onPress={()=>this.setState({modalMessageVisible:false})} >
                <Text style={Style.langTitleRev} > Cancel </Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>

      </View>
    );
  }
}
