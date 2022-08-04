import React from 'react';
import { StyleSheet, Text, View, Dimensions, Linking } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favorieAction, panierAction } from '../store/ActivityActions';

import PhotoComponent from '../components/PhotoComponent';

import { normalize } from "../helper/fonts";

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
class DetailPlatComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      identify: "",
    };
  }

  componentWillUnmount() {
  }
  
  componentDidMount(){
    let stock = "";
    for (const key in this.find_id().adresse.lieu[0].identify) {
      if (this.find_id().adresse.lieu[0].identify[key] != null) {
        stock = stock + this.find_id().adresse.lieu[0].identify[key] + ", "
      }
    }
    this.setState({identify: stock})
  }
  find_id() {
    return this.props.data.list.resto.find(el => el._id == this.props.data.objet.restaurant)
  }
  render(){    
    return (
      <View style={styles.container}>

        <View style={{ width: "95%", height: "40%", backgroundColor: "#FFF"}}>
          <PhotoComponent close={()=> this.props.parseAction(false)} item={this.props.data.objet} />
        </View>

        <View style={{width: "95%", height: "50%",  padding: "5%", backgroundColor: "#FFF"}}>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Restaurant: </Text>
            <Text numberOfLines={1} style={{ width: "70%", fontWeight: "bold", color: "#000", fontSize: normalize(15), }}> {this.find_id().name} </Text>
          </View>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Situé a: </Text>
            <Text numberOfLines={2} style={{ width: "70%", color: "#000", fontSize: normalize(15), }}> {this.state.identify} </Text>
          </View>
          
          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Numéro: </Text>
            <Text numberOfLines={1} style={{ width: "70%", fontWeight: "bold", color: "#B51827", fontSize: normalize(15), }}> {this.find_id().adresse.contact.numero} </Text>
          </View>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Email: </Text>
            <Text numberOfLines={1} style={{ width: "70%", color: "#FDC800", fontSize: normalize(15), }}> {this.find_id().adresse.contact.email} </Text>
          </View>
          
          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: normalize(15), }}>Site web: </Text>
            <Text numberOfLines={1} style={{ width: "70%", color: "#FDC800", fontSize: normalize(15), }}> {this.find_id().adresse.contact.web} </Text>
          </View>

        </View>
      </View> 
    );
  }
}
const styles = StyleSheet.create({
  container:{
    position: "absolute",
    top: 0,
    zIndex:3,
    width: "100%",
    height: screen.height,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOffset: {height: 10,width: 10},
    shadowOpacity: 0.5,elevation : 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5, 
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailPlatComponent);