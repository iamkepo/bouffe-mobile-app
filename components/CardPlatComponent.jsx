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

  detail(){
    this.props.parseAction({i: this.props.i, item: this.props.item});
    //this.navigation.navigate('Restaurant');
  }
  render(){    
    return (
    <DoublePressMaterial
      style={styles.plat}
      singleTap={()=> this.detail()} 
      doubleTap={()=> this.props.favorieAction(this.props.item)}
      longTap={()=> false}
      delay={300}
    >
      <View style={{width: "100%",height: "100%",flexWrap: "nowrap",alignItems: "center",borderRadius: 5,}}>

        <Image 
          source={{ uri: this.props.item.photo }} 
          style={{ width: "100%", height: "60%", resizeMode: "cover", borderTopRightRadius: 5, borderTopLeftRadius: 5, }}
        />
        <View style={{width: "100%",height: "10%", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginTop: "5%"}}>
          <TouchableOpacity
            style={{width: 50,height: "100%",alignItems: "center",justifyContent: "center"}}
            onPress={()=> this.props.favorieAction(this.props.item)}
          >
            <AntDesign name='heart' size={25} style={{color: this.props.item.favorie ? "#B51827" : "#BBB",}}/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{width: 50,height: "100%",alignItems: "center",justifyContent: "center"}}
            onPress={()=> this.props.panierAction(this.props.item)}
          >
            <Octicons name='diff-added' size={25} style={{color: "#FDC800",}}/>
          </TouchableOpacity>
        </View>
        <View style={{width: "90%", height: "30%", justifyContent: "space-around", paddingVertical: "2%"}}>

          <View style={{width: "100%", justifyContent: "space-between", flexDirection: "row"}}>

            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
              {this.props.item.name}
            </Text>
            <Text style={{ color: "#ECE31A", fontSize: 18, }}> {this.props.item.prix} F </Text>
          </View>
          
          <Text style={{ color: "#BBB", fontSize: 15 }}>De: 
            <Text style={{ color: "#000" }}> {this.props.item.restaurant.name}</Text>
          </Text>
          <View style={{width: "100%", justifyContent: "space-between", flexDirection: "row"}}>
            <Text style={{ fontSize: 15, color: "#BBB" }}> Avec  
              <Text style={{ color: "#ECE31A" }}> 
              {this.props.item.restaurant.menu_length >=10 ? null : 0 }{this.props.item.restaurant.menu_length} 
              </Text>
              autres plats
              
              { this.props.item.distance != undefined ? <> à <Text style={{ color: "#ECE31A" }}> {this.props.item.distance/1000} Km </Text> de vous </> :false }
                
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
    height: 300,
    paddingBottom: 15,
    marginBottom: 20,
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