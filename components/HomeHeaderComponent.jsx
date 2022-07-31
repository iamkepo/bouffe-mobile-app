import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { AntDesign, MaterialIcons } from 'react-native-vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listAction } from '../store/ActivityActions';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    listAction,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { data } = state
  return { data }
};

function HomeHeaderComponent(props) {
  return (
    <View 
      style={{
        width: '100%', 
        height: 90, 
        flexDirection: "row", 
        paddingTop: 40, 
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
      }}
    >
    {/* <TouchableOpacity
      onPress={()=> props.navigation.navigate('Profil')}
      style={{
        width: 30,
        height: 30,
        backgroundColor: "#BBB",
        borderRadius: 30,
        marginLeft: 20,
      }}
    >
      <AntDesign
        name='user'
        size={25}
        style={{
          textAlign: 'center',
          color: "#FFF",
        }}
      />
    </TouchableOpacity> */}
    <Image 
        source={require("../assets/LogoBouffeApp2.png")} 
        style={{ 
          width: "45%", 
          height: "100%", 
          resizeMode: "contain",
          marginLeft: 20,
        }}
      />
      <View style={{width: '30%', marginRight: 20,flexDirection: "row", justifyContent: "space-between",}}>
      <TouchableOpacity
        onPress={()=> props.setshowcard()}
        style={{
          width: 60,
          height: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between", 
        }}
      >
        <AntDesign
          name='shoppingcart'
          size={30}
          style={{
            color: "#000",
          }}
        />
        <View style={{ width: "50%",height: "100%",alignItems: "center",justifyContent: "center", backgroundColor: props.data.panier.length > 0 ? "#FDC800DD" : "#FFF",borderRadius: 50 }} >
          {
            props.data.panier.length > 0 ?
            <Text style={{ color: "#FFF", fontSize: 15 }}>{props.data.panier.length} / {}</Text> 
            : false
          }
        </View> 
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=> props.navigation.navigate('Search')}
        style={{
          width: 30,
          height: 30,
        }}
      >
        <AntDesign
          name='search1'
          size={30}
          style={{
            color:  "#000",
          }}
        />
      </TouchableOpacity>
      </View>
    </View>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeaderComponent);