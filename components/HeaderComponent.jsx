import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { AntDesign, Entypo } from 'react-native-vector-icons';
import { Actionsheet, useDisclose} from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listAction } from '../store/ActivityActions';

import { normalize } from "../helper/fonts";

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    listAction,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { data } = state
  return { data }
};

function HeaderComponent(props) {
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <View style={styles.container}
    >
      <TouchableOpacity onPress={onOpen}>
        <Entypo name='menu' size={normalize(30)} color="#000"/>
      </TouchableOpacity>

      <Image 
        source={require("../assets/LogoBouffeApp2.png")} 
        style={{ 
          width: "60%", 
          height: "100%", 
          resizeMode: "contain",
        }}
      />
      
      <TouchableOpacity
        onPress={()=> props.setshowcard()}
        style={{width: 50, height: "100%", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", }} >
        <AntDesign name='shoppingcart' size={normalize(25)} color="#000"/>
        {
          props.data.panier.length > 0 && 
          <View style={{ width: "50%",height: "50%",alignItems: "center",justifyContent: "center", backgroundColor: "#FDC800DD",borderRadius: 50 }} >
            <Text style={{ color: "#FFF", fontSize: normalize(12) }}>{props.data.panier.length}/{0}</Text> 
          </View> 
        }
      </TouchableOpacity>
      
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>option 1</Actionsheet.Item>
          <Actionsheet.Item>option 2</Actionsheet.Item>
          <Actionsheet.Item>option 3</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: 90, 
    flexDirection: "row", 
    paddingTop: 40,
    paddingHorizontal: 10, 
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FFF",
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
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);