import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';

import { AntDesign, Octicons } from 'react-native-vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favorieAction, panierAction } from '../store/ActivityActions';

import PhotoComponent from '../components/PhotoComponent';


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    favorieAction, 
    panierAction,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { data } = state
  return { data }
};

class DetailPlatComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
  }

  
  async componentDidMount(){
  }

  render(){    
    return (
      <View style={{width: "100%",height: "100%",flexWrap: "nowrap",alignItems: "center",borderRadius: 5,}}>

        <Image 
          source={{ uri: this.props.item.photo }} 
          style={{ width: "100%", height: "30%", resizeMode: "cover", borderTopRightRadius: 5, borderTopLeftRadius: 5, }}
        />

        <PhotoComponent photo={this.props.item.photo} />

        <View style={{width: "100%",height: "10%", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginTop: "5%"}}>
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

        <View style={{width: "100%", height: "70%", justifyContent: "space-around", padding: "5%", backgroundColor: '#FFF',}}>

          <Text style={styles.title}>Nom du restaurant: {this.props.item.restaurant.name}</Text>
          <View style={{width: "100%", justifyContent: "space-between", flexDirection: "row"}}>
            <Text style={styles.text}>Situé a: {this.props.item.restaurant.adresse.lieu[0].identify.name}</Text>
          </View>
          <View style={{width: "100%", justifyContent: "space-between", flexDirection: "row"}}>
            <Text style={styles.text}>
              Numéro: {this.props.item.restaurant.adresse.contact.numero}
            </Text>
          </View>
          <View style={{width: "100%", justifyContent: "space-between", flexDirection: "row"}}>
            <Text 
              //onPress={async()=> await MailComposer.composeAsync({recipients : [this.props.item.restaurant.adresse.contact.email]})} 
              style={styles.linking}
            >
            Email: {this.props.item.restaurant.adresse.contact.email}
            </Text>
          </View>
          {
            this.props.item.restaurant.adresse.contact.web.map((z, i)=>(
              <View key={i} style={{width: "100%", justifyContent: "space-between", flexDirection: "row"}}>
                <Text onPress={()=> Linking.openURL(z)} style={styles.linking}>
                  {z}
                </Text>
              </View>
            ))
          }
          {
            this.props.item.restaurant.photo != "" ?
            <Image 
              source={{ uri: this.props.item.restaurant.photo }} 
              style={{ width: "100%", height: 200, resizeMode: "cover", marginVertical: 10}}
            /> 
            :
            false
          }
        </View>
      </View> 
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "justify"
  },
  text: {
    width: "70%",
    marginVertical: 10,
  },
  linking: {
    marginVertical: 10,
    textAlign: "justify",
    color: "#00B"
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailPlatComponent);