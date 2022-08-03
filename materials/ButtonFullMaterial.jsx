import React from 'react' ;
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native' ;

class ButtonFullMaterial extends React.Component {
  constructor( props ) {
    super( props ) ;
  }

  render() {
    return (
      <TouchableOpacity 
        disabled={this.props.disabled}
        style={[styles.button, { 
          backgroundColor: this.props.bg || "#FFF", 
          borderColor: this.props.bc || "#FFF", 
          backgroundColor: this.props.bg || "#FFF", 
          height: this.props.h || 45, 
          justifyContent: this.props.icon ? "space-between" : "center" 
        }]} 
        onPress={()=> this.props.onPress()}
      >
          { this.props.children }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
  }
});

export default ButtonFullMaterial ;