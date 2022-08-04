import axios from "axios";
import NetInfo from '@react-native-community/netinfo';

export const baseURL = "http://89.47.161.3";
//export const baseURL = "http://192.168.8.100:8000";

export const routesAPI = {};


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

function check() {
  NetInfo.fetch().then(state => {
    if( !state.isConnected ){
      alert(state.isConnected)
    }
  });
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

