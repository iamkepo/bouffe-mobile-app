import React from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favorieAction, panierAction } from '../store/ActivityActions';

import PhotoComponent from '../components/PhotoComponent';


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
    for (const key in this.props.find_id().adresse.lieu[0].identify) {
      if (this.props.find_id().adresse.lieu[0].identify[key] != null) {
        stock = stock + this.props.find_id().adresse.lieu[0].identify[key] + ", "
      }
    }
    this.setState({identify: stock})
  }

  render(){    
    return (
      <View style={{width: "100%",height: "100%",flexWrap: "nowrap",alignItems: "center",borderRadius: 5, backgroundColor: '#FFF',}}>

        <View style={{ width: "100%", height: "40%",}}>
          <PhotoComponent close={()=> this.props.close()} item={this.props.item} />
        </View>

        <View style={{width: "100%", height: "60%",  padding: "5%"}}>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: 16, }}>Restaurant: </Text>
            <Text numberOfLines={1} style={{ width: "70%", fontWeight: "bold", color: "#000", fontSize: 16, }}> {this.props.find_id().name} </Text>
          </View>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: 16, }}>Situé a: </Text>
            <Text numberOfLines={2} style={{ width: "70%", fontWeight: "bold", color: "#000", fontSize: 16, }}> {this.state.identify} </Text>
          </View>
          
          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: 16, }}>Numéro: </Text>
            <Text numberOfLines={1} style={{ width: "70%", fontWeight: "bold", color: "#B51827", fontSize: 16, }}> {this.props.find_id().adresse.contact.numero} </Text>
          </View>

          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: 16, }}>Email: </Text>
            <Text numberOfLines={1} style={{ width: "70%", fontWeight: "bold", color: "#FDC800", fontSize: 16, }}> {this.props.find_id().adresse.contact.email} </Text>
          </View>
          
          <View style={{width: "100%", justifyContent: "flex-start", flexDirection: "row", marginVertical: 10, }}>
            <Text numberOfLines={1} style={{ width: "30%", color: "#BBB", fontSize: 16, }}>Site web: </Text>
            <Text numberOfLines={1} style={{ width: "70%", fontWeight: "bold", color: "#FDC800", fontSize: 16, }}> {this.props.find_id().adresse.contact.web} </Text>
          </View>

        </View>
      </View> 
    );
  }
}
const styles = StyleSheet.create({
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