import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStateAction } from '../store/ActivityActions';

import HomeScreen from '../screens/HomeScreen';
import DetailPlatScreen from '../screens/DetailPlatScreen';

const Stack = createStackNavigator();

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setStateAction,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { data } = state
  return { data }
};

class ClientNavigator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.navigation = this.props.navigation;
  }

  componentWillUnmount() {
  }
  componentDidMount() {
  }
  render(){
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          route={this.route} 
          navigation={this.navigation}
          options={{ headerLeft: false, headerTitle: false, headerStyle: { height: 0 },}} 
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailPlatScreen}
          route={this.route} 
          navigation={this.navigation}
          options={{ headerLeft: false, headerTitle: false, headerStyle: { height: 0 },}} 
        />
      </Stack.Navigator>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientNavigator);