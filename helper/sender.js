import axios from "axios";

export const baseURL = "http://89.47.161.3";
//export const baseURL = "http://192.168.8.100:8000";

export const routesAPI = {
  zones:  { url: "/api/zones-sanitaire", one: "/api/zones-sanitaire/", centre: "/centres-sante",},
  centre:  { url: "/api/centres-sante", one: "/api/centres-sante/", disponible: "/api/centres-sante-disponible",},
  utilisateur: { url: "/api/utilisateurs", validation: "/validation-de-compte", one: "/api/utilisateurs/", },
  personnel: { url: "/api/personnels-soignants", disponible: "/api/personnels-soignants-disponible", },
  plainte: { url: "/api/plaintes", changer: "/changer-statut-plainte/", one: "/api/plaintes/", publicurl: "/api/public/plaintes", publicone: "/api/public/plaintes/",},
  group:  { url: "/api/groupes", one: "/api/groupes/", entre: "/indicateurs"},
  indicateur:  { url: "/api/indicateurs", one: "/api/indicateurs/", },
  action:  { url: "/api/actions", valider: "/valider-action-realiser/", notifier: "/notifier-action-realiser", one: "/api/actions/", },
  role:  { url: "/api/roles", one: "/api/roles/", },
  note: { url: "/api/notes", one: "/api/notes/", centre: "/api/notes-by-centre-sante/", publicurl: "/api/public/notes", publicone: "/api/public/notes/",publiccentre: "/api/public/notes-by-centre-sante/",publicid: "/"},
  auth: { deconnexion: "/api/auths/deconnexion", register: "/api/creation-de-compte", login: "/api/connexion", confirmation: "/api/confirmation-de-compte/", activation: "/api/activation-de-compte", forget: "/api/mot-de-passe-oublie", verification: "/api/verification-du-compte", reinitialisation: "/api/reinitialisation-de-mot-de-passe",},
  statistique:  { url: "/api/statistiques", one: "/api/statistiques/", filtre: "/api/filtre", filtreIndicateur: "/api/filtreIndicateur" },
};


export function getter(route, access_token, resultats, errors) {
  axios({ method: 'get', headers: { Authorization: `Bearer ${access_token}` }, url: baseURL+route,})
  .then((response)=> resultats(response.data))
  .catch((e)=> errors ? errors(e.response == undefined ? e : e.response.data) : alert(e.response == undefined ? e.message : e.response.data.message))
}

export function postter(route, access_token, data, resultats, errors) {
  axios({ method: 'post', headers: { Authorization: `Bearer ${access_token}`  }, url: baseURL+route, data: data})
  .then((response)=> resultats(response.data))
  .catch((e)=> errors ? errors(e.response == undefined ? e : e.response.data) : alert(e.response == undefined ? e.message : e.response.data.message))
}

export function putter(route, access_token, data, resultats, errors) {
  axios({ method: 'put', headers: { Authorization: `Bearer ${access_token}`  }, url: baseURL+route, data: data})
  .then((response)=> resultats(response.data))
  .catch((e)=> errors ? errors(e.response == undefined ? e : e.response.data) : alert(e.response == undefined ? e.message : e.response.data.message))
}

export function deleteter(route, access_token, resultats, errors) {
  axios({ method: 'delete', headers: { Authorization: `Bearer ${access_token}`  }, url: baseURL+route,})
  .then((response)=> resultats(response.data))
  .catch((e)=> errors ? errors(e.response == undefined ? e : e.response.data) : alert(e.response == undefined ? e.message : e.response.data.message))
}
export function putter_uplaod(route, access_token, data, resultats, errors) {
  axios({ 
    method: 'put', 
    headers: { 
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }, 
    url: baseURL+route, data: data
  })
  .then((response)=> resultats(response.data))
  .catch((e)=> errors ? errors(e.response == undefined ? e : e.response.data) : alert(e.response == undefined ? e.message : e.response.data.message))
}
export function postter_uplaod(route, access_token, data, resultats, errors) {
  axios({ 
    method: 'post', 
    headers: { 
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }, 
    url: baseURL+route, data: data
  })
  .then((response)=> resultats(response.data))
  .catch((e)=> errors ? errors(e.response == undefined ? e : e.response.data) : alert(e.response == undefined ? e.message : e.response.data.message))
}
// export async function upload({file, user, date}) {
//   return await FileSystem.uploadAsync(''+baseURL+'/upload', file.uri, {
//     httpMethod: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       user_id : user._id,
//       type : file.type
//     },
//     sessionType : FileSystem.FileSystemSessionType.BACKGROUND,
//     uploadType : FileSystem.FileSystemUploadType.BINARY_CONTENT,
//     fieldName : "test",
//     mimeType : file.type == 'image' ? "png" : "mp4",
//     parameters : "*/*",
//   })
// }

// export async function post({file, user, description}) {
//   await upload({file, user})
//   .then( (response)=> {
//     //console.log(response.body);
//     file.uri = JSON.parse(response.body).uri;
//     return repost({file, user, description})
//   })
//   .catch( (error)=> {
//     console.log("upload: "+error);
//   });
// }