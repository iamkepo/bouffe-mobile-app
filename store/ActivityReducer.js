import { combineReducers } from 'redux';

import { sub_tab, pile_tab } from '../helper/utile';

const INITIAL_STATE = {
  i: null,
  objet: false,
  panier: [],
  paniers: [],
  total: 0,
  list: {
    plat: [],
    resto: []
  },
  user: {
    _id: "2",
    solde: 0,
    lieu: []
  },
  commande: [],
  favorie: [],
  etat: {
    location: null,
    isConnected: false
  }

};


function monReducer (state = INITIAL_STATE, action) {
  let nextState
  switch(action.type) {
    case 'PARSE':
      nextState = {
          ...state,
          objet: action.payload
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
        panier: sub_tab(state.paniers[action.payload.numero].panier, action.payload.i)
      };
      if (state.paniers[action.payload.numero].panier.length == 0) {
        state.paniers[action.payload.numero] = undefined;
        state.panier = sub_tab(state.panier, state.panier.indexOf(action.payload.numero))
      }
      
      //console.log(state.paniers);
      nextState = {
          ...state,
          panier: state.panier,
          paniers: state.paniers
      }
      return nextState

    case 'FAVORIE':
      if (state.favorie.find(el => el._id == action.payload._id)) {
        sub_tab(state.favorie, action.payload._id)
      } else {
        pile_tab(state.favorie, action.payload)
      }
      // session("client", state.list);

      nextState = {
          ...state,
          favorie: state.favorie
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
      var stock = sub_tab(state.list, action.payload);
      
      // session("client", stock);
      
      nextState = {
          ...state,
          list: stock
      }
      return nextState

    case 'ADD_COMMANDE':
        state.commande = pile_tab( state.commande, action.payload.com );
        state.paniers[ action.payload.p] = undefined;
        state.panier = sub_tab(state.panier, state.panier.indexOf(action.payload.p));

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

    case 'STATE':
      
      state.etat[action.payload.index] = action.payload.value
      
      nextState = {
          ...state,
          etat: state.etat
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
