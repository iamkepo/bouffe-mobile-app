import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { AntDesign, Octicons } from 'react-native-vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favorieAction, panierAction } from '../store/ActivityActions';

import DoublePressMaterial from '../materials/DoublePressMaterial';


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
          style={{ width: "35%", height: "100%", resizeMode: "cover", borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }}
        />
        <View style={{width: "65%", height: "100%", justifyContent: "space-around", padding: "2%"}}>
          <View style={{width: "80%", justifyContent: "space-between", flexDirection: "row"}}>
            <Text style={{ color: "#000", fontSize: 12, }}>
              {this.props.item.name}
              <Text style={{ color: "#B51827" }}> {this.props.item.prix} F </Text>
            </Text>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: -10,
                right: -45,
                zIndex: 2,
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={()=> this.props.panierAction(this.props.item)}
            >
              <Octicons
                name='diff-added'
                size={25}
                style={{
                  color: "#FDC800",
                }}
              />
            </TouchableOpacity>
          </View>
          
          <Text style={{ color: "#BBB", fontSize: 12 }}>De: 
            <Text style={{ color: "#000" }}> {this.props.item.restaurant.name}</Text>
          </Text>
          <View style={{width: "100%", justifyContent: "space-between", flexDirection: "row"}}>
            <Text style={{ fontSize: 11, color: "#BBB" }}> Avec  
              <Text style={{ color: "#B51827" }}> {this.props.item.restaurant.menu_length >=10 ? null : 0 }{this.props.item.restaurant.menu_length} </Text>autres plats
              { this.props.item.distance != undefined ? <> à <Text style={{ color: "#B51827" }}> {this.props.item.distance/1000} Km </Text> de vous </> :false }
            </Text>
          </View>
          
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
    paddingBottom: 15,
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