import { combineReducers } from 'redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import axios from "axios";
import NetInfo from '@react-native-community/netinfo';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const INITIAL_STATE = {
  i: null,
  objet: {},
  panier: [],
  paniers: [],
  total: 0,
  list: {
    plat: [],
    resto: []
  },
  user: {
    solde: 0,
    lieu: []
  },
  profil: false,
  commande: [],
  notifListSent: [],
  myState: {
    location: null,
    awaitNotif: false,
    isConnected: false
  }

};
function tab_trie(array, index){
  var tab = [];
  for (let i = 0; i < array.length; i++) {
    if (i != index) {
      tab.push(array[i]);
    }
  }
  //console.log(tab);
  return tab;
}
function addPlat(array, element){
  var tab = [ element ];
  tab = tab.concat( array.map( item => item ) );
  //console.log(tab);
  return tab;
}
function getDateTimeSpan( date ) {
  return Math.floor(date.getTime()/ 1000);
}

function timeRem( end, time ){
    let currentDate = Math.floor( Date.now() / 1000 );
    let date = getDateTimeSpan( new Date( end ) );
  
    let timeRem = date - currentDate ;
    let ds = timeRem - time;
  
    return ( ds ) ;
}




function sender(user, cars) {
  NetInfo.fetch().then(state => {
    if( state.isConnected && user.numero){
      var push = {
        name: user.name,
        phone_number: user.numero,
        cars: cars
      };
      //console.log( push, "................................." );
      axios({ method: 'post', url:"https://swiitch-bukar.herokuapp.com/api/user", data: push }).then((response)=>{
        //console.log(response.data, "*************************************");
      })
    }
  });

}


function monReducer (state = INITIAL_STATE, action) {
  let nextState
  switch(action.type) {
    case 'PARSE':
      nextState = {
          ...state,
          i: action.payload.i,
          objet: action.payload.item
      }
      return nextState

    case 'PANIER':
      
      if (state.paniers[action.payload.restaurant.adresse.contact.numero] == undefined) {
        state.panier = state.panier.concat(action.payload.restaurant.adresse.contact.numero);
        state.paniers[action.payload.restaurant.adresse.contact.numero] = {
          panier: [],
          total: 0
        }
      };
      state.paniers[action.payload.restaurant.adresse.contact.numero] = {
        panier: state.paniers[action.payload.restaurant.adresse.contact.numero].panier.concat(action.payload),
        total: state.paniers[action.payload.restaurant.adresse.contact.numero].total+action.payload.prix
      };

      //console.log(state.paniers);
      nextState = {
          ...state,
          panier: state.panier,
          paniers: state.paniers
      }
      return nextState

    case '_PANIER':

      state.paniers[action.payload.numero] = {
        total: state.paniers[action.payload.numero].total-state.paniers[action.payload.numero].panier[action.payload.i].prix,
        panier: tab_trie(state.paniers[action.payload.numero].panier, action.payload.i)
      };
      if (state.paniers[action.payload.numero].panier.length == 0) {
        state.paniers[action.payload.numero] = undefined;
        state.panier = tab_trie(state.panier, state.panier.indexOf(action.payload.numero))
      }
      
      //console.log(state.paniers);
      nextState = {
          ...state,
          panier: state.panier,
          paniers: state.paniers
      }
      return nextState

    case 'FAVORIE':
      state.list.forEach(y =>(
        y.favorie = (action.payload.name == y.name && action.payload.prix == y.prix && action.payload.restaurant.adresse.contact.numero == y.restaurant.adresse.contact.numero) ? !y.favorie : y.favorie
      ));
      // session("client", state.list);

      nextState = {
          ...state,
          list: state.list
      }
      return nextState

    case 'LIST':
      if (action.payload.value != null) {
        state.list[action.payload.index] = action.payload.value
      }

      // session("client", state.list);
      
      nextState = {
          ...state,
          list: state.list
      }
      return nextState

    case 'USER':
      if (action.payload.index == "user" && action.payload.value == null) {
        state.user = state.user;
      } else if (action.payload.index == "user" && action.payload.value != null) {
        state.user = action.payload.value;
      }else{
        state.user[action.payload.index] =  action.payload.value
      }

      // session('user', state.user);

      nextState = {
          ...state,
          user: state.user
      }
      return nextState
    case 'ADD':
      if (state.list.length == 0) {
        state.list = state.list.concat(action.payload)
      } else {
        state.list = addPlat( state.list, action.payload );
      }

      // session("client", state.list);
      
      nextState = {
          ...state,
          list: state.list
      }
      return nextState

    case 'PLAT':
        
        state.list[action.payload.i || state.i] = action.payload.item;
        //console.log(state.list[action.payload.i || state.i]);
        // session("client", state.list);
        
        nextState = {
            ...state,
            list: state.list
        }
        return nextState

    case '_PLAT':
      var stock = tab_trie(state.list, action.payload);
      
      // session("client", stock);
      
      nextState = {
          ...state,
          list: stock
      }
      return nextState

    case 'RESTO':
      
      state.list.forEach(x => {
        x.restaurant_name = action.payload.restaurant_name ? action.payload.restaurant_name : x.restaurant_name;
        x.restaurant_photo= action.payload.restaurant_photo ? action.payload.restaurant_photo : x.restaurant_photo;
        x.restaurant_adresse.contact.numero = action.payload.restaurant_adresse.contact.numero ? action.payload.restaurant_adresse.contact.numero : x.restaurant_adresse.contact.numero;
        x.restaurant_adresse.contact.email = action.payload.restaurant_adresse.contact.email ? action.payload.restaurant_adresse.contact.email : x.restaurant_adresse.contact.email;
        x.restaurant_adresse.contact.web = action.payload.restaurant_adresse.contact.web ? action.payload.restaurant_adresse.contact.web : x.restaurant_adresse.contact.web;
        x.restaurant_adresse.lieu.name= action.payload.restaurant_adresse.lieu.name ? action.payload.restaurant_adresse.lieu.name : x.restaurant_adresse.lieu.name;
        x.restaurant_adresse.lieu.longitude= action.payload.restaurant_adresse.lieu.longitude ? action.payload.restaurant_adresse.lieu.longitude : x.restaurant_adresse.lieu.longitude;
        x.restaurant_adresse.lieu.latitude= action.payload.restaurant_adresse.lieu.latitude ? action.payload.restaurant_adresse.lieu.latitude : x.restaurant_adresse.lieu.latitude;
      });

      // session("client", state.list);

      nextState = {
          ...state,
          list: state.list
      }
      return nextState

    case 'ADD_COMMANDE':
        state.commande = addPlat( state.commande, action.payload.com );
        state.paniers[ action.payload.p] = undefined;
        state.panier = tab_trie(state.panier, state.panier.indexOf(action.payload.p));

      // session("commande", state.commande);
      
      nextState = {
          ...state,
          commande: state.commande,
          paniers: state.paniers,
          panier: state.panier,
      }
      return nextState

    case 'COMMANDE':
      if (action.payload != null) {
        state.commande = action.payload
      } else {
        state.commande = state.commande;
      }
      // session("commande", state.commande);
      
      nextState = {
          ...state,
          commande: state.commande
      }
      return nextState
      
    case 'PROFIL':
      
      nextState = {
          ...state,
          profil: action.payload
      }
      return nextState

    case 'STATE':
      
      state.myState[action.payload.index] = action.payload.value
      
      nextState = {
          ...state,
          myState: state.myState
      }
      return nextState

    //...
    default: 
      return state
  }
}

export default combineReducers({
  data: monReducer
});
