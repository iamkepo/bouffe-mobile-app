import React from 'react';
import { View, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef
} from 'react-native-shared-element';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listAction } from '../store/ActivityActions';

import DetailPlatComponent from '../screens/DetailPlatComponent';
import CardPlatComponent from '../components/CardPlatComponent';

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

function SharedElementNavigator(props) {
  // Scene 1
  let startAncestor;
  let startNode;
  


  // Scene2
  let endAncestor;
  let endNode;
  

  // Render overlay in front of screen
  const position = new Animated.Value(0);
  return(
  <View style={StyleSheet.absoluteFill}>
    <SharedElementTransition
      start={<View ref={ref => startAncestor = nodeFromRef(ref)}>
      <SharedElement onNode={node => startNode = node}>
        <CardPlatComponent
          item={props.item}
          find_id={()=> props.find_id()}
        />
      </SharedElement>
    </View>}
      end={<View ref={ref => endAncestor = nodeFromRef(ref)}>
      <SharedElement onNode={node => endNode = node}>
        <DetailPlatComponent 
          find_id={()=> props.find_id()} 
          item={props.item} 
        />
      </SharedElement>
    </View>}
      position={position}
      animation='move'
      resize='auto'
      align='auto'
      />
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
export default connect(mapStateToProps, mapDispatchToProps)(SharedElementNavigator);