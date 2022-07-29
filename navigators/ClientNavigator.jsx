import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStateAction } from '../store/ActivityActions';

import HomeScreen from '../screens/HomeScreen';

import HomeHeaderComponent from '../components/HomeHeaderComponent';
import PanierButtonComponent from '../components/PanierButtonComponent';

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
      <View style={{width: '100%', height:'100%' }}>
        <HomeHeaderComponent navigation={this.navigation} />
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            route={this.route} 
            navigation={this.navigation}
            options={{ headerLeft: false, headerTitle: false, headerStyle: { height: 0 },}} 
          />
        </Stack.Navigator>
        <PanierButtonComponent navigation={this.navigation} />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientNavigator);