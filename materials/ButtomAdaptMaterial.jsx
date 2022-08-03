import React from 'react' ;
import { StyleSheet, TouchableOpacity } from 'react-native' ;

class ButtonAdaptMaterial extends React.Component {
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
          width: this.props.w || 100, 
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
    borderWidth: 0.5,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
  }
});

export default ButtonAdaptMaterial ;