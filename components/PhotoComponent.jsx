import React from 'react';
import { Image } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { parseAction, platAction } from '../store/ActivityActions';


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    parseAction,
    platAction,
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
      this.props.photo != "" ?
      <Image
          source={{ uri: this.props.photo }} 
          style={{
            resizeMode: "cover",
            width: '100%',
            height: '30%',
            alignItems: "center", 
            justifyContent: "center",
          }}
      />
      :
      false
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoComponent);