import React from 'react';
import { ImageBackground, View, TouchableOpacity, Text } from 'react-native';
import { AntDesign, Octicons } from 'react-native-vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { parseAction, platAction, favorieAction } from '../store/ActivityActions';

import { normalize } from "../helper/fonts";


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    parseAction,
    platAction,
    favorieAction,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { data } = state
  return { data }
};

class PhotoComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      full: false,
      take: false
    };
  }
  async componentDidMount() {
  }
 
  render(){
    return(
      <ImageBackground
          source={{ uri: this.props.item.photo }} 
          style={{
            resizeMode: "cover",
            width: '100%',
            height: '100%',
            alignItems: "flex-end", 
            justifyContent: "flex-end",
            backgroundColor: "#000"
          }}
      >
        <View style={{width: "100%",height: "50%", alignItems: "center", justifyContent: "space-between", flexDirection: "row",}}>
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
      </ImageBackground>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoComponent);