import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { AntDesign, Octicons } from 'react-native-vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favorieAction, panierAction } from '../store/ActivityActions';

import DoublePressMaterial from '../materials/DoublePressMaterial';
import ButtonFullMaterial from '../materials/ButtonFullMaterial';

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

class CardPlatComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
  }

  
  async componentDidMount(){
  }

  render(){    
    return (
    <DoublePressMaterial
      style={styles.plat}
      singleTap={()=> this.props.detail()} 
      doubleTap={()=> this.props.favorieAction(this.props.item)}
      longTap={()=> false}
      delay={300}
    >
      <View 
        style={{
          width: "100%",
          height: "100%",
          flexWrap: "nowrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 5,
        }}
      >
        <Image 
          source={{ uri: this.props.item.photo }} 
          style={{ width: "40%", height: "100%", resizeMode: "cover", borderBottomLeftRadius: 5, borderTopLeftRadius: 5, backgroundColor: "#ECE31A" }}
        />
        <View style={{width: "60%", height: "100%", justifyContent: "space-around", padding: "2%"}}>

          <Text numberOfLines={1} style={{ fontSize: normalize(15), color: "#000", fontWeight: "bold" }}>{this.props.item.name} </Text>

          <Text numberOfLines={1} style={{ color: "#BBB", fontSize: normalize(15) }}>Prix: 
            <Text style={{ color: "#B51827", fontWeight: "bold"  }}> {this.props.item.prix} F </Text>
          </Text>
          
          <Text numberOfLines={1}style={{ color: "#BBB", fontSize: normalize(12) }}>De: 
            <Text style={{ color: "#000" }}> {this.props.find_id().name}</Text>
          </Text>

          <View style={{width: "100%", justifyContent: "space-between", flexDirection: "row"}}>
            <Text numberOfLines={1} style={{ fontSize: normalize(11), color: "#BBB" }}>Avec  
              <Text style={{ color: "#B51827" }}> {this.props.find_id().menu_length >=10 ? null : 0 }{this.props.find_id().menu_length} </Text>autres plats
              { this.props.item.distance != undefined ? <> à <Text style={{ color: "#B51827" }}> {this.props.item.distance/1000} Km </Text> de vous </> :false }
            </Text>
          </View>
          <ButtonFullMaterial
            bg= "#FDC800"
            icon={true}
            onPress={()=> this.props.panierAction({...this.props.item, restaurant: this.props.find_id()})}
          >
            <Octicons
              name='diff-added'
              size={normalize(25)}
              style={{
                color: "#FFF",
              }}
            />
            <Text numberOfLines={1} style={{ color: "#FFF", fontSize: normalize(18), fontWeight: "bold" }}>Ajouter au panier</Text>
          </ButtonFullMaterial>
        </View>
      </View>
    </DoublePressMaterial>
    );
  }
}
const styles = StyleSheet.create({
  plat: { 
    width: "90%",
    backgroundColor: '#FFF',
    height: 150,
    marginTop: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOffset: {
      height: 10,
      width: 10
    },
    shadowOpacity: 0.5,
    elevation : 10,
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(CardPlatComponent);