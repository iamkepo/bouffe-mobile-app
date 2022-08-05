import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { AntDesign, Entypo, Ionicons } from 'react-native-vector-icons';
import { Actionsheet, useDisclose} from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listAction } from '../store/ActivityActions';

import { normalize } from "../helper/fonts";
import PanierButtonComponent from './PanierButtonComponent';

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
  const [showcard, setshowcard] = React.useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={props.title ? props.navigation.goBack : onOpen}>
        {
          props.title ? 
          <Ionicons name="chevron-back" size={normalize(30)} color="#000"/>
          :
          <Entypo name='menu' size={normalize(30)} color="#000"/>
        }
        </TouchableOpacity>

        {
          props.title ?
          <Text style={{ color: "#000", fontSize: normalize(15) }}>{props.title}</Text> 
          :
          <Image 
            source={require("../assets/LogoBouffeApp2.png")} 
            style={{ 
              width: "60%", 
              height: "100%", 
              resizeMode: "contain",
            }}
          />
        }
        
        <TouchableOpacity
          onPress={()=> setshowcard(true)}
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
      <PanierButtonComponent
        navigation={props.navigation} 
        showcard={showcard} 
        setshowcard={()=> setshowcard(false)} 
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: 50, 
    flexDirection: "row", 
    paddingHorizontal: 10, 
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);