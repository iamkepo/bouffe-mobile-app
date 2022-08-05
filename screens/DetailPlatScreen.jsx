import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favorieAction, panierAction } from '../store/ActivityActions';


import { normalize } from "../helper/fonts";

import PhotoComponent from '../components/PhotoComponent';
import HeaderComponent from '../components/HeaderComponent';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    favorieAction, 
    panierAction,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { data } = state
  return { data }
};

const screen = Dimensions.get("screen");

class DetailPlatScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      identify: "",
    };
    this.navigation = this.props.navigation;
    this.route = this.props.route;
  }

  componentWillUnmount() {
  }
  
  componentDidMount(){
    let stock = "";
    for (const key in this.route.params.item.restaurant.adresse.lieu[0].identify) {
      if (this.route.params.item.restaurant.adresse.lieu[0].identify[key] != null) {
        stock = stock + this.route.params.item.restaurant.adresse.lieu[0].identify[key] + ", "
      }
    }
    this.setState({identify: stock})
  }
  render(){    
    return (
      <SafeAreaView style={styles.container}>
        
        <HeaderComponent title={this.route.params.item.name} navigation={this.navigation} />

        <View style={{ width: "100%", height: "40%"}}>
          <PhotoComponent close={()=> this.props.parseAction(false)} item={this.route.params.item} />
        </View>

        <View style={{width: "100%", height: "60%",  padding: "5%", backgroundColor: "#FFF"}}>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Plat: </Text>
            <Text numberOfLines={2} style={{ width: "70%", fontWeight: "bold", color: "#000", fontSize: normalize(15), }}> {this.route.params.item.name}</Text>
          </View>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Prix: </Text>
            <Text numberOfLines={1} style={{ width: "70%", fontWeight: "bold", color: "#B51827", fontSize: normalize(15), }}> {this.route.params.item.prix} F </Text>
          </View>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Restaurant: </Text>
            <Text numberOfLines={1} style={{ width: "70%", fontWeight: "bold", color: "#000", fontSize: normalize(15), }}> {this.route.params.item.restaurant.name} </Text>
          </View>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Situé a: </Text>
            <Text numberOfLines={2} style={{ width: "70%", color: "#000", fontSize: normalize(15), }}> {this.state.identify} </Text>
          </View>
          
          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Numéro: </Text>
            <Text numberOfLines={1} style={{ width: "70%", fontWeight: "bold", color: "#B51827", fontSize: normalize(15), }}> {this.route.params.item.restaurant.adresse.contact.numero} </Text>
          </View>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Email: </Text>
            <Text numberOfLines={1} style={{ width: "70%", color: "#FDC800", fontSize: normalize(15), }}> {this.route.params.item.restaurant.adresse.contact.email} </Text>
          </View>
          
          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Site web: </Text>
            <Text numberOfLines={1} style={{ width: "70%", color: "#FDC800", fontSize: normalize(15), }}> {this.route.params.item.restaurant.adresse.contact.web} </Text>
          </View>

        </View>
          <StatusBar style="auto" />
      </SafeAreaView> 
    );
  }
}
const styles = StyleSheet.create({
  container:{
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: '#000000AA',
  },
  title: {
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "justify",
    fontSize: 15
  },
  text: {
    width: "70%",
    marginVertical: 10,
  },
  linking: {
    marginVertical: 10,
    textAlign: "justify",
    color: "#00B"
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailPlatScreen);