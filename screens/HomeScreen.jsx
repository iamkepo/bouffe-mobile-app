import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, BackHandler, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getDistance } from 'geolib';
import * as Location from 'expo-location';
import { AntDesign, Ionicons } from 'react-native-vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favorieAction, panierAction, parseAction, listAction } from '../store/ActivityActions';

import DetailPlatComponent from '../components/DetailPlatComponent';
import CardPlatComponent from '../components/CardPlatComponent';

import { plats, restos } from '../helper/const';


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    favorieAction, 
    panierAction,
    parseAction,
    listAction,
  }, dispatch)
);

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
const mapStateToProps = (state) => {
  const { data } = state
  return { data }
};

const screen = Dimensions.get("screen");
class HomeScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      trie_d: false,
      trie_p: false,
      refreshing: false,
      showdetail: false,
      detail: {}
    };
    this.tab = [],
    this.navigation = this.props.navigation;
  }

  backAction = () => {
    if (this.state.showdetail) {
      this.setState({showdetail: false})
    } else {
      BackHandler.exitApp()
    }
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  
  async componentDidMount(){
    
    this.onRefresh();
    
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }
  onRefresh = () => {
     this.setState({refreshing: true, trie_d: false, trie_p: false });
  
    this.props.listAction( "plat", this.shuffle(plats));
    this.props.listAction( "resto", this.shuffle(restos));

    //this.getLocation(List);
    wait(2000).then(() =>{this.setState({refreshing: false})});
  }
  async getLocation(list){
    let { status } = await Location.requestForegroundPermissionsAsync();
    let location = await Location.getCurrentPositionAsync({});
    list.forEach(y => {
      y.distance = getDistance(
        { latitude: y.restaurant.adresse.lieu[0].location.coords.latitude, longitude: y.restaurant.adresse.lieu[0].location.coords.longitude },
        { latitude: location.coords.latitude, longitude: location.coords.longitude }
      );
    });
    this.props.listAction( "plat", this.shuffle(list));
  }

  trie_distance(a){
    if (a) {
      this.props.listAction(this.props.data.list.sort(function(a, b){return a.distance - b.distance }));
    } else {
      this.props.listAction(this.props.data.list.sort(function(a, b){return b.distance - a.distance }));
    }
  }

  trie_prix(a){
    if (a) {
      this.props.listAction(this.props.data.list.sort(function(a, b){return a.prix - b.prix }));
    } else {
      this.props.listAction(this.props.data.list.sort(function(a, b){return b.prix - a.prix }));
    }
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  detail(i, item){
    this.props.parseAction({i: i, item: item});
    //this.navigation.navigate('Restaurant');
  }

  find_id(restaurant) {
    return this.props.data.list.resto.find(el => el._id == restaurant)
  }
  render(){    
    return (
      <ScrollView
        contentContainerStyle={{}}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
      >
        {
          !this.state.showdetail ?
          <View style={{width: "100%",height: 50,flexDirection: "row",alignItems: "center",justifyContent: "space-around"}}>

          <View style={{width: "25%",height: "100%",flexDirection: "row",alignItems: "center",justifyContent: "space-between"}}>
            <Ionicons name='filter' size={25} style={{color: "#000",}}/>
            <Text style={{ fontWeight: "bold" }} >Filtré par: </Text>
          </View>

          <TouchableOpacity 
            onPress={()=> (this.trie_prix(this.state.trie_p ? true : false), this.setState({trie_p: !this.state.trie_p, trie_d: false }))} 
            style={{width: "20%",height: "80%",flexDirection: "row",alignItems: "center",justifyContent: "space-evenly",backgroundColor: "#FFF",borderRadius: 5,}}
          >
            <Text style={{ color: "#000" }} >prix</Text> 
            <AntDesign name={this.state.trie_p ? 'up' : 'down'} size={20} style={{color: "#000",}}/>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=> (this.trie_distance(this.state.trie_d ? true : false), this.setState({trie_d: !this.state.trie_d, trie_p: false}))} 
            style={{width: "25%",height: "80%",flexDirection: "row",alignItems: "center",justifyContent: "space-evenly",backgroundColor: "#FFF",borderRadius: 5,}}
          >
            <Text style={{ color: "#000" }} >distance</Text> 
            <AntDesign name={this.state.trie_d ? 'up' : 'down'} size={20} style={{color: "#000",}}/>
          </TouchableOpacity>

          </View>
        : false
        }

        <View style={styles.container}>
          {
            this.state.showdetail ?
            <DetailPlatComponent 
              find_id={()=> this.find_id(this.state.detail.restaurant)} 
              item={this.state.detail} 
              close={()=> this.setState({showdetail: false})}
            />
            :
            this.props.data.list.plat.map((item, i)=>(
              <CardPlatComponent
                key={i} 
                i={i} 
                item={item}
                find_id={()=> this.find_id(item.restaurant)}
                detail={()=> this.setState({detail: item, showdetail: true})}
              />
            ))
          }
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%", 
    minHeight: screen.height,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "flex-start",
    paddingTop: 0,
    paddingBottom: 100
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);