import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView, BackHandler, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { normalize } from "../helper/fonts";


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
      detail: {},
      list: []
    };
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
     this.setState({refreshing: true, trie_d: false, trie_p: false, list: plats });
  
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
  
  async updateSearch(text) {
    this.setState({query: text});
    if (text != "" ){
      let stock = [];
      this.state.list.forEach(item => {
        if (item.name.toLowerCase().search(text.toLowerCase()) != -1) {
          stock = stock.concat(item);
        }
      });
      this.props.listAction( "plat", stock);
    }else{
      this.props.listAction( "plat", this.state.list);
    }
  }

  render(){    
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Recherche"
          placeholderTextColor="#000"
          value={this.state.query}
          onChangeText={(text) => this.updateSearch(text)}
        />
        <ScrollView
          contentContainerStyle={{}}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
        >
          <View style={{width: "100%",height: 50,flexDirection: "row",alignItems: "center",justifyContent: "space-around", marginTop: "2%"}}>

            <View style={{width: "25%",height: "100%",flexDirection: "row",alignItems: "center",justifyContent: "space-between"}}>
              <Ionicons name='filter' size={normalize(25)} style={{color: "#000",}}/>
              <Text style={{ fontWeight: "bold", fontSize: normalize(14) }} >Filtré par: </Text>
            </View>

            <TouchableOpacity 
              onPress={()=> (this.trie_prix(this.state.trie_p ? true : false), this.setState({trie_p: !this.state.trie_p, trie_d: false }))} 
              style={{width: "20%",height: "80%",flexDirection: "row",alignItems: "center",justifyContent: "space-evenly",backgroundColor: "#FFF",borderRadius: 5,}}
            >
              <Text style={{ color: "#000", fontSize: normalize(14) }} >prix</Text> 
              <AntDesign name={this.state.trie_p ? 'up' : 'down'} size={normalize(20)} style={{color: "#000",}}/>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=> (this.trie_distance(this.state.trie_d ? true : false), this.setState({trie_d: !this.state.trie_d, trie_p: false}))} 
              style={{width: "25%",height: "80%",flexDirection: "row",alignItems: "center",justifyContent: "space-evenly",backgroundColor: "#FFF",borderRadius: 5,}}
            >
              <Text style={{ color: "#000", fontSize: normalize(14) }} >distance</Text> 
              <AntDesign name={this.state.trie_d ? 'up' : 'down'} size={normalize(20)} style={{color: "#000",}}/>
            </TouchableOpacity>

          </View>

          <View style={styles.sous}>
            {
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
        {
          this.state.showdetail &&
          <DetailPlatComponent 
            find_id={()=> this.find_id(this.state.detail.restaurant)} 
            item={this.state.detail} 
            close={()=> this.setState({showdetail: false})}
          />
        }
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: "100%",
    alignItems: 'center',
    justifyContent: "flex-start",
  },
  textInput: {
    width: "90%",
    height: 40,
    borderWidth: 0,
    borderRadius: 6,
    marginTop: "-5%",
    marginBottom: "5%",
    paddingHorizontal: "5%",
    backgroundColor: '#FFF',
    fontSize: normalize(14)
  },
  sous: {
    width: "100%", 
    minHeight: screen.height,
    alignItems: 'center',
    justifyContent: "flex-start",
    paddingTop: 0,
    paddingBottom: 100
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);